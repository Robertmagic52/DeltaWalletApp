"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// --- Comprehensive Airport & City Database ---
const AIRPORTS = {
  // Europe
  "paris": { code: "CDG", city: "Paris", name: "Charles de Gaulle", flight: "DL 264", gate: "B28", term: "T4" },
  "cdg": { code: "CDG", city: "Paris", name: "Charles de Gaulle", flight: "DL 264", gate: "B28", term: "T4" },
  "ory": { code: "ORY", city: "Paris", name: "Orly", flight: "DL 262", gate: "B24", term: "T4" },
  "london": { code: "LHR", city: "London", name: "Heathrow", flight: "DL 002", gate: "A12", term: "T4" },
  "lhr": { code: "LHR", city: "London", name: "Heathrow", flight: "DL 002", gate: "A12", term: "T4" },
  "rome": { code: "FCO", city: "Rome", name: "Fiumicino", flight: "DL 182", gate: "B30", term: "T4" },
  "fco": { code: "FCO", city: "Rome", name: "Fiumicino", flight: "DL 182", gate: "B30", term: "T4" },
  "milan": { code: "MXP", city: "Milan", name: "Malpensa", flight: "DL 186", gate: "B22", term: "T4" },
  "mxp": { code: "MXP", city: "Milan", name: "Malpensa", flight: "DL 186", gate: "B22", term: "T4" },
  "venice": { code: "VCE", city: "Venice", name: "Marco Polo", flight: "DL 192", gate: "B18", term: "T4" },
  "vce": { code: "VCE", city: "Venice", name: "Marco Polo", flight: "DL 192", gate: "B18", term: "T4" },
  "barcelona": { code: "BCN", city: "Barcelona", name: "El Prat", flight: "DL 168", gate: "B34", term: "T4" },
  "bcn": { code: "BCN", city: "Barcelona", name: "El Prat", flight: "DL 168", gate: "B34", term: "T4" },
  "madrid": { code: "MAD", city: "Madrid", name: "Barajas", flight: "DL 126", gate: "B31", term: "T4" },
  "mad": { code: "MAD", city: "Madrid", name: "Barajas", flight: "DL 126", gate: "B31", term: "T4" },
  "amsterdam": { code: "AMS", city: "Amsterdam", name: "Schiphol", flight: "DL 046", gate: "A20", term: "T4" },
  "ams": { code: "AMS", city: "Amsterdam", name: "Schiphol", flight: "DL 046", gate: "A20", term: "T4" },
  "dublin": { code: "DUB", city: "Dublin", name: "Dublin Airport", flight: "DL 154", gate: "A08", term: "T4" },
  "dub": { code: "DUB", city: "Dublin", name: "Dublin Airport", flight: "DL 154", gate: "A08", term: "T4" },
  "athens": { code: "ATH", city: "Athens", name: "Eleftherios Venizelos", flight: "DL 212", gate: "B38", term: "T4" },
  "ath": { code: "ATH", city: "Athens", name: "Eleftherios Venizelos", flight: "DL 212", gate: "B38", term: "T4" },
  "zurich": { code: "ZRH", city: "Zurich", name: "Zurich Kloten", flight: "DL 410", gate: "B26", term: "T4" },
  "zrh": { code: "ZRH", city: "Zurich", name: "Zurich Kloten", flight: "DL 410", gate: "B26", term: "T4" },
  "geneva": { code: "GVA", city: "Geneva", name: "Geneva Airport", flight: "DL 412", gate: "B25", term: "T4" },
  "gva": { code: "GVA", city: "Geneva", name: "Geneva Airport", flight: "DL 412", gate: "B25", term: "T4" },
  "munich": { code: "MUC", city: "Munich", name: "Munich Airport", flight: "DL 130", gate: "A16", term: "T4" },
  "muc": { code: "MUC", city: "Munich", name: "Munich Airport", flight: "DL 130", gate: "A16", term: "T4" },
  "frankfurt": { code: "FRA", city: "Frankfurt", name: "Frankfurt Airport", flight: "DL 106", gate: "A14", term: "T4" },
  "fra": { code: "FRA", city: "Frankfurt", name: "Frankfurt Airport", flight: "DL 106", gate: "A14", term: "T4" },
  "reykjavik": { code: "KEF", city: "Reykjavik", name: "Keflavik", flight: "DL 246", gate: "A04", term: "T4" },
  "iceland": { code: "KEF", city: "Reykjavik", name: "Keflavik", flight: "DL 246", gate: "A04", term: "T4" },
  "kef": { code: "KEF", city: "Reykjavik", name: "Keflavik", flight: "DL 246", gate: "A04", term: "T4" },

  // Asia & Pacific
  "tokyo": { code: "HND", city: "Tokyo", name: "Haneda", flight: "DL 161", gate: "B42", term: "T4" },
  "hnd": { code: "HND", city: "Tokyo", name: "Haneda", flight: "DL 161", gate: "B42", term: "T4" },
  "nrt": { code: "NRT", city: "Tokyo", name: "Narita", flight: "DL 295", gate: "B40", term: "T4" },
  "seoul": { code: "ICN", city: "Seoul", name: "Incheon", flight: "DL 187", gate: "B36", term: "T4" },
  "icn": { code: "ICN", city: "Seoul", name: "Incheon", flight: "DL 187", gate: "B36", term: "T4" },
  "singapore": { code: "SIN", city: "Singapore", name: "Changi", flight: "DL 167", gate: "B44", term: "T4" },
  "sin": { code: "SIN", city: "Singapore", name: "Changi", flight: "DL 167", gate: "B44", term: "T4" },
  "bangkok": { code: "BKK", city: "Bangkok", name: "Suvarnabhumi", flight: "DL 177", gate: "B46", term: "T4" },
  "bkk": { code: "BKK", city: "Bangkok", name: "Suvarnabhumi", flight: "DL 177", gate: "B46", term: "T4" },
  "bali": { code: "DPS", city: "Bali", name: "Ngurah Rai", flight: "DL 197", gate: "B48", term: "T4" },
  "dps": { code: "DPS", city: "Bali", name: "Ngurah Rai", flight: "DL 197", gate: "B48", term: "T4" },
  "sydney": { code: "SYD", city: "Sydney", name: "Kingsford Smith", flight: "DL 043", gate: "B50", term: "T4" },
  "syd": { code: "SYD", city: "Sydney", name: "Kingsford Smith", flight: "DL 043", gate: "B50", term: "T4" },
  "dubai": { code: "DXB", city: "Dubai", name: "Dubai International", flight: "DL 008", gate: "B32", term: "T4" },
  "dxb": { code: "DXB", city: "Dubai", name: "Dubai International", flight: "DL 008", gate: "B32", term: "T4" },

  // Tropical & Island Getaways
  "honolulu": { code: "HNL", city: "Honolulu", name: "Daniel K. Inouye", flight: "DL 481", gate: "B20", term: "T4" },
  "hawaii": { code: "HNL", city: "Honolulu", name: "Daniel K. Inouye", flight: "DL 481", gate: "B20", term: "T4" },
  "hnl": { code: "HNL", city: "Honolulu", name: "Daniel K. Inouye", flight: "DL 481", gate: "B20", term: "T4" },
  "maui": { code: "OGG", city: "Maui", name: "Kahului", flight: "DL 485", gate: "B19", term: "T4" },
  "ogg": { code: "OGG", city: "Maui", name: "Kahului", flight: "DL 485", gate: "B19", term: "T4" },
  "cancun": { code: "CUN", city: "Cancun", name: "Cancun Airport", flight: "DL 592", gate: "B15", term: "T4" },
  "cun": { code: "CUN", city: "Cancun", name: "Cancun Airport", flight: "DL 592", gate: "B15", term: "T4" },
  "cabo": { code: "SJD", city: "Los Cabos", name: "Los Cabos", flight: "DL 598", gate: "B16", term: "T4" },
  "sjd": { code: "SJD", city: "Los Cabos", name: "Los Cabos", flight: "DL 598", gate: "B16", term: "T4" },
  "nassau": { code: "NAS", city: "Nassau", name: "Lynden Pindling", flight: "DL 602", gate: "B12", term: "T4" },
  "bahamas": { code: "NAS", city: "Nassau", name: "Lynden Pindling", flight: "DL 602", gate: "B12", term: "T4" },
  "nas": { code: "NAS", city: "Nassau", name: "Lynden Pindling", flight: "DL 602", gate: "B12", term: "T4" },
  "punta cana": { code: "PUJ", city: "Punta Cana", name: "Punta Cana", flight: "DL 610", gate: "B14", term: "T4" },
  "puj": { code: "PUJ", city: "Punta Cana", name: "Punta Cana", flight: "DL 610", gate: "B14", term: "T4" },
  "jamaica": { code: "MBJ", city: "Montego Bay", name: "Sangster", flight: "DL 618", gate: "B11", term: "T4" },
  "montego bay": { code: "MBJ", city: "Montego Bay", name: "Sangster", flight: "DL 618", gate: "B11", term: "T4" },
  "mbj": { code: "MBJ", city: "Montego Bay", name: "Sangster", flight: "DL 618", gate: "B11", term: "T4" },
  "bermuda": { code: "BDA", city: "Bermuda", name: "L.F. Wade", flight: "DL 624", gate: "B10", term: "T4" },
  "bda": { code: "BDA", city: "Bermuda", name: "L.F. Wade", flight: "DL 624", gate: "B10", term: "T4" },
  "puerto rico": { code: "SJU", city: "San Juan", name: "Luis Muñoz Marín", flight: "DL 630", gate: "B09", term: "T4" },
  "san juan": { code: "SJU", city: "San Juan", name: "Luis Muñoz Marín", flight: "DL 630", gate: "B09", term: "T4" },
  "sju": { code: "SJU", city: "San Juan", name: "Luis Muñoz Marín", flight: "DL 630", gate: "B09", term: "T4" },

  // US Domestic Destinations
  "los angeles": { code: "LAX", city: "Los Angeles", name: "Los Angeles Intl", flight: "DL 302", gate: "B23", term: "T4" },
  "la": { code: "LAX", city: "Los Angeles", name: "Los Angeles Intl", flight: "DL 302", gate: "B23", term: "T4" },
  "lax": { code: "LAX", city: "Los Angeles", name: "Los Angeles Intl", flight: "DL 302", gate: "B23", term: "T4" },
  "san francisco": { code: "SFO", city: "San Francisco", name: "San Francisco Intl", flight: "DL 314", gate: "B27", term: "T4" },
  "sf": { code: "SFO", city: "San Francisco", name: "San Francisco Intl", flight: "DL 314", gate: "B27", term: "T4" },
  "sfo": { code: "SFO", city: "San Francisco", name: "San Francisco Intl", flight: "DL 314", gate: "B27", term: "T4" },
  "miami": { code: "MIA", city: "Miami", name: "Miami Intl", flight: "DL 492", gate: "B17", term: "T4" },
  "mia": { code: "MIA", city: "Miami", name: "Miami Intl", flight: "DL 492", gate: "B17", term: "T4" },
  "las vegas": { code: "LAS", city: "Las Vegas", name: "Harry Reid Intl", flight: "DL 348", gate: "B29", term: "T4" },
  "vegas": { code: "LAS", city: "Las Vegas", name: "Harry Reid Intl", flight: "DL 348", gate: "B29", term: "T4" },
  "las": { code: "LAS", city: "Las Vegas", name: "Harry Reid Intl", flight: "DL 348", gate: "B29", term: "T4" },
  "orlando": { code: "MCO", city: "Orlando", name: "Orlando Intl", flight: "DL 504", gate: "B13", term: "T4" },
  "mco": { code: "MCO", city: "Orlando", name: "Orlando Intl", flight: "DL 504", gate: "B13", term: "T4" },
  "new york": { code: "JFK", city: "New York", name: "John F. Kennedy", flight: "DL 400", gate: "B22", term: "T4" },
  "nyc": { code: "JFK", city: "New York", name: "John F. Kennedy", flight: "DL 400", gate: "B22", term: "T4" },
  "jfk": { code: "JFK", city: "New York", name: "John F. Kennedy", flight: "DL 400", gate: "B22", term: "T4" },
  "boston": { code: "BOS", city: "Boston", name: "Logan Intl", flight: "DL 210", gate: "A06", term: "T4" },
  "bos": { code: "BOS", city: "Boston", name: "Logan Intl", flight: "DL 210", gate: "A06", term: "T4" },
  "chicago": { code: "ORD", city: "Chicago", name: "O'Hare Intl", flight: "DL 322", gate: "B21", term: "T4" },
  "ord": { code: "ORD", city: "Chicago", name: "O'Hare Intl", flight: "DL 322", gate: "B21", term: "T4" },
  "seattle": { code: "SEA", city: "Seattle", name: "Seattle-Tacoma", flight: "DL 380", gate: "B33", term: "T4" },
  "sea": { code: "SEA", city: "Seattle", name: "Seattle-Tacoma", flight: "DL 380", gate: "B33", term: "T4" },
  "atlanta": { code: "ATL", city: "Atlanta", name: "Hartsfield-Jackson", flight: "DL 090", gate: "B02", term: "T4" },
  "atl": { code: "ATL", city: "Atlanta", name: "Hartsfield-Jackson", flight: "DL 090", gate: "B02", term: "T4" },
  "nashville": { code: "BNA", city: "Nashville", name: "Nashville Intl", flight: "DL 426", gate: "B05", term: "T4" },
  "bna": { code: "BNA", city: "Nashville", name: "Nashville Intl", flight: "DL 426", gate: "B05", term: "T4" },
  "new orleans": { code: "MSY", city: "New Orleans", name: "Louis Armstrong", flight: "DL 452", gate: "B07", term: "T4" },
  "msY": { code: "MSY", city: "New Orleans", name: "Louis Armstrong", flight: "DL 452", gate: "B07", term: "T4" },
  "austin": { code: "AUS", city: "Austin", name: "Austin-Bergstrom", flight: "DL 470", gate: "B08", term: "T4" },
  "aus": { code: "AUS", city: "Austin", name: "Austin-Bergstrom", flight: "DL 470", gate: "B08", term: "T4" },
  "denver": { code: "DEN", city: "Denver", name: "Denver Intl", flight: "DL 362", gate: "B25", term: "T4" },
  "den": { code: "DEN", city: "Denver", name: "Denver Intl", flight: "DL 362", gate: "B25", term: "T4" }
};

