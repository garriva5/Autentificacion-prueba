import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    doc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBcKoDCCMIBZY8KetZ6jQNTGbtiRfNWKh4",
    authDomain: "pruebas-cf6a8.firebaseapp.com",
    projectId: "pruebas-cf6a8",
    storageBucket: "pruebas-cf6a8.appspot.com",
    messagingSenderId: "33204426779",
    appId: "1:33204426779:web:f7626f4f72efe4708b40be",
    measurementId: "G-GEGVTFQ576",
};

const providergoogle = new GoogleAuthProvider();
const providerfacebook = new FacebookAuthProvider();
const providertwitter = new TwitterAuthProvider();

const app = initializeApp(firebaseConfig); /*inicializa firebase*/
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service

const log = document.getElementById("log");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const crear = document.getElementById("crear");
const header = document.getElementById("header");
const cerrar = document.getElementById("cerrar");
const div = document.getElementById("inicio");
const divOcultar = document.getElementById("ocultar");
const gog = document.getElementById("google");
const face = document.getElementById("facebook");
const guardar = document.getElementById("Guardar");
const nombre = document.getElementById("nom");
const apellido = document.getElementById("apell");
const edad = document.getElementById("edad");
const twitter = document.getElementById("twitter");
const actualizar = document.getElementById("actualizar");

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

cerrar.addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            div.classList.remove("hide");
            divOcultar.classList.add("hide");
        })
        .catch((error) => {
            // An error happened.
            alert("Error");
            console.log(error);
        });
});

gog.addEventListener("click", function () {
    signInWithPopup(auth, providergoogle)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
});

face.addEventListener("click", function () {
    signInWithPopup(auth, providerfacebook)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential =
                FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            // ...
        });
});

twitter.addEventListener("click", function () {
    signInWithPopup(auth, providertwitter)
        .then((result) => {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const secret = credential.secret;

            // The signed-in user info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);
            // ...
        });
});
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.email);
        header.innerHTML = user.email;
        div.classList.add("hide");
        divOcultar.classList.remove("hide");

        // ...
    } else {
        console.log("no user");
        header.innerHTML = "Registrate o inicia sesion";
        // User is signed out
        // ...
    }
});

guardar.addEventListener("click", async function () {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            Nombre: nombre.value,
            Apellidos: apellido.value,
            Edad: edad.value,
        });
        alert( "Se han guardado todos tu datos .) idiota estupidos todos " + docRef.id);

    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Add a new document in collection "cities"
actualizar.addEventListener("click", async function () {
    await setDoc(doc(db, "users", "usuarios"), {
            Nombre: nombre.value,
            Apellidos: apellido.value,
            Edad: edad.value,
    });
    alert("se han actualizado los datos" + docRef.id);

});
