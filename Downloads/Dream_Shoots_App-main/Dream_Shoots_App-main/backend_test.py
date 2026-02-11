import requests
import sys
import json
from datetime import datetime, timedelta
import uuid

class DreamShootsAPITester:
    def __init__(self, base_url="https://shoot-dreams-1.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_booking_id = None
        self.admin_token = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        
        if not headers:
            headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"Error Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API Endpoint", "GET", "", 200)

    def test_create_booking(self):
        """Test creating a booking"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        booking_data = {
            "name": "Test User",
            "phone": "+919876543210",
            "preferred_date": tomorrow,
            "preferred_time": "14:30",
            "event_type": "Wedding",
            "important_info": "Outdoor venue, need extra lighting"
        }
        
        success, response = self.run_test(
            "Create Booking", "POST", "bookings", 200, booking_data
        )
        
        if success and 'id' in response:
            self.test_booking_id = response['id']
            print(f"📝 Booking ID stored: {self.test_booking_id}")
        
        return success

    def test_get_bookings(self):
        """Test getting all bookings"""
        return self.run_test("Get All Bookings", "GET", "bookings", 200)

    def test_update_booking_status_confirmed(self):
        """Test updating booking status to confirmed"""
        if not self.test_booking_id:
            print("❌ No booking ID available for status update test")
            return False
            
        success, _ = self.run_test(
            "Update Booking Status to Confirmed", 
            "PATCH", 
            f"bookings/{self.test_booking_id}/status", 
            200, 
            {"status": "confirmed"}
        )
        return success

    def test_update_booking_status_completed(self):
        """Test updating booking status to completed"""
        if not self.test_booking_id:
            print("❌ No booking ID available for status update test")
            return False
            
        success, _ = self.run_test(
            "Update Booking Status to Completed", 
            "PATCH", 
            f"bookings/{self.test_booking_id}/status", 
            200, 
            {"status": "completed"}
        )
        return success

    def test_invalid_status_update(self):
        """Test updating booking with invalid status"""
        if not self.test_booking_id:
            print("❌ No booking ID available for invalid status test")
            return False
            
        success, _ = self.run_test(
            "Update Booking with Invalid Status", 
            "PATCH", 
            f"bookings/{self.test_booking_id}/status", 
            400, 
            {"status": "invalid_status"}
        )
        return success

    def test_delete_booking(self):
        """Test deleting a booking"""
        if not self.test_booking_id:
            print("❌ No booking ID available for deletion test")
            return False
            
        success, _ = self.run_test(
            "Delete Booking", 
            "DELETE", 
            f"bookings/{self.test_booking_id}", 
            200
        )
        return success

    def test_booking_not_found(self):
        """Test operations on non-existent booking"""
        fake_id = str(uuid.uuid4())
        success, _ = self.run_test(
            "Update Non-existent Booking", 
            "PATCH", 
            f"bookings/{fake_id}/status", 
            404, 
            {"status": "confirmed"}
        )
        return success

def main():
    print("🚀 Starting Dream Shoots API Tests")
    print("="*50)
    
    tester = DreamShootsAPITester()
    
    # Test sequence
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Create Booking", tester.test_create_booking),
        ("Get All Bookings", tester.test_get_bookings),
        ("Update Booking Status to Confirmed", tester.test_update_booking_status_confirmed),
        ("Update Booking Status to Completed", tester.test_update_booking_status_completed),
        ("Invalid Status Update", tester.test_invalid_status_update),
        ("Booking Not Found", tester.test_booking_not_found),
        ("Delete Booking", tester.test_delete_booking),
    ]
    
    failed_tests = []
    
    for test_name, test_func in tests:
        try:
            if not test_func():
                failed_tests.append(test_name)
        except Exception as e:
            print(f"❌ {test_name} - Exception: {str(e)}")
            failed_tests.append(test_name)
    
    # Print summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print("="*50)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if failed_tests:
        print(f"\n❌ Failed Tests: {', '.join(failed_tests)}")
        return 1
    else:
        print("\n✅ All tests passed!")
        return 0

if __name__ == "__main__":
    sys.exit(main())