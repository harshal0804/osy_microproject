from flask import Flask, jsonify, render_template
import psutil

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # This serves the main HTML page

@app.route('/api/system')
def get_system_data():
    cpu_percent = psutil.cpu_percent(percpu=True)  # Per-thread CPU usage
    memory_info = psutil.virtual_memory()
    net_io = psutil.net_io_counters()
    disk_io = psutil.disk_io_counters()

    return jsonify({
        'cpu': cpu_percent,
        'memory': {
            'total': memory_info.total,
            'used': memory_info.used
        },
        'network': {
            'bytes_sent': net_io.bytes_sent,
            'bytes_recv': net_io.bytes_recv
        },
        'disk': {
            'read_bytes': disk_io.read_bytes,
            'write_bytes': disk_io.write_bytes
        }
    })

if __name__ == '__main__':
    app.run(debug=True)
