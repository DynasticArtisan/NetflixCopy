import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAvuWs8Z8Vuj5GAdxkA70ZHUF6R9TxM4P0",
    authDomain: "netflix-clone-d2d8e.firebaseapp.com",
    projectId: "netflix-clone-d2d8e",
    storageBucket: "netflix-clone-d2d8e.appspot.com",
    messagingSenderId: "544371857241",
    appId: "1:544371857241:web:cad0058d32312350109e48"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth}
export default db 