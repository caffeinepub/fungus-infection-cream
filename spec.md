# Fungus Infection Cream

## Current State
- Full promotional website with hero, benefits, testimonials, FAQ, order form, before/after section
- Backend stores orders, blocks phone after order, admin can allow reorder
- Telegram notifications on new orders (hardcoded bot token)
- Admin panel with password protection (741571)
- Order flow: fill form → submit → order placed (no payment required)
- Colored text scattered throughout but not consistently bold
- Photos displayed but some may have sizing issues

## Requested Changes (Diff)

### Add
- ₹5 Stripe payment step before order is confirmed: user fills form → pays ₹5 → payment success → order is registered in backend
- Backend: createPaymentIntent(amount: 500 paise = ₹5) function using Stripe component
- Backend: placeOrderAfterPayment function that verifies payment before registering order

### Modify
- Order form flow: after form submit, show payment step (₹5 via Stripe), then on success place order
- All colored/highlighted text across website: add font-bold/font-extrabold for readability
- All product images: ensure proper w-full, object-cover, max-h with overflow-hidden wrappers so they display correctly
- Hero section: दाद/खाज/खुजली/फंगल color-coded words → bold
- Announcement strip colored words → bold
- Admin panel: repeat order already requires admin allow (no change needed)

### Remove
- Nothing removed

## Implementation Plan
1. Update backend main.mo: add createStripePaymentIntent for ₹5 (500 paise), add placeOrderWithPayment that accepts paymentIntentId
2. Update App.tsx frontend:
   - After form validation, show Stripe payment modal (₹5 booking amount)
   - On payment success, call placeOrder with order details
   - Make all colored text bold (font-bold or font-extrabold) throughout
   - Fix all img tags: add proper className for sizing, object-cover, ensure src paths are correct
3. Validate and deploy
