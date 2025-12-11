from flask import Flask, Response, jsonify
from flask_cors import CORS
from gpiozero import LED
from ultralytics import YOLO
import cv2
import time
import requests
import threading

app = Flask(__name__)
CORS(app)

# --------------------------
# GPIO LED
# --------------------------
led = LED(17)

# --------------------------
# Telegram Config
# --------------------------
BOT_TOKEN = '8558989143:AAHDgfHZaLal22cYYijoaz1q9JkV_8gO18s'
CHAT_ID = '1168937857'

def send_telegram_alert(message):
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    data = {'chat_id': CHAT_ID, 'text': message}
    try:
        response = requests.post(url, data=data)
        print("Telegram response:", response.text)
    except Exception as e:
        print("Error:", e)

# --------------------------
# YOLO & Detection Settings
# --------------------------
model_path = "/home/pi/yolo/best.pt"
CONF_THRESHOLD = 0.5
FRAMES_TO_CONFIRM = 3
COOLDOWN_TIME = 5

model = YOLO(model_path)

# --------------------------
# Global Variables
# --------------------------
elephant_detected = False
detection_lock = threading.Lock()

# --------------------------
# Detection Thread
# --------------------------
def detection_loop():
    global elephant_detected

    cap = cv2.VideoCapture(0)  # 0 = USB webcam
    if not cap.isOpened():
        print("ERROR: Cannot access webcam")
        return

    detection_confirmed = 0
    elephant_present = False
    last_alert_time = 0

    print("Camera started... Detecting...")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Camera frame not received")
            time.sleep(0.1)
            continue

        results = model(frame)

        # Check if elephant detected
        elephants = []
        for box in results[0].boxes:
            cls_id = int(box.cls)
            label = model.names[cls_id]
            conf = float(box.conf)

            if label.lower() == "elephant" and conf >= CONF_THRESHOLD:
                elephants.append(box)

        if elephants:
            detection_confirmed += 1
        else:
            detection_confirmed = 0

        current_time = time.time()

        # Elephant enters
        if detection_confirmed >= FRAMES_TO_CONFIRM and not elephant_present:
            elephant_present = True
            led.on()

            with detection_lock:
                elephant_detected = True

            if current_time - last_alert_time > COOLDOWN_TIME:
                send_telegram_alert("🚨 Elephant detected!")
                last_alert_time = current_time
                print("ALERT: Elephant detected!")

        # Elephant leaves
        if detection_confirmed == 0 and elephant_present:
            elephant_present = False
            led.off()

            with detection_lock:
                elephant_detected = False

            if current_time - last_alert_time > COOLDOWN_TIME:
                send_telegram_alert("✅ Elephant left the area.")
                last_alert_time = current_time
                print("INFO: Elephant left the area.")

        time.sleep(0.03)  # ~30 FPS

    cap.release()
    led.off()
    print("Camera stopped.")

# --------------------------
# Flask Routes
# --------------------------
@app.route('/status')
def status():
    with detection_lock:
        detected = elephant_detected
    
    return jsonify({
        'status': 'detected' if detected else 'clear',
        'timestamp': time.time()
    })

@app.route('/health')
def health():
    return jsonify({'status': 'online', 'message': 'Server is running'})

@app.after_request
def add_cors_headers(response):
    """Add CORS headers to all responses"""
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

# --------------------------
# Main
# --------------------------
if __name__ == "__main__":
    # Start detection in background thread
    detection_thread = threading.Thread(target=detection_loop, daemon=True)
    detection_thread.start()
    
    print("Starting Flask server on port 5001...")
    print("Access status at: http://<raspberry-pi-ip>:5001/status")
    print("Dashboard will show alerts when elephant is detected")
    
    # Run Flask app
    app.run(host='0.0.0.0', port=5001, threaded=True, debug=False)
