# IFSC Code Finder 🔍

This is a simple web application that generates a unique IFSC code based on the **bank name**, **state**, and **district** entered by the user. It also maintains a search history for each user using `localStorage`.

## 📌 Features
- ✅ Unique IFSC code generation with custom format: `ABBR0XXXXXX` (e.g., SBIN0001000)
- ✅ Search by bank, state, and district
- ✅ History tracking of previously searched IFSC codes per user
- ✅ Google Maps integration for location lookup
- ✅ Random phone number generation for each branch
- ✅ LocalStorage-based data persistence (no backend required)
- ✅ Responsive and interactive UI with loading animation

---

## 🚀 How It Works
1. User enters **bank name**, **state**, and **district**.
2. If the combination is not found in the user's search history, a unique IFSC code is generated.
3. The generated IFSC code is stored and displayed along with a mock phone number and Google Maps link.
4. Previous searches are displayed in a history list.

---

## 🛠️ Tech Stack
- **HTML**
- **CSS**
- **JavaScript**
- **Bootstrap (for styling)**
- **Font Awesome (for icons)**

---

## 📂 Project Structure
```plaintext
├── index.html
├── style.css
├── script.js
└── README.md