// Default Boarding Pass State
const DEFAULT_PASS = {
  airline: "DELTA",
  passenger: "DOLAN / ROBERT",
  passengerDisplay: "Robert Dolan",
  from: "JFK",
  fromCity: "New York",
  to: "CDG",
  toCity: "Paris",
  toAirportName: "Charles de Gaulle",
  date: "24 NOV",
  dateFull: "Tuesday, Nov 24, 2026",
  flight: "DL 264",
  gate: "B28",
  terminal: "T4",
  boardingTime: "5:45 PM",
  departureTime: "6:30 PM",
  zone: "DELTA ONE",
  seat: "01A",
  classType: "FIRST CLASS",
  barcode: "M1DOLAN/ROBERT        EDL264 328Y001A0028 100",
  updatedAt: Date.now()
};

const STATE_FILE = process.env.VERCEL ? "/tmp/pass-state.json" : path.join(__dirname, "pass-state.json");

let currentPass = JSON.parse(JSON.stringify(DEFAULT_PASS));
try {
  if (fs.existsSync(STATE_FILE)) {
    const raw = fs.readFileSync(STATE_FILE, "utf8");
    currentPass = Object.assign({}, DEFAULT_PASS, JSON.parse(raw));
  }
} catch (_) {}

// Ensure initial passenger defaults to DOLAN / ROBERT if old Taylor Swift/Ryan Reynolds was saved
if (currentPass.passenger === "SWIFT / TAYLOR" || currentPass.passenger === "REYNOLDS / RYAN") {
  currentPass.passenger = "DOLAN / ROBERT";
  currentPass.passengerDisplay = "Robert Dolan";
}

