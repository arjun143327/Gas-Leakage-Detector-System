import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()

PHONE    = os.getenv("CALLMEBOT_PHONE", "91XXXXXXXXXX")   # your number with country code, no + sign
API_KEY  = os.getenv("CALLMEBOT_API_KEY", "YOUR_API_KEY")   # from Callmebot reply

last_alert_time = 0
ALERT_COOLDOWN  = 120        # seconds between alerts (prevents spam)

def send_whatsapp(message):
    global last_alert_time
    now = time.time()
    if now - last_alert_time < ALERT_COOLDOWN:
        return                # skip if sent recently
    url = (f'https://api.callmebot.com/whatsapp.php'
           f'?phone={PHONE}&text={requests.utils.quote(message)}&apikey={API_KEY}')
    try:
        requests.get(url, timeout=5)
        last_alert_time = now
        print(f'WhatsApp sent: {message}')
    except Exception as e:
        print(f'WhatsApp failed: {e}')
