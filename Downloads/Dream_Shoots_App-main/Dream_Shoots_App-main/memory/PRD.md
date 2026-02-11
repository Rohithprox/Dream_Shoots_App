# Dream Shoots - PRD

## Problem Statement
Clone and customize Dream Shoots website — a content creation agency landing page with booking system and admin panel.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Lucide Icons
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Font**: Inter Tight + Bebas Neue
- **Admin Auth**: None (protected route, direct access)

## User Personas
1. **Customers**: Brands, businesses, wedding clients booking content shoots
2. **Admin**: Dream Shoots team managing bookings

## Core Requirements
- Dark theme landing page, red accents, bold/energetic design
- 3-category pricing (Studio, Corporate, Wedding)
- Simple booking form (no payment gateway)
- Admin panel (no auth) with table view, filters, status management, CSV export
- Locations: Nellore (HQ), Hyderabad, Vijayawada, Ongole, Tirupati

## What's Been Implemented (Feb 8, 2026)
- [x] Full landing page: Hero, Features, About, Pricing (3 tabs), Marquee, Locations, Booking, Footer
- [x] Custom logo (dreamshoots-logo.png)
- [x] Inter Tight font, bold/energetic design
- [x] Studio plans: 1 reel 1,999 / 2 reels 3,499 / 3 reels 4,999 (Fast Delivery)
- [x] Corporate plans: 5 reels 7,999/mo / 10 reels 14,999/mo
- [x] Wedding plans: Silver 9,999 / Gold 29,999 / Platinum 49,999 / Royal 69,999
- [x] Simple booking form -> success confirmation (no payment flow)
- [x] Admin panel (/admin) - no auth, direct access, table view
- [x] Admin: filter by status (pending/confirmed/completed) & date, CSV export
- [x] Locations: Nellore (HQ first), Hyderabad, Vijayawada, Ongole, Tirupati
- [x] Real contact details: +91 73308 58705, dreamshootsofficial@gmail.com, @dreamshootsofficial
- [x] WhatsApp floating button (wa.me/917330858705)
- [x] Admin button in navbar header
- [x] All payment gateway terms removed
- [x] All tests passing (100%)

## Backlog
- P1: Email/SMS notifications on booking
- P2: SEO meta tags and Open Graph
- P2: Analytics dashboard for admin
- P2: Creator portal for onboarding creators
