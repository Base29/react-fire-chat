import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyC48gOY8jK7rQaadGZAf57yGShPDZFSIl8',
    authDomain: 'react-fire-chat-65688.firebaseapp.com',
    projectId: 'react-fire-chat-65688',
    storageBucket: 'react-fire-chat-65688.appspot.com',
    messagingSenderId: '3955691014',
    appId: '1:3955691014:web:f3fdba89ab329dde6fbd87',
});

const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
    const [user] = useAuthState();
    return (
        <div className='App'>
            <header className='App-header'></header>
            <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };
    return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

export default App;
