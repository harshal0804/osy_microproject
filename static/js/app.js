// Fetch data from Flask server
function fetchData() {
    fetch('/cpu-data')
        .then(response => response.json())
        .then(data => {
            updateCpuChart(data);
            updateCpuInfo(data);
        });

    fetch('/memory-data')
        .then(response => response.json())
        .then(data => {
            updateMemoryChart(data);
        });

    fetch('/network-data')
        .then(response => response.json())
        .then(data => {
            updateNetworkChart(data);
        });

    fetch('/disk-data')
        .then(response => response.json())
        .then(data => {
            updateDiskChart(data);
        });
}

// CPU Chart (like the previous code you provided)
const cpuChart = new Chart(document.getElementById('cpuChart'), {
    type: 'line',
    data: {
        labels: [],  // Will be filled with time labels
        datasets: [{
            label: 'CPU Usage (%)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            tension: 0.1,
            fill: false,
        }]
    }
});

// Update CPU Chart with new data
function updateCpuChart(cpuData) {
    const avgCpuUsage = cpuData.cpu_percent.reduce((a, b) => a + b) / cpuData.cpu_percent.length;
    cpuChart.data.labels.push(new Date().toLocaleTimeString());
    cpuChart.data.datasets[0].data.push(avgCpuUsage);
    cpuChart.update();
}

// Update CPU Info (cores and threads)
function updateCpuInfo(cpuData) {
    const cpuInfoDiv = document.getElementById('cpuInfo');
    cpuInfoDiv.innerHTML = `
        <strong>Cores:</strong> ${cpuData.core_count} <br>
        <strong>Threads:</strong> ${cpuData.thread_count}
    `;
}

// Memory Chart
const memoryChart = new Chart(document.getElementById('memoryChart'), {
    type: 'doughnut',
    data: {
        labels: ['Used', 'Free'],
        datasets: [{
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverOffset: 4
        }]
    }
});

function updateMemoryChart(memoryData) {
    memoryChart.data.datasets[0].data = [memoryData.used, memoryData.total - memoryData.used];
    memoryChart.update();
}

// Network Chart
const networkChart = new Chart(document.getElementById('networkChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Sent (bytes)',
            borderColor: 'rgb(75, 192, 192)',
            data: [],
            fill: false,
        },
        {
            label: 'Received (bytes)',
            borderColor: 'rgb(54, 162, 235)',
            data: [],
            fill: false,
        }]
    }
});

function updateNetworkChart(networkData) {
    networkChart.data.labels.push(new Date().toLocaleTimeString());
    networkChart.data.datasets[0].data.push(networkData.bytes_sent);
    networkChart.data.datasets[1].data.push(networkData.bytes_recv);
    networkChart.update();
}

// Disk Chart
const diskChart = new Chart(document.getElementById('diskChart'), {
    type: 'bar',
    data: {
        labels: ['Read', 'Write'],
        datasets: [{
            label: 'Disk I/O (bytes)',
            backgroundColor: ['#FFCE56', '#FF6384'],
            data: []
        }]
    }
});

function updateDiskChart(diskData) {
    diskChart.data.datasets[0].data = [diskData.read_bytes, diskData.write_bytes];
    diskChart.update();
}

// Update every 2 seconds
setInterval(fetchData, 2000);
