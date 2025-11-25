"""
Raspberry Pi Elephant Detection Server with YOLO Integration
Run this file ON your Raspberry Pi (not on your computer)

Install requirements first:
pip install flask flask-cors opencv-python ultralytics requests gpiozero

Then run:
python raspberry-pi-server.py
"""

from flask import Flask, jsonify
from flask_cors import CORS
from gpiozero import LED
from ultralytics import YOLO
import cv2
import threading
import time
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow requests from your React dashboard

# --------------------------
# GPIO LED SETUP
# --------------------------
led = LED(17)  # GPIO17 LED

# --------------------------
# TELEGRAM CONFIG
# --------------------------
BOT_TOKEN = '8558989143:AAHDgfHZaLal22cYYijoaz1q9JkV_8gO18s'
CHAT_ID = '1168937857'

def send_telegram_alert(message):
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    data = {'chat_id': CHAT_ID, 'text': message}
    try:
        response = requests.post(url, data=data)
        if response.status_code == 200:
            print("Telegram alert sent:", message)
        else:
            print("Failed to send alert:", response.text)
    except Exception as e:
        print("Error sending alert:", e)

# --------------------------
# GLOBAL STATE
# --------------------------
elephant_detected = False
detection_lock = threading.Lock()

# --------------------------
# DAY/NIGHT MODEL SELECTION
# --------------------------
def is_daytime():
    now = datetime.now()
    hour = now.hour
    return 6 <= hour < 18  # Day = 6AM to 6PM

def get_model_and_video():
    if is_daytime():
        model_path = "/home/pi/yolo/best_train.pt"
        video_path = "/home/pi/yolo/day time.mp4"
        print("Daytime detected: Loading daytime model and video")
    else:
        model_path = "/home/pi/yolo/best.pt"
        video_path = "/home/pi/yolo/inputyolo.mp4"
        print("Nighttime detected: Loading nighttime model and video")
    return model_path, video_path

# --------------------------
# DETECTION THREAD
# --------------------------
def detection_loop():
    global elephant_detected
    
    print("Starting elephant detection loop...")
    
    # Load model and video
    model_path, video_path = get_model_and_video()
    model = YOLO(model_path)
    
    # Detection settings
    CONF_THRESHOLD = 0.5
    FRAMES_TO_CONFIRM = 3
    
    # State tracking
    elephant_present = False
    detection_confirmed = 0
    
    while True:
        cap = cv2.VideoCapture(video_path)
        
        if not cap.isOpened():
            print("ERROR: Cannot open video file")
            time.sleep(5)
            continue
        
        while True:
            ret, frame = cap.read()
            if not ret:
                print("End of video - restarting...")
                break
            
            # Run YOLO detection
            results = model(frame)
            
            # Check for elephants
            high_conf_elephants = []
            for box in results[0].boxes:
                cls_id = int(box.cls[0])
                label = model.names[cls_id]
                conf = float(box.conf)
                if label.lower() == "elephant" and conf >= CONF_THRESHOLD:
                    high_conf_elephants.append(box)
            
            # Confirm detection
            if high_conf_elephants:
                detection_confirmed += 1
            else:
                detection_confirmed = 0
            
            # Update global state with thread safety
            with detection_lock:
                # Elephant entered
                if detection_confirmed >= FRAMES_TO_CONFIRM and not elephant_present:
                    elephant_present = True
                    elephant_detected = True
                    led.on()
                    print("ALERT: Elephant entered | LED ON")
                    send_telegram_alert("ALERT: Elephant entered the frame!")
                
                # Elephant left
                elif detection_confirmed == 0 and elephant_present:
                    elephant_present = False
                    elephant_detected = False
                    led.off()
                    print("Elephant left | LED OFF")
                    send_telegram_alert("Elephant left the frame.")
            
            # Small delay to prevent CPU overload
            time.sleep(0.03)
        
        cap.release()

# --------------------------
# FLASK ROUTES
# --------------------------
@app.route('/status', methods=['GET'])
def get_status():
    """
    This endpoint returns the current detection status.
    Your React dashboard calls this every 2 seconds.
    """
    with detection_lock:
        if elephant_detected:
            return jsonify({"status": "detected", "type": "train"}), 200
        else:
            return jsonify({"status": "clear", "type": "train"}), 200

@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({"message": "Server is running"}), 200

@app.route('/led/on', methods=['POST'])
def led_on():
    """Manually turn LED on"""
    led.on()
    return jsonify({"message": "LED turned ON"}), 200

@app.route('/led/off', methods=['POST'])
def led_off():
    """Manually turn LED off"""
    led.off()
    return jsonify({"message": "LED turned OFF"}), 200

# --------------------------
# MAIN
# --------------------------
if __name__ == '__main__':
    print("=" * 50)
    print("TRAIN/ELEPHANT DETECTION SERVER")
    print("=" * 50)
    print("Server will run on http://10.182.66.142:5000")
    print("Dashboard URL: http://localhost:3000/train")
    print("Press CTRL+C to stop")
    print("=" * 50)
    
    # Start detection in background thread
    detection_thread = threading.Thread(target=detection_loop, daemon=True)
    detection_thread.start()
    
    # Run Flask server on all network interfaces
    try:
        app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
    except KeyboardInterrupt:
        print("\nShutting down...")
        led.off()
        print("Cleanup complete")
