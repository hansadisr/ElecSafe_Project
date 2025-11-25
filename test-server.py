"""
Test Server for Local Testing (without Raspberry Pi)
This simulates elephant detection for testing your dashboard

Run: python test-server.py
Then run: npm start
"""

from flask import Flask, jsonify
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)

# Simulate detection state
elephant_detected = False
last_toggle = time.time()

@app.route('/status', methods=['GET'])
def get_status():
    """
    Returns current detection status
    Randomly toggles between detected/clear for testing
    """
    global elephant_detected, last_toggle
    
    # Toggle state every 10 seconds for testing
    if time.time() - last_toggle > 10:
        elephant_detected = not elephant_detected
        last_toggle = time.time()
        print(f"🐘 Status changed: {'DETECTED' if elephant_detected else 'CLEAR'}")
    
    if elephant_detected:
        return jsonify({"status": "detected"}), 200
    else:
        return jsonify({"status": "clear"}), 200

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"message": "Test server is running"}), 200

if __name__ == '__main__':
    print("=" * 50)
    print("🧪 TEST SERVER FOR DASHBOARD")
    print("=" * 50)
    print("✅ Server running on http://localhost:5000")
    print("📊 Dashboard will connect from http://localhost:3000")
    print("🔄 Status will toggle every 10 seconds")
    print("Press CTRL+C to stop")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
