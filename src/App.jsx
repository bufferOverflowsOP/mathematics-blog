import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { doc, getDocs, getDoc, setDoc, updateDoc, collection } from "firebase/firestore"; 
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import './App.scss';
import db from './firebase-config';
import { Message, messageConverter } from './firebase-converter';

const App = () => {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("main");
  const [channel, setChannel] = useState("main");

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendMsg = async () => {
      let id = 0;
      const docRef = collection(db, "messages", subject, channel);
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          if (doc.data().id > id) { id = doc.data().id; }
        })
        id += 1;
      }
      await setDoc(doc(docRef).withConverter(messageConverter), new Message("ichang3765", null, text, id));
    }
    sendMsg().then(() => { setText("Submitted!") });
  }

  return (
    <>
      <Outlet />
      <p className="title">Math Forum!</p>
      <p>This is a place dedicated to mathematics research and communication!</p>
      <textarea placeholder="Enter text with LaTeX" rows={6} style={{ width: 420 }} 
      value={text} onChange={(event) => { setText(event.target.value) }} />
      <br />
      <form onSubmit={handleSubmit}>
      <span>
        <p className="preview">Latex previewer: </p>
        <Latex>{text ? text : "Nothing entered."}</Latex>
        <br />
        <button type="submit">Submit</button>
      </span>
      </form>
    </>
  )
}

export default App;
