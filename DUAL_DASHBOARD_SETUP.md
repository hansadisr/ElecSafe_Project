# Two-Dashboard Setup Guide

## Overview

You now have **TWO separate detection systems**:

1. **Train/Elephant Detection** (Port 5000) - With LED control and day/night models
2. **Vehicle Detection** (Port 5001) - Vehicle monitoring system

Each runs on a different port and has its own dashboard page.

---

## 🖥️ Dashboard URLs

- **Home Page**: `http://localhost:3000/`
- **Train/Elephant Dashboard**: `http://localhost:3000/train`
- **Vehicle Dashboard**: `http://localhost:3000/vehicle`

---

## 🔧 Raspberry Pi Setup

### On Your Raspberry Pi (or the other laptop with Pi):

**1. Install Dependencies:**
```bash
pip install flask flask-cors opencv-python ultralytics requests gpiozero
```

**2. Copy Both Python Files:**
- `raspberry-pi-server.py` → For Train/Elephant detection
- `vehicle-detection-server.py` → For Vehicle detection

**3. Run BOTH Servers:**

Open **two separate terminals** on the Raspberry Pi:

**Terminal 1 - Train Detection:**
```bash
cd /home/pi/
python raspberry-pi-server.py
```
Should show:
```
==================================================
🐘 TRAIN/ELEPHANT DETECTION SERVER
==================================================
Server will run on http://10.182.66.142:5000
```

**Terminal 2 - Vehicle Detection:**
```bash
cd /home/pi/
python vehicle-detection-server.py
```
Should show:
```
==================================================
🚗 VEHICLE DETECTION SERVER
==================================================
Server will run on http://10.182.66.142:5001
```

---

## 💻 On Your Computer

**1. Start the React Dashboard:**
```powershell
npm start
```

**2. Open in Browser:**
```
http://localhost:3000
```

You'll see the home page with two options:
- Click **Train/Elephant Detection** to see train detection dashboard
- Click **Vehicle Detection** to see vehicle detection dashboard

---

## 📋 How It Works

```
┌─────────────────────────────────────────────────────┐
│           RASPBERRY PI (10.182.66.142)              │
├─────────────────────────────────────────────────────┤
│                                                      │
│  📹 Camera → YOLO Model (best.pt)                   │
│                ↓                                     │
│  🐘 Train Server (Port 5000) ← LED Control         │
│                ↓                                     │
│  🚗 Vehicle Server (Port 5001)                      │
│                                                      │
└─────────────────────────────────────────────────────┘
                        ↓ HTTP Requests
┌─────────────────────────────────────────────────────┐
│              YOUR COMPUTER                          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  🌐 React Dashboard (Port 3000)                     │
│     ├─ Home Page (/)                                │
│     ├─ Train Detection (/train)                     │
│     └─ Vehicle Detection (/vehicle)                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Differences Between Detection Systems

### Train/Elephant Detection (Port 5000):
- ✅ LED control (GPIO17)
- ✅ Day/Night model switching
- ✅ Video: `best_train.pt` (day) or `best.pt` (night)
- ✅ Confirms detection over 3 frames
- ✅ Telegram alerts on entry/exit
- 🎨 **Blue gradient** dashboard

### Vehicle Detection (Port 5001):
- ✅ Continuous detection with cooldown
- ✅ 5-frame confirmation
- ✅ 10-second alert cooldown
- ✅ Saves output as `vehicle_output.mp4`
- ✅ Telegram alerts
- 🎨 **Green gradient** dashboard

---

## 🧪 Testing Locally (Without Raspberry Pi)

If you want to test on your computer first:

**1. Update IPs in the dashboard files:**

In `src/components/TrainDetection.js`:
```javascript
const res = await axios.get("http://localhost:5000/status");
```

In `src/components/VehicleDetection.js`:
```javascript
const res = await axios.get("http://localhost:5001/status");
```

**2. Run the test server:**
```powershell
python test-server.py
```

**3. Start dashboard:**
```powershell
npm start
```

---

## 🐛 Troubleshooting

### Dashboard shows "Connection Error":
- ✅ Check both Python servers are running on Raspberry Pi
- ✅ Verify IP address: `10.182.66.142`
- ✅ Both computer and Pi must be on same WiFi
- ✅ Test directly: `http://10.182.66.142:5000/status` in browser

### Port Already in Use:
```bash
# On Raspberry Pi
sudo lsof -ti:5000 | xargs kill -9
sudo lsof -ti:5001 | xargs kill -9
```

### Only One Detection Works:
- Make sure BOTH servers are running on the Raspberry Pi
- Check you opened two separate terminals

---

## 📁 File Structure

```
elephant-detection-dashboard/
├── src/
│   ├── App.js                           # Main app with routing
│   ├── components/
│   │   ├── Home.js                      # Home page with selection
│   │   ├── TrainDetection.js            # Train dashboard
│   │   ├── VehicleDetection.js          # Vehicle dashboard
│   │   └── StatusCard.js                # Shared status card
│   └── ...
├── raspberry-pi-server.py               # Train/Elephant server (Port 5000)
├── vehicle-detection-server.py          # Vehicle server (Port 5001)
├── test-server.py                       # Local testing server
└── package.json
```

---

## 🚀 Quick Start Commands

**On Raspberry Pi:**
```bash
python raspberry-pi-server.py &    # Run in background
python vehicle-detection-server.py &
```

**On Your Computer:**
```powershell
npm start
```

**Open Browser:**
```
http://localhost:3000
```

---

## 📝 Notes

- Both servers can run simultaneously on different ports
- Each dashboard updates every 2 seconds
- Navigation bar at top allows quick switching between dashboards
- Home page provides easy access to both systems
- Each system works independently with its own model and settings
