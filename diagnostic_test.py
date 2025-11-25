"""
Diagnostic Test for vehicle_UI.py
Run this first to check what's wrong
"""

import sys

print("=" * 60)
print("DIAGNOSTIC TEST FOR VEHICLE_UI.PY")
print("=" * 60)

# Test 1: Check Python version
print("\n1. Python Version:")
print(f"   {sys.version}")

# Test 2: Check imports
print("\n2. Checking imports...")
try:
    from flask import Flask, jsonify
    print("   [OK] Flask installed")
except ImportError as e:
    print(f"   [ERROR] Flask not installed: {e}")

try:
    from flask_cors import CORS
    print("   [OK] Flask-CORS installed")
except ImportError as e:
    print(f"   [ERROR] Flask-CORS not installed: {e}")

try:
    from gpiozero import LED
    print("   [OK] gpiozero installed")
except ImportError as e:
    print(f"   [ERROR] gpiozero not installed: {e}")

try:
    from ultralytics import YOLO
    print("   [OK] ultralytics installed")
except ImportError as e:
    print(f"   [ERROR] ultralytics not installed: {e}")

try:
    import cv2
    print("   [OK] opencv (cv2) installed")
except ImportError as e:
    print(f"   [ERROR] opencv not installed: {e}")

try:
    import requests
    print("   [OK] requests installed")
except ImportError as e:
    print(f"   [ERROR] requests not installed: {e}")

# Test 3: Check if files exist
print("\n3. Checking file paths...")
import os

model_path = "/home/pi/yolo/best_train.pt"
video_path = "/home/pi/yolo/day time.mp4"

if os.path.exists(model_path):
    print(f"   [OK] Model found: {model_path}")
else:
    print(f"   [ERROR] Model NOT found: {model_path}")

if os.path.exists(video_path):
    print(f"   [OK] Video found: {video_path}")
else:
    print(f"   [ERROR] Video NOT found: {video_path}")

# Test 4: Check if port 5001 is available
print("\n4. Checking if port 5001 is available...")
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
result = sock.connect_ex(('127.0.0.1', 5001))
if result == 0:
    print("   [WARNING] Port 5001 is already in use!")
else:
    print("   [OK] Port 5001 is available")
sock.close()

# Test 5: Try to initialize LED
print("\n5. Testing LED initialization...")
try:
    from gpiozero import LED
    test_led = LED(17)
    print("   [OK] LED initialized on GPIO17")
    test_led.close()
except Exception as e:
    print(f"   [ERROR] LED initialization failed: {e}")

print("\n" + "=" * 60)
print("DIAGNOSTIC COMPLETE")
print("=" * 60)
print("\nIf you see any [ERROR] messages above, fix those first!")
print("Then try running: python vehicle_UI.py")
