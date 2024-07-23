const firebaseConfig = {
  apiKey: "AIzaSyA0_BIDSxyU9fDrBgnu8BUlVfW7lB0CqxQ",
  authDomain: "greenhouseta-f9c10.firebaseapp.com",
  databaseURL: "https://greenhouseta-f9c10-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "greenhouseta-f9c10",
  storageBucket: "greenhouseta-f9c10.appspot.com",
  messagingSenderId: "936718900190",
  appId: "1:936718900190:web:e5dae00133bcc2aea01b4f",
  measurementId: "G-H3V3FM6RWL",
};
const app = firebase.initializeApp(firebaseConfig);

Setup();

function Setup() {
  let data = [];
  let database = firebase.database();

  database.ref("data_intensitas_cahaya").on("value", (snap) => {
    try {
      snap.forEach(function (res) {
        if (res.val().value == "" || res.val().time == "" || res.val().value == null || res.val().time == null) return;

        let cek = "1234567890./-:#";

        for (let i = 0; i < res.val().value.length; i++) {
          if (!cek.includes(res.val().value[i])) return;
        }
        
        for (let i = 0; i < res.val().time.length; i++) {
          if (!cek.includes(res.val().time[i])) return;
        }

        let value = res.val().value.split("/") || 0;
        let time = res.val().time.split("#") || 0;

        if (value[0] === "" || value[1] === "") return;

        if (value[0].length === res.val().value.length || value[1].length === res.val().value.length) return;

        if (time[0].length === res.val().time.length || time[1].length === res.val().time.length) return;

        if (value[0].length > 6 || value[1].length > 6) return;

        data.push({
          sensor_ldr: value[0],
          intensitas_lampu: value[1],
          waktu: new Date(`${time[0]} ${time[1]}`).getTime() || 0,
          jam: `${time[0]} ${time[1]}`,
        });
      });


      if (data.length > 0) {
        data.sort((a, b) => b.waktu - a.waktu);
        setData(data[0]);
        getDataTable(data);
      }
    } catch (e) {
      console.log(e);
    }
  });
}

function setData(data) {
  document.querySelector(".value.sensor_ldr").innerHTML = parseFloat(data.sensor_ldr).toFixed(1);
  document.querySelector(".value.fuzzy").innerHTML = parseFloat(data.intensitas_lampu).toFixed(1);
  // document.querySelector(".value.lampu").innerHTML = data.intensitas_lampu == 0 ? "Off" : "On";
  document.querySelector(".value.lampu").innerHTML = data.intensitas_lampu <= 10 ? "Mati" : data.intensitas_lampu <= 50 ? "Redup" : data.intensitas_lampu <= 75 ? "Agak Terang" : "Terang";
  document.querySelector(".value.cahaya").innerHTML = data.sensor_ldr <= 30 ? "Gelap" : data.sensor_ldr <= 100 ? "Redup" : data.sensor_ldr <= 200 ? "Agak Terang" : "Terang";
}

const getDataTable = (data) => {
  let table = [];
  data.map((res, i) => {
    table += updateUI(res, i);
  });
  document.querySelector(".table-row").innerHTML = table;
};

const updateUI = (res, i) => {
  return `<tr>
            <td>${i + 1}</td>
            <td>${parseFloat(res.sensor_ldr).toFixed(1)}</td>
            <td>${parseFloat(res.intensitas_lampu).toFixed(1)}</td>
            <td>${res.jam}</td>  
        </tr>`;
};