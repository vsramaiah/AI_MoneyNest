# 🪺 MoneyNest — Smart Grocery & Budget Tracker

> **Track every rupee on your daily run.** MoneyNest is a free Progressive Web App (PWA) that helps Indian families log grocery purchases, track household expenses, manage shopping lists, and stay within monthly budgets — all synced in real time via Firebase.

---

## 📱 Live Demo / Install

Open in Chrome or Safari and tap **Add to Home Screen** to install as a native-like app.

```
https://<your-github-username>.github.io/AI_MoneyNest/
```

---

## ✨ Features

| Feature | Description |
|---|---|
| **Unified Expense Logger** | Category → Sub-category drill-down for groceries, bills, transport, health, and more |
| **Grocery Tracker** | Log items with name, quantity, unit, and price per visit |
| **Budget Ring** | Visual arc gauge showing monthly spend vs. limit |
| **Category Budgets** | Set individual caps per category with over-limit alerts |
| **Shopping List** | Build, check off, and reuse recurring shopping lists |
| **Analysis** | Pie chart, store comparison, payment breakdown, spending trend |
| **Item Price Tracker** | Search any item to see its full price history across stores |
| **Calendar View** | Browse transactions day-by-day on an interactive calendar |
| **Firebase Sync** | Real-time family sharing — same sync code on every device |
| **Offline Support** | Service worker caches the app shell for offline use |
| **PWA Installable** | Installs on Android, iOS, Windows, and macOS |
| **CSV Export** | Download all data as a spreadsheet |

---

## 🗂️ Expense Categories

```
Essentials       → Rent · Bills (Electricity, WiFi, DTH, Gas, Mobile, Water) · Groceries (Vegetables, Fruits, Pulses, Dairy, Meat & Fish, Snacks, Beverages, Frozen, Bakery, Spices, Oils, Rice & Flour, Ready Mixes, Dry Fruits, Household, Cleaning Supplies, Personal, Baby, Other)
Transport        → Travel
Food & Dining    → Restaurant
Lifestyle        → Shopping · Electronics · Personal Care · Gifts
Leisure          → Entertainment · Snacks
Health           → Medical
Vehicle          → Fuel · Service · Repairs · Insurance · Parking · Toll · Washing
Home             → Furniture · Appliances · Repairs · Maintenance · Cleaning Help · Decor
Others           → Misc · Custom
```

**Grocery sub-categories:** Vegetables · Fruits · Pulses · Dairy · Meat & Fish · Snacks · Beverages · Frozen · Bakery · Spices · Oils · Rice & Flour · Ready Mixes · Dry Fruits · Household · Cleaning Supplies · Personal · Baby · Other

---

## 🚀 Getting Started

### 1 — Clone / Download

```bash
git clone https://github.com/<your-username>/AI_MoneyNest.git
cd AI_MoneyNest
```

### 2 — Firebase Setup (already configured)

The Firebase project **moneynest-d1027** is already wired up. No additional setup required unless you want your own Firebase project.

To use your own Firebase:
1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a project.
2. Enable **Cloud Firestore** in test mode.
3. Replace the `FIREBASE_CONFIG` object in `moneynest-app.html`:

```javascript
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3 — Run Locally

**Option A — PowerShell (Windows)**
```powershell
.\serve-moneynest.ps1
```

**Option B — Python**
```bash
python -m http.server 8080
# Open http://localhost:8080
```

**Option C — VS Code Live Server**
Install the *Live Server* extension and click **Go Live**.

### 4 — Deploy to GitHub Pages

```bash
git add .
git commit -m "deploy MoneyNest"
git push origin main
```

Then go to **Settings → Pages → Source: main / root** in your repository.

---

## 📲 First Launch

1. Open the app — a **Setup screen** appears once.
2. Enter a **Sync Code** (e.g. `family-home`) — use the *same code* on every device in your household.
3. Leave blank for personal/private use.
4. Tap **Start Tracking**.

> The sync code becomes the Firestore document key. Anyone with the same code shares the same data.

---

## 🗃️ File Structure

```
AI_MoneyNest/
├── index.html              # PWA entry redirect
├── moneynest-app.html      # Main single-page application
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline caching
├── offline.html            # Shown when app is offline
├── icon.svg                # App icon (scalable)
├── icon-maskable.svg       # Maskable icon for Android
├── icon-192.png            # Android home screen icon
├── icon-512.png            # Splash / store icon
├── icon-maskable.png       # Maskable PNG icon
├── apple-touch-icon.png    # iOS home screen icon
└── _nojekyll               # Disables Jekyll on GitHub Pages
```

---

## 🔄 Sync Architecture

```
Device A  ──┐
Device B  ──┼──► Firebase Firestore (moneynest-d1027) ──► All devices sync in < 1 second
Device C  ──┘
```

- Data is stored per **sync code** as a Firestore document.
- Optimistic local writes + real-time listener keeps all devices updated.
- Deleted IDs are tracked so deletes propagate across devices.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML · CSS · JavaScript (no framework) |
| Database | Firebase Firestore (free Spark plan) |
| Offline | Service Worker + Cache API |
| PWA | Web App Manifest + Install prompt |
| Icons | SVG + PNG (192 / 512 / maskable / apple-touch) |

---

## 📤 Exporting Data

Go to **Analysis tab → Export CSV** to download all purchase and expense records as a comma-separated file compatible with Excel and Google Sheets.

---

## 🔒 Privacy

- No login / no account required.
- Data lives entirely in **your own Firebase project**.
- No analytics, no ads, no third-party tracking.

---

## 📝 License

Personal / family use. Not for redistribution.

---

## 🙏 Credits

Built with ❤️ by VISIRA.  
Designed for Indian households tracking daily grocery and household expenses.
