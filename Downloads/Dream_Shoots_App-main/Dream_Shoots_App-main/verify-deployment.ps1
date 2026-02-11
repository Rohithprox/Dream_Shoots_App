# Production Deployment Verification Script (PowerShell)
# Usage: .\verify-deployment.ps1 -BackendUrl "https://api.yourdomain.com" -FrontendUrl "https://yourdomain.com"

param(
    [string]$BackendUrl = "http://localhost:8000",
    [string]$FrontendUrl = "http://localhost:3000"
)

Write-Host "═════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Dream Shoots App - Deployment Verification" -ForegroundColor Cyan
Write-Host "═════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$passCount = 0
$failCount = 0
$warnCount = 0

function Test-Endpoint {
    param([string]$Url, [string]$Description)
    
    Write-Host -NoNewline "Testing $Description... "
    try {
        $response = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 5 -SkipHttpErrorCheck
        if ($response.StatusCode -eq 200) {
            Write-Host "✓ PASS" -ForegroundColor Green
            return $true
        } else {
            Write-Host "✗ FAIL (HTTP $($response.StatusCode))" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "✗ FAIL ($_)" -ForegroundColor Red
        return $false
    }
}

# Test 1: Backend Health Check
if (Test-Endpoint "$BackendUrl/health" "Backend Health Check") {
    $passCount++
} else {
    $failCount++
    Write-Host ""
    Write-Host "Error: Backend is not responding. Please check:" -ForegroundColor Red
    Write-Host "  1. Backend URL is correct: $BackendUrl" -ForegroundColor Red
    Write-Host "  2. Backend service is running" -ForegroundColor Red
    Write-Host "  3. Network connectivity" -ForegroundColor Red
    exit 1
}

# Test 2: API Root Endpoint
if (Test-Endpoint "$BackendUrl/api/" "API Root Endpoint") {
    $passCount++
} else {
    $failCount++
}

# Test 3: Frontend Load
if (Test-Endpoint $FrontendUrl "Frontend Load") {
    $passCount++
} else {
    $failCount++
}

# Test 4: CORS Headers
Write-Host -NoNewline "Testing CORS Configuration... "
try {
    $response = Invoke-WebRequest -Uri "$BackendUrl/api/bookings" `
        -Method OPTIONS `
        -Headers @{"Origin" = $FrontendUrl; "Access-Control-Request-Method" = "POST"} `
        -SkipHttpErrorCheck
    
    if ($response.Headers["Access-Control-Allow-Origin"]) {
        Write-Host "✓ PASS" -ForegroundColor Green
        Write-Host "  └─ Allow-Origin: $($response.Headers['Access-Control-Allow-Origin'])" -ForegroundColor Gray
        $passCount++
    } else {
        Write-Host "⚠ WARNING (CORS headers not found)" -ForegroundColor Yellow
        $warnCount++
    }
} catch {
    Write-Host "⚠ WARNING ($_)" -ForegroundColor Yellow
    $warnCount++
}

# Test 5: Booking API Endpoint
if (Test-Endpoint "$BackendUrl/api/bookings" "Bookings API Endpoint") {
    $passCount++
} else {
    $failCount++
}

# Test 6: Test Booking Creation
Write-Host -NoNewline "Testing Booking Creation... "
try {
    $bookingData = @{
        name = "Test User"
        phone = "+91 98765 43210"
        preferred_date = "2026-03-15"
        preferred_time = "10:00"
        event_type = "Test Event"
        important_info = "Deployment verification test"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$BackendUrl/api/bookings" `
        -Method POST `
        -ContentType "application/json" `
        -Body $bookingData `
        -TimeoutSec 5 `
        -SkipHttpErrorCheck

    if ($response.StatusCode -eq 200) {
        Write-Host "✓ PASS" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "✗ FAIL (HTTP $($response.StatusCode))" -ForegroundColor Red
        $failCount++
    }
} catch {
    Write-Host "✗ FAIL ($_)" -ForegroundColor Red
    $failCount++
}

# Test 7: Get Bookings
Write-Host -NoNewline "Retrieving Bookings List... "
try {
    $response = Invoke-WebRequest -Uri "$BackendUrl/api/bookings" -Method GET -TimeoutSec 5
    $bookings = $response.Content | ConvertFrom-Json
    
    if ($bookings.Count -gt 0 -or ($bookings -is [object])) {
        Write-Host "✓ PASS (Found $($bookings.Count) booking(s))" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "⚠ WARNING (No bookings found)" -ForegroundColor Yellow
        $warnCount++
    }
} catch {
    Write-Host "⚠ WARNING ($_)" -ForegroundColor Yellow
    $warnCount++
}

# Test 8: Response Time Check
Write-Host ""
Write-Host "Performance Tests:" -ForegroundColor Cyan
Write-Host -NoNewline "  Backend Response Time... "
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
try {
    Invoke-WebRequest -Uri "$BackendUrl/health" -TimeoutSec 5 -SkipHttpErrorCheck | Out-Null
    $stopwatch.Stop()
    $responseTime = $stopwatch.ElapsedMilliseconds
    
    if ($responseTime -lt 500) {
        Write-Host "✓ ${responseTime}ms" -ForegroundColor Green
    } else {
        Write-Host "⚠ ${responseTime}ms" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ FAIL ($_)" -ForegroundColor Red
}

# Summary
Write-Host ""
Write-Host "═════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Deployment Verification Summary" -ForegroundColor Cyan
Write-Host "═════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Passed:  $passCount" -ForegroundColor Green
Write-Host "  Failed:  $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Red" } else { "Green" })
Write-Host "  Warned:  $warnCount" -ForegroundColor $(if ($warnCount -gt 0) { "Yellow" } else { "Green" })
Write-Host ""
Write-Host "URLs:" -ForegroundColor Cyan
Write-Host "  Frontend: $FrontendUrl" -ForegroundColor Gray
Write-Host "  Backend:  $BackendUrl" -ForegroundColor Gray
Write-Host "  Admin:    $FrontendUrl/admin" -ForegroundColor Gray
Write-Host ""

if ($failCount -gt 0) {
    Write-Host "✗ Deployment Verification FAILED" -ForegroundColor Red
    exit 1
} else {
    Write-Host "✓ Deployment Verification Complete!" -ForegroundColor Green
    exit 0
}
