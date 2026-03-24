import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()

INSTANCE_ID = os.getenv("ULTRAMSG_INSTANCE_ID", "instance166772")
TOKEN       = os.getenv("ULTRAMSG_TOKEN", "")
PHONE       = os.getenv("WHATSAPP_PHONE", "91XXXXXXXXXX")  # with country code, no + sign

last_alert_time = 0
last_alert_level = ""
ALERT_COOLDOWN  = 120        # seconds between alerts (prevents spam)

def send_whatsapp(message):
    global last_alert_time, last_alert_level
    now = time.time()
    
    level = "DANGER" if "DANGER" in message else "WARNING"
    bypass_cooldown = (level == "DANGER" and last_alert_level == "WARNING")
    
    if now - last_alert_time < ALERT_COOLDOWN and not bypass_cooldown:
        return                # skip if sent recently
        
    url = f"https://api.ultramsg.com/{INSTANCE_ID}/messages/chat"
    payload = {
        "token": TOKEN,
        "to":    f"+{PHONE}",
        "body":  message
    }
    try:
        response = requests.post(url, data=payload, timeout=5)
        last_alert_time = now
        last_alert_level = level
        print(f"WhatsApp sent via UltraMsg: {message} | Response: {response.text}")
    except Exception as e:
        print(f"WhatsApp failed: {e}")
