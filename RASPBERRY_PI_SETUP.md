# Raspberry Pi Setup Instructions

## What You Need to Do

Your React dashboard needs a **Python server running on your Raspberry Pi** to detect elephants and report the status.

## Step-by-Step Setup

### 1. On Your Raspberry Pi

**a) Install Python packages:**
```bash
pip install flask flask-cors
```

**b) Copy the `raspberry-pi-server.py` file to your Raspberry Pi**

You can use:
- USB drive
- SCP command: `scp raspberry-pi-server.py pi@10.182.66.142:/home/pi/`
- Or copy-paste the code manually

**c) Run the server:**
```bash
python raspberry-pi-server.py
```

You should see:
```
🐘 Elephant Detection Server Starting...
Server will run on http://10.182.66.142:5000
```

### 2. On Your Computer

**a) Start your React dashboard:**
```bash
npm start
```

**b) Open browser to `http://localhost:3000`**

Your dashboard should now connect to the Raspberry Pi!

## How It Works

```
[Raspberry Pi]                    [Your Computer]
     |                                   |
     | 1. Camera detects elephant        |
     | 2. AI model processes image       |
     | 3. Flask server runs on port 5000 |
     |                                   |
     |    <---- HTTP Request ----        | 4. React asks: "Any elephants?"
     |    ---- Response: {status} ---->  | 5. Gets answer every 2 seconds
     |                                   |
     |                                   | 6. Shows red alert if detected
```

## Testing Without Raspberry Pi

If you want to test on your computer first:

1. Change the IP in `src/App.js` to:
   ```javascript
   const res = await axios.get("http://localhost:5000/status");
   ```

2. Run `raspberry-pi-server.py` on your computer:
   ```bash
   python raspberry-pi-server.py
   ```

3. Run your dashboard:
   ```bash
   npm start
   ```

The current server code simulates random elephant detection. You'll need to replace the `# TODO` section with your actual detection logic.

## Integrating Your Elephant Detection Model

Replace this part in `raspberry-pi-server.py`:

```python
# TODO: Replace this with your actual elephant detection logic
elephant_detected = random.choice([True, False, False, False])
```

With your actual detection code, for example:

```python
# Example with camera and ML model
import cv2
from your_model import detect_elephant

cap = cv2.VideoCapture(0)
ret, frame = cap.read()
elephant_detected = detect_elephant(frame)  # Your detection function
```

## Troubleshooting

**Dashboard shows "Connection Error":**
- Make sure the Python server is running on Raspberry Pi
- Check the IP address is correct (10.182.66.142)
- Both devices must be on the same WiFi network
- Try accessing `http://10.182.66.142:5000/status` in your browser

**Port already in use:**
```bash
# Kill the process using port 5000
sudo lsof -ti:5000 | xargs kill -9
```

**Firewall issues:**
```bash
# On Raspberry Pi, allow port 5000
sudo ufw allow 5000
```
