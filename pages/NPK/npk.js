const ctx1 = document.getElementById('npkChart1').getContext('2d');
    const ctx2 = document.getElementById('npkChart2').getContext('2d');

    const npkDataTemplate = {
        labels: [],
        datasets: [
            {
                label: 'Nitrogen (N)',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Phosphorus (P)',
                data: [],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            },
            {
                label: 'Potassium (K)',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    };

    const npkData1 = JSON.parse(JSON.stringify(npkDataTemplate));
    const npkData2 = JSON.parse(JSON.stringify(npkDataTemplate));

    const npkChart1 = new Chart(ctx1, {
        type: 'line',
        data: npkData1,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const npkChart2 = new Chart(ctx2, {
        type: 'line',
        data: npkData2,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = function(event) {
        const data = JSON.parse(event.data);

        if (data.sensor === 1) {
            npkData1.labels.push(data.timestamp);
            npkData1.datasets[0].data.push(data.nitrogen);
            npkData1.datasets[1].data.push(data.phosphorus);
            npkData1.datasets[2].data.push(data.potassium);
            npkChart1.update();
            localStorage.setItem('npkData1', JSON.stringify(npkData1));
        } else if (data.sensor === 2) {
            npkData2.labels.push(data.timestamp);
            npkData2.datasets[0].data.push(data.nitrogen);
            npkData2.datasets[1].data.push(data.phosphorus);
            npkData2.datasets[2].data.push(data.potassium);
            npkChart2.update();
            localStorage.setItem('npkData2', JSON.stringify(npkData2));
        }
    };

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }
    function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('active');
        }
    
        function loadData() {
            const npkData1 = JSON.parse(localStorage.getItem('npkData1')) || {};
            const npkData2 = JSON.parse(localStorage.getItem('npkData2')) || {};
            const table = document.getElementById('data-table');
    
            npkData1.labels.forEach((timestamp, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${timestamp}</td>
                    <td>1</td>
                    <td>${npkData1.datasets[0].data[index]}</td>
                    <td>${npkData1.datasets[1].data[index]}</td>
                    <td>${npkData1.datasets[2].data[index]}</td>
                `;
                table.appendChild(row);
            });
    
            npkData2.labels.forEach((timestamp, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${timestamp}</td>
                    <td>2</td>
                    <td>${npkData2.datasets[0].data[index]}</td>
                    <td>${npkData2.datasets[1].data[index]}</td>
                    <td>${npkData2.datasets[2].data[index]}</td>
                `;
                table.appendChild(row);
            });
        }
    
        window.onload = loadData;