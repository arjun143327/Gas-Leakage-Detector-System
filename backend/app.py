from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, save_reading, save_alert, get_recent_readings, get_recent_alerts
from alerts import send_whatsapp

app = Flask(__name__)
CORS(app)   # allows React (port 3000) to talk to Flask (port 5000)
init_db()

# --- NodeMCU posts data here every 5 seconds ---
@app.route('/api/sensor', methods=['POST'])
def receive_sensor():
    data   = request.get_json()
    ppm    = data['ppm']
    status = data['status']
    save_reading(ppm, status)
    if status in ('WARNING', 'DANGER'):
        save_alert(ppm, status)
        if status == 'DANGER':
            msg = f"🚨 *DANGER: CRITICAL LPG GAS LEAK* 🚨\n\nGas level is dangerously high ({ppm} ppm)!\n\n⚠️ Evacuate the area immediately!\n⚠️ Do not turn on/off electrical switches!\n⚠️ Open windows if safe to do so."
        else:
            msg = f"⚠️ *WARNING: Elevated Gas Detected* ⚠️\n\nGas level has crossed the safe threshold ({ppm} ppm).\n\nCheck the kitchen/cylinder for potential leaks and ensure ventilation."
        send_whatsapp(msg)
    return jsonify({'received': True})

# --- React fetches live data from here ---
@app.route('/api/readings', methods=['GET'])
def get_readings():
    return jsonify(get_recent_readings(60))

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    return jsonify(get_recent_alerts(10))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
