import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBcKoDCCMIBZY8KetZ6jQNTGbtiRfNWKh4",
    authDomain: "pruebas-cf6a8.firebaseapp.com",
    projectId: "pruebas-cf6a8",
    storageBucket: "pruebas-cf6a8.appspot.com",
    messagingSenderId: "33204426779",
    appId: "1:33204426779:web:f7626f4f72efe4708b40be",
    measurementId: "G-GEGVTFQ576",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const log = document.getElementById("log");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const crear = document.getElementById("crear");
const header = document.getElementById("header");
const cerrar = document.getElementById("cerrar");
const div = document.getElementById('inicio');
const divOcultar = document.getElementById('ocultar');

//crear un usuario nuevo

crear.addEventListener("click", function () {
    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("Tu cuenta ha sido creada correctamente");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + " + " + errorMessage);
            // ..
        });
});

//loguearse como usuario ya existente
log.addEventListener("click", function () {
    signInWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("inicio de sesion correcta ");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + " + " + errorMessage);
        });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.email);
        header.innerHTML = user.email;
        div.classList.add('hide')
        divOcultar.classList.remove('hide')
        

        // ...
    } else {
        console.log("no user");
        header.innerHTML = "Registrate o inicia sesion";
        // User is signed out
        // ...
    }
});

cerrar.addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            div.classList.remove('hide')
            divOcultar.classList.add('hide')
        })
        .catch((error) => {
            // An error happened.
            alert("Error");
            console.log(error);
        });
});
