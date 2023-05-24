import { initializeApp } from "firebase/app";
import {
    getAuth,
    // signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile
} from "firebase/auth";
import {
    getFirestore,
    // query,
    // getDocs,
    collection,
    // where,
    addDoc,
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA5cZe9rVCliNK5OKN1n9wW_fOK3SZyMzM",
    authDomain: "authentication-project-65378.firebaseapp.com",
    projectId: "authentication-project-65378",
    storageBucket: "authentication-project-65378.appspot.com",
    messagingSenderId: "604551753123",
    appId: "1:604551753123:web:90ca745dfec74d41fbfe16",
    measurementId: "G-2Z8N0L0RGK"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            authProvider: "local",
            email,
        });
        await updateProfile(user, { displayName: name })
        console.log(user);
        return user
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};