function saveState() {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(currentPass, null, 2));
  } catch (_) {}
}

// --- Smart Helpers ---

function formatPassengerName(raw) {
  if (!raw) return { airline: "PASSENGER / VIP", display: "VIP Guest" };
  const clean = String(raw).trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return {
      airline: parts[0].toUpperCase(),
      display: parts[0]
    };
  }
  const first = parts.slice(0, -1).join(" ");
  const last = parts[parts.length - 1];
  return {
    airline: `${last.toUpperCase()} / ${first.toUpperCase()}`,
    display: clean
  };
}

function resolveDestination(raw) {
  if (!raw) return AIRPORTS["paris"];
  const str = String(raw).trim().toLowerCase();
  if (AIRPORTS[str]) return AIRPORTS[str];
  
  // Fuzzy match city name
  for (const [key, info] of Object.entries(AIRPORTS)) {
    if (str.includes(key) || key.includes(str)) return info;
  }

  // If user provided custom 3-letter IATA code or arbitrary city
  const up = String(raw).trim().toUpperCase();
  if (up.length === 3) {
    return { code: up, city: up, name: `${up} Airport`, flight: "DL " + Math.floor(100 + Math.random() * 800), gate: "B" + Math.floor(10 + Math.random() * 30), term: "T4" };
  }
  return {
    code: up.slice(0, 3),
    city: String(raw).trim(),
    name: `${String(raw).trim()} Airport`,
    flight: "DL " + Math.floor(100 + Math.random() * 800),
    gate: "B" + Math.floor(10 + Math.random() * 30),
    term: "T4"
  };
}

