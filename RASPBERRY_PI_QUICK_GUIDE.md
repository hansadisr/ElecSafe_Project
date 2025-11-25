# Raspberry Pi Setup - Quick Guide

## Files to Copy to Raspberry Pi

Copy these two Python files to your Raspberry Pi:

1. **train_ui.py** - Train/Elephant Detection (Port 5000)
2. **vehicle_UI.py** - Vehicle Detection (Port 5001)

---

## Installation (One Time Only)

On Raspberry Pi, run:
```bash
pip install flask flask-cors opencv-python ultralytics requests gpiozero
```

---

## Running on Raspberry Pi

Open **two separate terminals** on Raspberry Pi:

### Terminal 1 - Train Detection
```bash
cd /home/pi/
python train_ui.py
```

Expected output:
```
==================================================
TRAIN/ELEPHANT DETECTION SERVER
==================================================
Server will run on http://10.182.66.142:5000
Dashboard URL: http://localhost:3000/train
Press CTRL+C to stop
==================================================
```

### Terminal 2 - Vehicle Detection
```bash
cd /home/pi/
python vehicle_UI.py
```

Expected output:
```
==================================================
VEHICLE DETECTION SERVER
==================================================
Server will run on http://10.182.66.142:5001
Dashboard URL: http://localhost:3000/vehicle
Press CTRL+C to stop
==================================================
```

---

## On Your Computer

Start the dashboard:
```powershell
npm start
```

Open browser: `http://localhost:3000`

---

## Summary

- **train_ui.py** → Port 5000 → `/train` dashboard
- **vehicle_UI.py** → Port 5001 → `/vehicle` dashboard
- Both use LED (GPIO17)
- Both send Telegram alerts
- Run both simultaneously on Raspberry Pi
