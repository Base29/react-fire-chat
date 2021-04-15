import React, { useRef, useState } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyC48gOY8jK7rQaadGZAf57yGShPDZFSIl8',
        authDomain: 'react-fire-chat-65688.firebaseapp.com',
        projectId: 'react-fire-chat-65688',
        storageBucket: 'react-fire-chat-65688.appspot.com',
        messagingSenderId: '3955691014',
        appId: '1:3955691014:web:f3fdba89ab329dde6fbd87',
    });
} else {
    firebase.app(); // if already initialized, use that one
}

// firebase.initializeApp({
//     apiKey: 'AIzaSyC48gOY8jK7rQaadGZAf57yGShPDZFSIl8',
//     authDomain: 'react-fire-chat-65688.firebaseapp.com',
//     projectId: 'react-fire-chat-65688',
//     storageBucket: 'react-fire-chat-65688.appspot.com',
//     messagingSenderId: '3955691014',
//     appId: '1:3955691014:web:f3fdba89ab329dde6fbd87',
// });

const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
    const [user] = useAuthState(auth);
    return (
        <div className='App'>
            <header className='App-header'>
                <h1>⚛️🔥💬</h1>
                <SignOut />
            </header>
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

function SignOut() {
    return auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function ChatRoom() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        });
        setFormValue('');
    };

    return (
        <div>
            <main>{messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}</main>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button type='submit'>🕊️</button>
            </form>
        </div>
    );
}

function ChatMessage(props) {
    console.log('CHAT MSG', props);
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} />
            <p>{text}</p>
        </div>
    );
}

export default App;