function resolveOrigin(raw) {
  if (!raw) return { code: "JFK", city: "New York" };
  const str = String(raw).trim().toLowerCase();
  if (AIRPORTS[str]) return { code: AIRPORTS[str].code, city: AIRPORTS[str].city };
  const up = String(raw).trim().toUpperCase();
  return { code: up.slice(0, 3), city: String(raw).trim() };
}

function formatFlightDate(raw) {
  if (!raw || String(raw).trim().toLowerCase() === "today") {
    const d = new Date();
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return {
      short: `${d.getDate()} ${months[d.getMonth()]}`,
      full: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    };
  }

  if (String(raw).trim().toLowerCase() === "tomorrow") {
    const d = new Date(Date.now() + 86400000);
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return {
      short: `${d.getDate()} ${months[d.getMonth()]}`,
      full: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    };
  }

  const s = String(raw).trim();
  // Try date parse
  const parsed = new Date(s);
  if (!isNaN(parsed.getTime())) {
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return {
      short: `${parsed.getDate()} ${months[parsed.getMonth()]}`,
      full: `${days[parsed.getDay()]}, ${months[parsed.getMonth()]} ${parsed.getDate()}, ${parsed.getFullYear()}`
    };
  }

  // Raw fallback like "Nov 24"
  return {
    short: s.toUpperCase(),
    full: s
  };
}

