
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAsUAeoCPXZqf8xWMFmXb7yDH1q_QeRn5s",
    authDomain: "ta-co2.firebaseapp.com",
    databaseURL: "https://ta-co2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ta-co2",
    storageBucket: "ta-co2.appspot.com",
    messagingSenderId: "814028551099",
    appId: "1:814028551099:web:ebcce6d9f415fbc12b0a9e"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  // Function to update sensor data on the webpage
  function updateData() {
    database.ref("sensor_CO2").on("value", (snapshot) => {
      let data = []
      snapshot.forEach(function(res) {
        try {    
          if(Object.keys(res.val()).length < 2) return


          if(res.val().value === "" || res.val().value === undefined || res.val().time === "" || res.val().time == undefined || res.val() == null || res.val() == undefined) return

          let time = res.val().time.split("#") || 0;

          data.push({
            co2: res.val().value,
            waktu: new Date(`${time[0]} ${time[1]}`).getTime() || 0,
            jam: `${time[0]} ${time[1]}`,
          })
        } catch (error) {
            
        }
      })

      data.sort((a, b) => b.waktu - a.waktu);

      data = data[0]

      if (data) {
        const co2Level = parseFloat(data.co2);
        document.getElementById("co2_1").textContent = co2Level;
        let recommendation;
        if (co2Level > 1000) {
          recommendation = "Tingkat CO2 sangat tinggi: Segera semprotkan CO2";
        } else if (co2Level > 800) {
          recommendation = "Tingkat CO2 tinggi: Pertimbangkan untuk mengurangi CO2.";
        } else if (co2Level > 600) {
          recommendation = "Tingkat CO2 sedang: Monitor dan atur sesuai kebutuhan.";
        } else {
          recommendation = "Tingkat CO2 rendah: Tidak perlu aksi.";
        }

        document.getElementById("rec_1").textContent = recommendation;
      }
    });
  }

  // Function to update history
  function updateHistory() {
    database.ref("sensor_CO2").limitToLast(50).on("child_added", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tableBody = document.getElementById("history_table");
        const rowCount = tableBody.rows.length;

        // Parse timestamp
        let timestamp;
        if (data.time) {
          timestamp = new Date(data.time);
          if (isNaN(timestamp.getTime())) {
            // Handle different timestamp formats if necessary
            timestamp = new Date(data.time.replace(/-/g, '/')); // Example for handling different format
          }
        } else {
          timestamp = new Date(); // Fallback to current date
        }

        // Add new row to table
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = rowCount + 1;
        row.insertCell(1).textContent = timestamp.toLocaleString();
        row.insertCell(2).textContent = data.value;

        // Remove oldest row if more than 50 rows
        if (rowCount >= 50) {
          tableBody.deleteRow(0);
          // Update row numbers
          Array.from(tableBody.rows).forEach((row, index) => {
            row.cells[0].textContent = index + 1;
          });
        }
      }
    });
  }

  // Call the functions to update data and history
  updateData();
  updateHistory();
