# IoT Gas Leakage Detector System 🚨

An end-to-end IoT solution designed to monitor LPG gas levels in real-time, log the data, visualize it on a live dashboard, and trigger urgent WhatsApp alerts during critical leaks.

## 🌟 Features
- **Real-Time Monitoring**: NodeMCU paired with an MQ-6 Gas Sensor reads and transmits gas levels (ppm) every 5 seconds.
- **Live Local Dashboard**: React-based frontend providing a live chart, status indicators, and an alert history log.
- **Automated WhatsApp Alerts**: Backend integrated with UltraMsg API to send configured WhatsApp messages based on danger thresholds.
- **SQLite Data Logging**: Lightweight local database automatically storing all sensor readings and alerts for historical analysis.
- **Spam Protection**: Built-in 120-second alert cooldown to prevent WhatsApp spam, with an intelligent override if the situation escalates from *Warning* to *Danger*.

---

## 🏗️ Architecture Stack
- **Hardware**: NodeMCU ESP8266 & MQ-6 Gas Sensor
- **Firmware**: Arduino C++
- **Backend API**: Python 3, Flask, SQLite
- **Frontend Dashboard**: React.js, Recharts, Axios
- **External Services**: UltraMsg WhatsApp API

---

## 🚀 Setup & Installation

### 1. Arduino Firmware (Hardware)
1. Open the `firmware/nodemcu_code/nodemcu_code.ino` sketch in the Arduino IDE.
2. Rename `firmware/nodemcu_code/secrets.h.example` to `secrets.h`.
3. Update `secrets.h` with your local Wi-Fi 2.4GHz credentials and your laptop's Local IP address.
4. Select *NodeMCU 1.0 (ESP-12E Module)* and upload the code.

### 2. Flask Backend (Python)
1. Navigate to the backend directory:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Rename `.env.example` to `.env`.
3. Update `.env` with your UltraMsg Instance ID, Token, and target WhatsApp Phone Number.
4. Start the server (runs on port 5000):
   ```bash
   python app.py
   ```

### 3. React Frontend (Dashboard)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the dashboard (runs on port 3000):
   ```bash
   npm start
   ```

---

## 🎛️ How It Works

1. **SAFE (< 300 ppm)** \
   The dashboard displays a green status. Data is logged, but no alerts are sent.
   
2. **WARNING (300 - 699 ppm)** \
   The dashboard turns orange. A Warning WhatsApp alert is dispatched advising inspection and ventilation.
   
3. **DANGER (700+ ppm)** \
   The dashboard turns red. A Critical WhatsApp alert is dispatched immediately instructing evacuation. This bypasses any existing Warning cooldowns.

---

> **Note on Security:** All sensitive keys, API tokens, and Wi-Fi credentials are kept out of this repository using `.gitignore`. Use the provided `.example` files as templates to create your own configuration files locally.
