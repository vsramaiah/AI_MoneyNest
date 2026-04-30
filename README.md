# 🪺 MoneyNest — Smart Grocery & Budget Tracker

> **Track every rupee on your daily run.** MoneyNest is a free Progressive Web App (PWA) that helps Indian families log grocery purchases, track household expenses, manage shopping lists, and stay within monthly budgets — all synced in real time via Firebase.

---

## 📱 Live Demo / Install

Open in Chrome or Safari and tap **Add to Home Screen** to install as a native-like app.

```
https://<your-github-username>.github.io/AI_MoneyNest/
```

---

## Features

| Feature | Description |
|---|---|
| Unified Expense Logger | Category -> sub-category flow for groceries and other expenses |
| Grocery Tracker | Single-item and bulk grocery entry with store, payment, qty, unit, and price |
| Budget Ring | Monthly budget progress on the Home tab |
| Category Budgets | Per-category limits with alerts |
| Past Sessions | Review transactions grouped by date |
| Calendar View | See entries day by day by month |
| Analysis | Category spend, payment breakdown, trends, and price tracking |
| Firebase Sync | Shared real-time data using the same sync code |
| Offline Support | App shell cached with service worker |
| PWA Installable | Installable on Android, iPhone, Windows, and Mac |
| CSV Export | Export your data for Excel or Sheets |

---

## 🗂️ Expense Categories

```text
Essentials       -> Rent · Bills (Electricity, WiFi, DTH, Gas, Mobile, Water) · Groceries (Vegetables, Fruits, Pulses, Dairy, Meat & Fish, Snacks, Beverages, Frozen, Bakery, Spices, Oils, Rice & Flour, Ready Mixes, Dry Fruits, Household, Cleaning Supplies, Personal, Baby, Other)
Transport        -> Travel
Food & Dining    -> Restaurant
Lifestyle        -> Shopping · Electronics · Personal Care · Gifts
Leisure          -> Entertainment · Snacks
Health           -> Medical
Vehicle          -> Fuel · Service · Repairs · Insurance · Parking · Toll · Washing
Home             -> Furniture · Appliances · Repairs · Maintenance · Cleaning Help · Decor
Others           -> Misc · Custom
```

---
## 🚀 Getting Started

### 1 — Clone / Download

```bash
git clone https://github.com/<your-username>/AI_MoneyNest.git
cd AI_MoneyNest
```

### 2 — Firebase Setup (already configured)

The Firebase project **moneynest-10** is already wired up. No additional setup required unless you want your own Firebase project.

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

---

## Deploy to GitHub Pages (Deploy from a branch)

MoneyNest currently uses GitHub Pages with `Deploy from a branch`.

### Recommended setup

1. Create a GitHub repository.
2. Upload the contents of `E:\AI_MoneyNest` to the repository root.
3. Commit the files to the `main` branch.
4. In GitHub, open `Settings -> Pages`.
5. Under `Source`, choose `Deploy from a branch`.
6. Select:
   - Branch: `main`
   - Folder: `/ (root)`
7. Save.
8. Wait a few minutes for the site to publish.

Live URL format:

```text
https://<your-github-username>.github.io/<your-repo-name>/
```

### Important

- Local file changes do not affect the live app.
- The live app updates only after you upload or push changed files to the GitHub Pages branch.
- Installed PWA users may need to reopen or refresh before seeing some updates.
- Icon changes may take longer to appear and sometimes need reinstalling.

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
Device B  ──┼──► Firebase Firestore (moneynest-d10) ──► All devices sync in < 1 second
Device C  ──┘
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML · CSS · JavaScript (no framework) |
| Database | Firebase Firestore (free Spark plan) |
| Offline | Service Worker + Cache API |
| PWA | Web App Manifest + Install prompt |
| Icons | SVG + PNG (192 / 512 / maskable / apple-touch) |

---

## PWABuilder Android Packaging

After the GitHub Pages URL is live:

1. Open the live MoneyNest URL.
2. Confirm the app loads and Firebase sync works.
3. Go to [PWABuilder](https://www.pwabuilder.com/).
4. Paste the live URL.
5. Review the PWA checks.
6. Choose Android packaging.
7. Generate the Android package.
8. Follow PWABuilder's signing/export steps for the package you want to share.

Notes:
- PWABuilder needs a live `https://` URL, not localhost.
- Android users can install either the PWA or the packaged app.
- iPhone users install from Safari using `Add to Home Screen`.

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
