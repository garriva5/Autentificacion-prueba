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
    setDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
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

/*inicializa firebase*/
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service

//reguistro -------------
const log = document.getElementById("log");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
//reguistro con apps
const gog = document.getElementById("google");
const face = document.getElementById("facebook");
const twitter = document.getElementById("twitter");
//CRUD------------
//creat---------
const nombre = document.getElementById("nom");
const apellido = document.getElementById("apell");
const edad = document.getElementById("edad");
const crear = document.getElementById("crear");
const guardar = document.getElementById("Guardar");
const cerrar = document.getElementById("cerrar");
//mostrar o leer 
const leer = document.getElementById("leer");
const tabla = document.getElementById("tabla");
const inputId =  document.getElementById("id");
//update--------
const actualizar = document.getElementById("actualizar");
const buscarAct = document.getElementById("BuscarAct");
const inputActid = document.getElementById("id-ac");
const inputActname = document.getElementById("nombre-ac");
const inputActlast = document.getElementById("apellido-ac");
const inputActedad = document.getElementById("edad-ac");
//delete borrar--------
const borrar = document.getElementById("borrar");

//divs nesesarios 
const header = document.getElementById("header");
const div = document.getElementById("inicio");
const divOcultar = document.getElementById("ocultar");



// const actualizar = document.getElementById("actualizar");
// const borrar = document.getElementById("borrar");

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

guardar.addEventListener("click", async () => {
    try {
        await setDoc(doc(db, "users", nombre.value), {
            Nombre: nombre.value,
            Apellidos: apellido.value,
            Edad: edad.value,
        });
        alert(`Documento ${nombre.value} creado!`);
    } catch (error) {
        alert("No has completado todos los datos correspondientes");    
        console.error("Error adding document: ", e);
    }
});


leer.addEventListener("click", async () => {
    tabla.innerHTML =
        `<tr>
        <td> |---Id---| </td>
        <td> |---Nombre---| </td>
        <td> |---Apellido---| </td>
        <td> |---Edad---|   </td>
    </tr>`;
    

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {

        console.log(doc.id, " => ", doc.data());
        tabla.innerHTML +=
            `<tr>
            <td>${doc.id}</td>
            <td>${doc.data().Nombre}</td>
            <td>${doc.data().Apellidos}</td>
            <td>${doc.data().Edad}</td>
        </tr>`;
    });
});

BuscarAct.addEventListener("click", async () => {
    const docRef = doc(db, "users", inputActid.value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        inputActname.value = docSnap.data().Nombre;
        inputActlast.value = docSnap.data().Apellidos;
        inputActedad.value = docSnap.data().Edad;
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
});

actualizar.addEventListener("click", async() => {
    const elementRef = doc(db, "users", inputActid.value);

    await updateDoc(elementRef, {
            Nombre: inputActname.value,
            Apellidos: inputActlast.value,
            Edad: inputActedad.value,
    });
});

borrar.addEventListener("click", async()=>{
    await deleteDoc(doc(db, "users", inputActid.value));
});

