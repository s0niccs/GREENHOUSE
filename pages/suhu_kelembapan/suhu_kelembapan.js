const firebaseConfig = {
  apiKey: "AIzaSyAwkxUgWOAowsEQXy-RZ-9WGKAoUKUPW_g",
  authDomain: "suhudankelembapan-57397.firebaseapp.com",
  databaseURL: "https://suhudankelembapan-57397-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "suhudankelembapan-57397",
  storageBucket: "suhudankelembapan-57397.appspot.com",
  messagingSenderId: "866752461556",
  appId: "1:866752461556:web:560390a4256771eecafca1",
  measurementId: "G-Q1GXT7Z7GW",
};

const app = firebase.initializeApp(firebaseConfig);

Setup();

function Setup() {
  let database = firebase.database();

  let data = [];

  database.ref("data_sensor").on("value", (snap) => {
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

        if (time[0].split("-")[0].length === value[0].length || value[1].split("-")[0].length === value[0].length) return;

        if (value[0].split("-")[1].length > 5 || value[1].split("-")[1].length > 5 || value[0].split("-")[0].length > 5 || value[1].split("-")[0].length > 5) return;

        console.log(res.val().value);

        data.push({
          suhu_1: value[0].split("-")[1] || 0,
          suhu_2: value[1].split("-")[1] || 0,
          kelembapan_1: value[0].split("-")[0] || 0,
          kelembapan_2: value[1].split("-")[0] || 0,
          durasi_pompa: value[2] || "N",
          waktu: new Date(`${time[0]} ${time[1]}`).getTime() || 0,
          jam: `${time[0]} ${time[1]}`,
        });
      });

      if (data.length > 0) {
        data.sort((a, b) => b.waktu - a.waktu);
        setData(data[0]);
        getDataTable(data);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

function setData(data) {
  document.querySelector(".value.suhu_1").innerHTML = parseFloat(data.suhu_1).toFixed(1);
  document.querySelector(".value.suhu_2").innerHTML = parseFloat(data.suhu_2).toFixed(1);
  document.querySelector(".value.kelembapan_1").innerHTML = parseFloat(data.kelembapan_1).toFixed(1);
  document.querySelector(".value.kelembapan_2").innerHTML = parseFloat(data.kelembapan_2).toFixed(1);
  document.querySelector(".value.fuzzy").innerHTML = typeof data.durasi_pompa === "string" ? data.durasi_pompa : parseFloat(data.durasi_pompa).toFixed(1);
}

const getDataTable = (data) => {
  let table = [];
  data.forEach((res, i) => {
    table += updateUI(res, i);
  });
  document.querySelector(".table-row").innerHTML = table;
};

const updateUI = (res, i) => {
  return `<tr>
            <td>${i + 1}</td>
            <td>${res.suhu_1}</td>
            <td>${res.suhu_2}</td>
            <td>${res.kelembapan_1}</td>
            <td>${res.kelembapan_2}</td>
            <td>${res.durasi_pompa}</td>  
            <td>${res.jam}</td>  
        </tr>`;
}
