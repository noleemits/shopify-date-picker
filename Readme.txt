# Shopify Delivery Date Picker

This repository contains a lightweight, flexible implementation for adding a **delivery date picker** to a Shopify store’s **cart drawer** or **cart page**, with built-in validation and admin visibility through cart attributes and order notes.

---

## Features

- Adds a native calendar (`<input type="date">`) for selecting a delivery date
- Prevents checkout until a date is selected (optional)
- Automatically stores the date as a **cart attribute**
- Syncs the selected date to the Shopify **order note** (visible in admin)
- Persists the selected date across sessions via `/cart.js`
- Works with any Shopify theme with minimal customization
- Supports disabling or hiding multiple elements until a valid date is selected

---

## Files Included

- `script.js`: Handles logic for validation, UI interaction, and syncing
- (Optional) `calendar.css`: Styles for the date input

---

## Setup Instructions

### 1. **Add the Date Picker to Your Theme**

Insert the code from calendar.liquied inside your `cart-drawer.liquid` (or `main-cart-items.liquid`), ideally **below the cart items table** and **inside the form**:

### 2. 
Add the code from the script js where it makes sense, but not in the same file where you have the select delivery item. theme.liquid should be fine.

