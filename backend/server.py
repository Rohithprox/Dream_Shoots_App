from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Dream Shoots API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# Get environment variables
ENVIRONMENT = os.environ.get('ENVIRONMENT', 'development')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
CORS_ORIGINS = os.environ.get('CORS_ORIGINS')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'ds-secret-token').strip().replace('"', '').replace("'", "")

# Parse CORS origins
cors_origins_list = [
    "https://www.dreamshoots.in",
    "https://dreamshootsapp-production.up.railway.app",
    "http://localhost:3000",
    "http://localhost:8000"
]

if CORS_ORIGINS:
    for origin in CORS_ORIGINS.split(','):
        o = origin.strip()
        if o and o not in cors_origins_list:
            cors_origins_list.append(o)

# If it's still just the defaults and no explicit origins were found, 
# and we aren't in production, we could fallback to "*"
if not CORS_ORIGINS and ENVIRONMENT != 'production':
    cors_origins_list = ["*"]
    cors_allow_credentials = False
else:
    # In production or if specified, we allow credentials with specific origins
    cors_allow_credentials = True

class BookingCreate(BaseModel):
    name: str
    phone: str
    preferred_date: str
    preferred_time: str
    event_type: str
    important_info: Optional[str] = ""
    selected_package: Optional[str] = ""
    location: Optional[str] = ""

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    preferred_date: str
    preferred_time: str
    event_type: str
    location: Optional[str] = ""
    important_info: Optional[str] = ""
    selected_package: Optional[str] = ""
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class BookingStatusUpdate(BaseModel):
    status: str

class ReelCreate(BaseModel):
    url: str
    title: Optional[str] = ""

class Reel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    url: str
    title: Optional[str] = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

@api_router.get("/")
async def root():
    return {"message": "Dream Shoots API"}

@api_router.post("/bookings", response_model=Booking)
async def create_booking(input_data: BookingCreate):
    booking = Booking(**input_data.model_dump())
    doc = booking.model_dump()
    await db.bookings.insert_one(doc)
    return booking

@api_router.get("/reels", response_model=List[Reel])
async def get_reels():
    reels = await db.reels.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return reels

@api_router.post("/reels", response_model=Reel)
async def create_reel(input_data: ReelCreate, authenticated: bool = Depends(verify_admin)):
    reel = Reel(**input_data.model_dump())
    doc = reel.model_dump()
    await db.reels.insert_one(doc)
    return reel

@api_router.delete("/reels/{reel_id}")
async def delete_reel(reel_id: str, authenticated: bool = Depends(verify_admin)):
    result = await db.reels.delete_one({"id": reel_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Reel not found")
    return {"message": "Reel deleted"}



async def verify_admin(x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token")):
    if ENVIRONMENT == 'production':
        if not x_admin_token:
            logger.warning("Missing X-Admin-Token header")
            raise HTTPException(status_code=401, detail="Unauthorized: Missing token")
        
        if x_admin_token != ADMIN_TOKEN:
            # We don't log the full token for security, but we log the length and first/last char to help debug
            received_desc = f"len={len(x_admin_token)}"
            expected_desc = f"len={len(ADMIN_TOKEN)}"
            logger.warning(f"Unauthorized: Token mismatch. Received {received_desc}, Expected {expected_desc}")
            raise HTTPException(status_code=401, detail="Unauthorized: Token mismatch")
    
    return True

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(authenticated: bool = Depends(verify_admin)):
    bookings = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return bookings


@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str, authenticated: bool = Depends(verify_admin)):
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@api_router.patch("/bookings/{booking_id}/status", response_model=Booking)
async def update_booking_status(booking_id: str, update: BookingStatusUpdate, authenticated: bool = Depends(verify_admin)):
    if update.status not in ["pending", "confirmed", "completed"]:
        raise HTTPException(status_code=400, detail="Invalid status. Must be pending, confirmed, or completed")
    result = await db.bookings.find_one_and_update(
        {"id": booking_id},
        {"$set": {"status": update.status}},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Booking not found")
    result.pop("_id", None)
    return result


@api_router.delete("/bookings/{booking_id}")
async def delete_booking(booking_id: str, authenticated: bool = Depends(verify_admin)):
    result = await db.bookings.delete_one({"id": booking_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted"}


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=cors_allow_credentials,
    allow_origins=cors_origins_list,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,  # Cache preflight requests for 10 minutes
)

app.include_router(api_router)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": ENVIRONMENT,
        "version": "1.0.0"
    }

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting Dream Shoots API in {ENVIRONMENT} environment")
    logger.info(f"CORS origins: {cors_origins_list}")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("Shutting down API")
    client.close()
