
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyAAuUffuIh_Eq73-65_Aaazr3VIqV5Ef9o",
  authDomain: "react-clone-2d391.firebaseapp.com",
  projectId: "react-clone-2d391",
  storageBucket: "react-clone-2d391.appspot.com",
  messagingSenderId: "134895245543",
  appId: "1:134895245543:web:30d27938963f20633eaa42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);


export {auth,db};