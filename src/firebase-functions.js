import db from './firebase-config';
import { Message, messageConverter } from './firebase-converter';
import { doc, getDocs, getDoc, setDoc, updateDoc, collection, query } from "firebase/firestore";

const sendMsg = async (text, subject, channel) => {
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

const getMsgs = async (subject, channel) => {
  const querySnapshot = await getDocs(collection(db, "messages", subject, channel));
  const msgs = [];
  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      msgs.push(doc.data());
    } else {
      return [];
    }
  });
  msgs.sort((a, b) => (b.id - a.id))
  return msgs;
}

export { sendMsg, getMsgs };