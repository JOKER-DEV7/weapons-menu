import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzX6lylwfuk7lja5GWglwJBuGj3BR2tis",
    authDomain: "joker-53ef6.firebaseapp.com",
    databaseURL: "https://joker-53ef6-default-rtdb.firebaseio.com",
    projectId: "joker-53ef6",
    storageBucket: "joker-53ef6.firebasestorage.app",
    messagingSenderId: "119013833963",
    appId: "1:119013833963:web:295f11cc64f475d59152ae"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.triggerSpawn = function(weaponName) {
    // نكتب اسم السلاح في قاعدة البيانات تحت مسار 'commands'
    set(ref(db, 'commands/spawnWeapon'), {
        name: weaponName,
        timestamp: Date.now()
    });
};