// --- SSE Client Stream Pool ---
const sseClients = new Set();

function broadcastPassUpdate() {
  const payload = `data: ${JSON.stringify(currentPass)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch (_) {
      sseClients.delete(client);
    }
  }
}

function updatePassFromData(b) {
  // Accept flexible key names from Shortcuts: celebrity, passenger, name, vip, person
  const rawCelebrity = b.celebrity || b.passenger || b.name || b.vip || b.person || b.who;
  const rawTo = b.to || b.destination || b.dest || b.city || b.where || b.airport;
  const rawFrom = b.from || b.origin;
  const rawDate = b.date || b.when || b.day || b.flightDate;
  const rawFlight = b.flight || b.flightNum;
  const rawGate = b.gate;
  const rawSeat = b.seat;

  if (rawCelebrity) {
    const p = formatPassengerName(rawCelebrity);
    currentPass.passenger = p.airline;
    currentPass.passengerDisplay = p.display;
  }

  if (rawTo) {
    const dest = resolveDestination(rawTo);
    currentPass.to = dest.code;
    currentPass.toCity = dest.city;
    currentPass.toAirportName = dest.name;
    if (!rawFlight) currentPass.flight = dest.flight;
    if (!rawGate) currentPass.gate = dest.gate;
    currentPass.terminal = dest.term || "T4";
  }

  if (rawFrom) {
    const orig = resolveOrigin(rawFrom);
    currentPass.from = orig.code;
    currentPass.fromCity = orig.city;
  }

  if (rawDate) {
    const d = formatFlightDate(rawDate);
    currentPass.date = d.short;
    currentPass.dateFull = d.full;
  }

  if (rawFlight) currentPass.flight = String(rawFlight).toUpperCase();
  if (rawGate) currentPass.gate = String(rawGate).toUpperCase();
  if (rawSeat) currentPass.seat = String(rawSeat).toUpperCase();

  // Generate authentic IATA BCBP barcode string
  const cleanPassenger = (currentPass.passenger.replace(/[^A-Z\/ ]/g, "") + "                     ").slice(0, 20);
  const cleanFlight = (currentPass.flight.replace(/\s+/g, "") + "       ").slice(0, 7);
  currentPass.barcode = `M1${cleanPassenger}E${cleanFlight} 328Y001A0028 100`;

  currentPass.updatedAt = Date.now();
  saveState();
  broadcastPassUpdate();
  return currentPass;
}

// --- API Endpoints ---

// 1. SSE Live Stream for sub-50ms instant PWA push
app.get("/api/pass/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  // Send current state immediately upon connection
  res.write(`data: ${JSON.stringify(currentPass)}\n\n`);
  sseClients.add(res);

  req.on("close", () => {
    sseClients.delete(res);
  });
});

// 2. GET current boarding pass state OR update via URL query parameters
// Examples:
//   GET /api/pass -> returns current pass JSON
//   GET /api/pass?name=Robert+Dolan&to=Paris -> updates pass and returns it!
app.get("/api/pass", (req, res) => {
  const q = req.query || {};
  const hasUpdate = q.name || q.celebrity || q.passenger || q.to || q.city || q.destination || q.date;
  if (hasUpdate) {
    try {
      const updated = updatePassFromData(q);
      return res.json({ ok: true, message: "Pass updated via query params", pass: updated });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message });
    }
  }
  res.json({ ok: true, pass: currentPass });
});

// 3. POST /api/pass (The iOS Shortcut & Webhook Endpoint)
app.post("/api/pass", (req, res) => {
  try {
    const b = req.body || {};
    const updated = updatePassFromData(b);
    res.json({
      ok: true,
      message: "Delta boarding pass updated successfully",
      pass: updated
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// 4. Reset to default demo pass
app.post("/api/pass/reset", (req, res) => {
  currentPass = JSON.parse(JSON.stringify(DEFAULT_PASS));
  currentPass.updatedAt = Date.now();
  saveState();
  broadcastPassUpdate();
  res.json({ ok: true, pass: currentPass });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✈️ Delta Wallet Boarding Pass Server running on port ${PORT}`);
  console.log(`📱 Web App: http://localhost:${PORT}`);
  console.log(`🎛️ Controller / Test Panel: http://localhost:${PORT}/controller.html`);
});
