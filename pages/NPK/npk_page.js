const firebaseConfig = {
  apiKey: "AIzaSyAtb6rnS72RcoUvjQT7HcRiYmNwqYjGlwc",
  authDomain: "tugasakhirghozy.firebaseapp.com",
  databaseURL: "https://tugasakhirghozy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tugasakhirghozy",
  storageBucket: "tugasakhirghozy.appspot.com",
  messagingSenderId: "30677282791",
  appId: "1:30677282791:web:076be243f56f5acd221742",
  measurementId: "G-1PLBK3GPH0",
};

const app = firebase.initializeApp(firebaseConfig);

Setup();

function Setup() {
  let database = firebase.database();

  let data_1 = [];
  let data_2 = [];

  database.ref("data_npk_1").on("value", (snap) => {
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
        let temp = value[0].split("#")[1];

        value.shift();
        value.unshift(temp);

        if (value[0] === "" || value[1] === "" || value[2] === "" || value[3] === "" || value[4] === "" || value[5] === "") return;

        if (
          value[0].length === res.val().value.length ||
          value[1].length === res.val().value.length ||
          value[2].length === res.val().value.length ||
          value[3].length === res.val().value.length ||
          value[4].length === res.val().value.length ||
          value[5].length === res.val().value.length
        )
          return;

        if (time[0].length === res.val().time.length || time[1].length === res.val().time.length) return;

        data_1.push({
          nitrogen_1: value[0],
          phosphorus_1: value[1],
          potassium_1: value[2],
          pompa_nitrogen_1: value[3],
          pompa_phosphorus_1: value[4],
          pompa_potassium_1: value[5],
          waktu: new Date(`${time[0]} ${time[1]}`).getTime() || 0,
          jam: `${time[0]} ${time[1]}`,
        });
      });

      if (data_1.length > 0) {
        data_1.sort((a, b) => b.waktu - a.waktu);
        setData1(data_1[0]);
        // getDataTable(data);
      }
    } catch (error) {
      console.log(error);
    }
  });

  database.ref("data_npk_2").on("value", (snap) => {
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
        let temp = value[0].split("#")[1];

        value.shift();
        value.unshift(temp);

        if (value[0] === "" || value[1] === "" || value[2] === "" || value[3] === "" || value[4] === "" || value[5] === "") return;

        if (
          value[0].length === res.val().value.length ||
          value[1].length === res.val().value.length ||
          value[2].length === res.val().value.length ||
          value[3].length === res.val().value.length ||
          value[4].length === res.val().value.length ||
          value[5].length === res.val().value.length
        )
          return;

        if (time[0].length === res.val().time.length || time[1].length === res.val().time.length) return;

        data_2.push({
          nitrogen_2: value[0],
          phosphorus_2: value[2],
          potassium_2: value[2],
          pompa_nitrogen_2: value[3],
          pompa_phosphorus_2: value[4],
          pompa_potassium_2: value[5],
          waktu: new Date(`${time[0]} ${time[1]}`).getTime() || 0,
          jam: `${time[0]} ${time[1]}`,
        });
      });

      if (data_2.length > 0) {
        data_2.sort((a, b) => b.waktu - a.waktu);
        setData2(data_2[0]);
        getDataTable(data_1, data_2);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

function setData1(data) {
  document.querySelector(".value.nitrogen_1").innerHTML = parseFloat(data.nitrogen_1).toFixed(1);
  document.querySelector(".value.phosphorus_1").innerHTML = parseFloat(data.phosphorus_1).toFixed(1);
  document.querySelector(".value.potassium_1").innerHTML = parseFloat(data.potassium_1).toFixed(1);
  document.querySelector(".value.pompa_nitrogen_1").innerHTML = parseFloat(data.pompa_nitrogen_1).toFixed(1);
  document.querySelector(".value.pompa_phosphorus_1").innerHTML = parseFloat(data.pompa_phosphorus_1).toFixed(1);
  document.querySelector(".value.pompa_potassium_1").innerHTML = parseFloat(data.pompa_potassium_1).toFixed(1);
}

function setData2(data) {
  document.querySelector(".value.nitrogen_2").innerHTML = parseFloat(data.nitrogen_2).toFixed(1);
  document.querySelector(".value.phosphorus_2").innerHTML = parseFloat(data.phosphorus_2).toFixed(1);
  document.querySelector(".value.potassium_2").innerHTML = parseFloat(data.potassium_2).toFixed(1);
  document.querySelector(".value.pompa_nitrogen_2").innerHTML = parseFloat(data.pompa_nitrogen_2).toFixed(1);
  document.querySelector(".value.pompa_phosphorus_2").innerHTML = parseFloat(data.pompa_phosphorus_2).toFixed(1);
  document.querySelector(".value.pompa_potassium_2").innerHTML = parseFloat(data.pompa_potassium_2).toFixed(1);
}

function getDataTable(data_1, data_2) {
  let table = [];
  let table2 = [];

  data_1.map((res, i) => {
    table += updateUI(res, i);
  });

  data_2.map((res, i) => {
    table2 += updateUI2(res, i);
  });

  document.querySelector(".table-row").innerHTML = table;
  document.querySelector(".table-row2").innerHTML = table2;
}

function updateUI(res, i) {
  return `<tr>
            <td>${i + 1}</td>
            <td>${parseFloat(res.nitrogen_1).toFixed(1)}</td>
            <td>${parseFloat(res.phosphorus_1).toFixed(1)}</td>
            <td>${parseFloat(res.potassium_1).toFixed(1)}</td>
            <td>${parseFloat(res.pompa_nitrogen_1).toFixed(1)}</td>
            <td>${parseFloat(res.pompa_phosphorus_1).toFixed(1)}</td>
            <td>${parseFloat(res.pompa_potassium_1).toFixed(1)}</td>
            <td>${res.jam}</td>
        </tr>`;
}

function updateUI2(res, i) {
  return `<tr>
            <td>${i + 1}</td>
            <td>${parseFloat(res.nitrogen_2).toFixed(1)}</td>
            <td>${parseFloat(res.phosphorus_2).toFixed(1)}</td>
            <td>${parseFloat(res.potassium_2).toFixed(1)}</td>
            <td>${parseFloat(res.pompa_nitrogen_2).toFixed(1)}</td>
            <td>${parseFloat(res.pompa_phosphorus_2).toFixed(1)}</td>
            <td>${parseFloat(res.pompa_potassium_2).toFixed(1)}</td>
            <td>${res.jam}</td>
        </tr>`;
}