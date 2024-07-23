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
  let data = {
    sensor_ldr: 0,
    intensitas_lampu: 0,
  };
  let database = firebase.database();

  database.ref("data_intensitas_cahaya").on("value", (snap) => {

    try {
      let cek = "1234567890./";
      for (let i = 0; i < snap.val().length; i++) {
        if (!cek.includes(snap.val()[i])) return;
      }

      if (snap.val() === "" || !snap.val().includes("/") || !snap.val().includes(".")) return;
      if (snap.val().split("/")[0].length >= 6 || snap.val().split("/")[1].length >= 7) return;


      data.sensor_ldr = snap.val().split("/")[0];
      data.intensitas_lampu = snap.val().split("/")[1];
      setData(data);
    } catch (e) {
      console.log(e);
    }
  });
}

function setData(data) {
  document.querySelector(".value.sensor_ldr").innerHTML = parseFloat(data.sensor_ldr).toFixed(1);
  document.querySelector(".value.fuzzy").innerHTML = parseFloat(data.intensitas_lampu).toFixed(1);
  document.querySelector(".value.lampu").innerHTML = data.intensitas_lampu >= 0 ? "Off" : "On";
  document.querySelector(".value.cahaya").innerHTML = data.intensitas_lampu <= 30 ? "Gelap" : data.intensitas_lampu <= 60 ? "Redup" : "Terang";
}