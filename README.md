# MoneyNest - Smart Grocery and Budget Tracker

MoneyNest is a local-first Progressive Web App for tracking groceries, household expenses, income, transfers, shopping activity, budgets, and price history. It is designed for one device first: the app stores data in the browser on that device and works offline after the app shell is cached.

## Install Or Run

Open the app in Chrome, Edge, or Safari and use the browser's install option:

```text
https://<github-username>.github.io/<repo-name>/
```

For local testing:

```powershell
.\serve-moneynest.ps1
```

Or:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Features

| Feature | Description |
|---|---|
| Transactions | Add expense, income, and transfer entries |
| Grocery Tracking | Record grocery items with store, payment mode, quantity, unit, and price |
| Bulk Grocery Entry | Add multiple grocery rows quickly |
| Monthly Budgets | Save budgets month by month |
| Category Limits | Track category-level budget limits per month |
| Cashflow Summary | Show income-aware balance while excluding transfers from balance logic |
| History | Review transactions by date, month, and type |
| Calendar | Browse entries by day or month and delete selected ranges |
| Insights | View category spend, payment breakdowns, trends, and item price history |
| Backup and Restore | Export or restore a local JSON backup |
| Offline PWA | Cache the app shell with a service worker |
| CSV Export | Export purchases, expenses, incomes, and transfers |

## Offline And Privacy Model

- MoneyNest has no login, account, server sync, analytics, ads, or third-party tracking.
- Data is saved in browser `localStorage` on the current device.
- Data leaves the device only when you export a backup file or manually share files.
- Clearing browser site data, resetting the app, or uninstalling the PWA can remove local data.
- Export a JSON backup regularly if the data matters.

## App Lock

The current App Lock setting is only a reminder flag in the UI. It does not add a PIN, biometric lock, encryption, or operating-system-level protection. Use your device lock and browser profile protection for real access control.

## Backup And Restore

Backups are JSON files exported from the app. Restore now validates the backup shape before applying it, so malformed files are rejected instead of being applied directly.

Recommended backup flow:

1. Open **More**.
2. Choose **Backup Now**.
3. Store the downloaded JSON file somewhere safe.
4. Use **Restore Backup** only with files exported from MoneyNest.

## Expense Categories

Top-level categories in the Add tab:

```text
Bills
Finance
Food & Drinks
Groceries
Health
Home
Leisure
Lifestyle
Others
Rent
Transport
Vehicle
```

Older backups created before v2.1.0 may contain legacy category names such as `Essentials`, `Food & Dining`, `Cleaning Supplies`, or `Personal`. The app normalizes those names when loading older data.

## Income Categories

```text
Salary
Business
Interest
Dividends
Gifts
Refunds
Rewards
Coupons
```

## Transfer Logic

- Transfers are stored as transaction records.
- Transfers do not count as income or expense.
- Transfers do not affect the Home balance calculation.

## Project Structure

```text
AI_MoneyNest/
|-- index.html              # PWA entry redirect
|-- moneynest-app.html      # Main app layout, styles, and remaining feature logic
|-- app-state.js            # Local state, profile, and backup status helpers
|-- backup-restore.js       # Backup validation, export, and restore logic
|-- local-store.js          # localStorage load/save/normalize helpers
|-- ui-shell.js             # Tab navigation and modal open/close UI logic
|-- pwa.js                  # Install prompt, online/offline events, and SW update flow
|-- manifest.json           # PWA manifest, icons, screenshots, and shortcuts
|-- service-worker.js       # Offline app-shell and runtime caching
|-- offline.html            # Offline fallback page
|-- serve-moneynest.ps1     # Local dev server for Windows PowerShell
|-- screenshot-wide.svg     # PWA wide screenshot preview
|-- screenshot-narrow.svg   # PWA mobile screenshot preview
|-- icon.svg                # App icon
|-- icon-maskable.svg       # Maskable SVG icon
|-- icon-192.png            # 192px app icon
|-- icon-512.png            # 512px app icon
|-- icon-maskable.png       # Maskable PNG icon
|-- apple-touch-icon.png    # iOS home screen icon
`-- .nojekyll               # Disables Jekyll on GitHub Pages
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, and JavaScript |
| Storage | Browser `localStorage` |
| Offline | Service Worker and Cache API |
| PWA | Web App Manifest and install prompt |
| Packaging | GitHub Pages and optional PWABuilder |

## Deploy To GitHub Pages

MoneyNest works with GitHub Pages using **Deploy from a branch**.

1. Create a GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Commit the files to the `main` branch.
4. Open GitHub **Settings > Pages**.
5. Set **Source** to **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`.
7. Save and wait for the site to publish.

Live URL format:

```text
https://<github-username>.github.io/<repo-name>/
```

## Release Checklist

Before sharing a new version:

1. Open the app online and refresh twice so the latest service worker installs.
2. Confirm the app still opens after going offline.
3. Add a test expense, income, and transfer.
4. Export a backup and restore it.
5. Confirm the app install prompt and icons still work.
6. Confirm `manifest.json` and `service-worker.js` are included in the deployed root.

## PWABuilder Android Packaging

After the GitHub Pages URL is live:

1. Open the live MoneyNest URL.
2. Confirm the app loads and works offline after refresh.
3. Go to `https://www.pwabuilder.com/`.
4. Paste the live URL.
5. Review the PWA checks.
6. Generate the Android package.
7. Follow PWABuilder's signing and export steps.

Notes:

- PWABuilder needs a live `https://` URL, not localhost.
- Android users can install either the PWA or the packaged app.
- iPhone users install from Safari using **Add to Home Screen**.

## License

Personal and family use. Not for redistribution.

## Credits

Built by VISIRA.

App version: 2.1.1
