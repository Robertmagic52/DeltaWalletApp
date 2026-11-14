# ✈️ Delta Apple Wallet Boarding Pass Prediction

A hyper-realistic, API-driven **Apple Wallet Boarding Pass Prediction** designed for modern mentalism.

Presents an authentic **Apple Wallet** stack on your iPhone (Apple Card + payment cards), with an official **Delta Air Lines Delta One / First Class** boarding pass stacked beneath. Tapping the pass expands it full-screen with native iOS spring physics, accurate Delta branding, boarding group, terminal/gate, date, and a dynamic scannable 2D Aztec barcode.

Driven entirely by a **lightweight REST & Server-Sent Events (SSE) API**, allowing you to update the destination, celebrity companion, and flight date in under 50ms from an **iOS Shortcut**, Siri voice dictation, Apple Watch, or Pre-Show Pal.

---

## 🚀 Features

* **Apple Wallet Clone**: 100% indistinguishable from native Apple Wallet in iOS. Add to Home Screen as a standalone PWA.
* **Celebrity Companion Field**: Pass automatically formats celebrity names to airline IATA standard (e.g. `Taylor Swift` ➔ `SWIFT / TAYLOR`).
* **Smart Airport & City Auto-Mapping**: Accepts city names (`Paris`, `Tokyo`, `Rome`, `Honolulu`, `London`, `Cancun`) and automatically maps them to real IATA codes (`CDG`, `HND`, `FCO`, `HNL`, `LHR`, `CUN`) with realistic Delta flight numbers and gates.
* **Smart Date Parsing**: Accepts relative dates (`today`, `tomorrow`, `this Friday`, `Nov 24`) and formats them into official airline typography.
* **Sub-50ms Real-Time Push**: Uses Server-Sent Events (`/api/pass/stream`). As soon as your shortcut fires, the wallet updates live without page refreshes or flickers.
* **Dynamic 2D Aztec Barcode**: Renders an authentic boarding pass barcode containing the flight details.
* **Built-in Web Controller**: Visit `/controller.html` for a quick testing and dispatch panel with one-tap buttons for celebrities and cities.

---

## 🛠️ Quick Start

### 1. Install & Run Locally
```bash
git clone <repo-url>
cd DeltaWalletApp
npm install
npm start
```
* **Apple Wallet App**: `http://localhost:3300/`
* **Test Controller**: `http://localhost:3300/controller.html`

### 2. Add to iPhone Home Screen (PWA Mode)
1. Open the URL in Safari on your iPhone (e.g. via local network or deployed on Render/Vercel).
2. Tap the **Share** button &rarr; **Add to Home Screen**.
3. It appears on your home screen with the official Apple Wallet icon, launching full-screen without Safari browser bars.

---

## 📲 iOS Shortcut Integration

Create a new Shortcut in the **Shortcuts app** on your iPhone or Apple Watch:

### Option A: Siri Voice Dictation
1. **Dictate Text** (Stop listening on pause)
   * Prompt: *"Who is your celebrity companion and where are you going?"*
2. **Text** (or Split Text):
   * Celebrity: `[Dictated Text]`
   * To: `Paris`
3. **Get Contents of URL**:
   * **URL**: `https://<your-deployed-domain>/api/pass`
   * **Method**: `POST`
   * **Headers**: `Content-Type: application/json`
   * **Request Body**: `JSON`
     ```json
     {
       "celebrity": "Zendaya",
       "to": "Tokyo",
       "date": "Nov 24"
     }
     ```

### Option B: Quick cURL Test
```bash
curl -X POST https://<your-domain>/api/pass \
  -H "Content-Type: application/json" \
  -d '{"celebrity":"Ryan Reynolds","to":"Paris","date":"tomorrow"}'
```

---

## 🗺️ Supported Cities & Codes

Includes 50+ built-in major global and domestic travel destinations:
* **Europe**: Paris (`CDG`), London (`LHR`), Rome (`FCO`), Milan (`MXP`), Venice (`VCE`), Barcelona (`BCN`), Madrid (`MAD`), Amsterdam (`AMS`), Dublin (`DUB`), Zurich (`ZRH`), Athens (`ATH`), Reykjavik (`KEF`).
* **Asia & Pacific**: Tokyo (`HND`), Seoul (`ICN`), Singapore (`SIN`), Bangkok (`BKK`), Bali (`DPS`), Sydney (`SYD`), Dubai (`DXB`).
* **Islands & Tropical**: Honolulu (`HNL`), Maui (`OGG`), Cancun (`CUN`), Los Cabos (`SJD`), Nassau / Bahamas (`NAS`), Punta Cana (`PUJ`), Montego Bay (`MBJ`), Bermuda (`BDA`), San Juan (`SJU`).
* **Domestic US**: Los Angeles (`LAX`), San Francisco (`SFO`), Miami (`MIA`), Las Vegas (`LAS`), Orlando (`MCO`), New York (`JFK`), Boston (`BOS`), Chicago (`ORD`), Seattle (`SEA`), Nashville (`BNA`), New Orleans (`MSY`), Austin (`AUS`), Denver (`DEN`), Atlanta (`ATL`).
* *Custom IATA*: You can also pass any arbitrary 3-letter airport code directly (e.g. `{"to": "NCE"}` for Nice, France).

---

## 📂 Project Structure

```
DeltaWalletApp/
├── server.js              # Express API & SSE stream server
├── package.json           # Dependencies
├── .gitignore
├── README.md
└── public/
    ├── index.html         # Apple Wallet PWA & Boarding Pass UI
    └── controller.html    # Web controller & Shortcuts helper
```
