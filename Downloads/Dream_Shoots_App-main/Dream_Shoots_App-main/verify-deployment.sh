#!/bin/bash

# Production Deployment Verification Script
# Usage: ./verify-deployment.sh https://api.yourdomain.com https://yourdomain.com

BACKEND_URL=${1:-http://localhost:8000}
FRONTEND_URL=${2:-http://localhost:3000}

echo "═════════════════════════════════════════════"
echo "Dream Shoots App - Deployment Verification"
echo "═════════════════════════════════════════════"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Backend Health Check
echo -n "Testing Backend Health Check... "
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/health")
if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $HEALTH_RESPONSE)"
    exit 1
fi

# Test 2: API Root Endpoint
echo -n "Testing API Root Endpoint... "
API_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/")
if [ "$API_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $API_RESPONSE)"
fi

# Test 3: Frontend Load
echo -n "Testing Frontend Load... "
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")
if [ "$FRONTEND_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $FRONTEND_RESPONSE)"
fi

# Test 4: CORS Headers
echo -n "Testing CORS Configuration... "
CORS_RESPONSE=$(curl -s -I -H "Origin: $FRONTEND_URL" -H "Access-Control-Request-Method: POST" -X OPTIONS "$BACKEND_URL/api/bookings" | grep -i "access-control-allow-origin")
if [ ! -z "$CORS_RESPONSE" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
    echo "  └─ $CORS_RESPONSE"
else
    echo -e "${YELLOW}⚠ WARNING${NC} (CORS headers not found)"
fi

# Test 5: Booking API Endpoint
echo -n "Testing Bookings API Endpoint... "
BOOKINGS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/bookings")
if [ "$BOOKINGS_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $BOOKINGS_RESPONSE)"
fi

# Test 6: Test Booking Creation
echo -n "Testing Booking Creation... "
BOOKING_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+91 98765 43210",
    "preferred_date": "2026-03-15",
    "preferred_time": "10:00",
    "event_type": "Test Event",
    "important_info": "Deployment verification test"
  }' -o /dev/null -w "%{http_code}")
if [ "$BOOKING_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $BOOKING_RESPONSE)"
fi

# Test 7: Get Bookings
echo -n "Retrieving Bookings List... "
BOOKINGS=$(curl -s "$BACKEND_URL/api/bookings" | grep -c "name")
if [ $BOOKINGS -gt 0 ]; then
    echo -e "${GREEN}✓ PASS${NC} (Found $BOOKINGS booking(s))"
else
    echo -e "${YELLOW}⚠ WARNING${NC} (No bookings found)"
fi

# Test 8: Response Time Check
echo ""
echo "Performance Tests:"
echo -n "  Backend Response Time... "
START=$(date +%s%N)
curl -s "$BACKEND_URL/health" > /dev/null
END=$(date +%s%N)
RESPONSE_TIME=$(( (END - START) / 1000000 ))
if [ $RESPONSE_TIME -lt 500 ]; then
    echo -e "${GREEN}✓ ${RESPONSE_TIME}ms${NC}"
else
    echo -e "${YELLOW}⚠ ${RESPONSE_TIME}ms${NC}"
fi

# Summary
echo ""
echo "═════════════════════════════════════════════"
echo -e "${GREEN}✓ Deployment Verification Complete!${NC}"
echo "═════════════════════════════════════════════"
echo ""
echo "URLs:"
echo "  Frontend: $FRONTEND_URL"
echo "  Backend:  $BACKEND_URL"
echo "  Admin:    $FRONTEND_URL/admin"
echo ""
