# Fungus Infection Cream

## Current State
Customers can place orders freely. Admin panel shows orders with password protection. No restriction on repeat orders.

## Requested Changes (Diff)

### Add
- Backend: `blockedPhones` map to track phone numbers that have placed an order and are blocked from ordering again.
- Backend: `isPhoneBlocked(phone: Text)` public query — returns true if phone is blocked.
- Backend: `allowPhone(phone: Text)` public function — admin unblocks a phone (no auth required, called from admin panel after password check).
- Frontend (order form): Before submitting, check `isPhoneBlocked` with entered phone. If blocked, show message: "आपका एक ऑर्डर पहले से है। Admin की अनुमति के बाद ही नया ऑर्डर कर सकते हैं।" and disable submit.
- Frontend (admin panel): Each order row gets an "Allow" button. Clicking it calls `allowPhone` for that order's phone, allowing the customer to place a new order.

### Modify
- Backend `placeOrder`: After saving order, add phone to `blockedPhones`.
- Admin panel: Add "अनुमति दें" (Allow) button per row.

### Remove
- Nothing removed.

## Implementation Plan
1. Add `blockedPhones` map and helper functions to main.mo.
2. Modify `placeOrder` to block phone after order.
3. Add `isPhoneBlocked` query and `allowPhone` update function.
4. Add `isPhoneBlocked` and `allowPhone` to backend.d.ts.
5. Add `useIsPhoneBlocked` query hook and `useAllowPhone` mutation hook.
6. Update order form to check phone block status before allowing submit.
7. Update AdminPanel to show Allow button per row with confirmation feedback.
