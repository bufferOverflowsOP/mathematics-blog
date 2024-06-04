import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; 
import { getMsgs } from './firebase-functions';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const App = () => {
  const [subject, setSubject] = useState("main");
  const [channel, setChannel] = useState("main");
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    getMsgs(subject, channel).then((data) => {
      setMsgs(data);
    })
  }, [subject, channel]);

  useEffect(() => {
    var subjectLS = localStorage.getItem("subject");
    var channelLS = localStorage.getItem("channel");
    if (subjectLS == "" || channelLS == "") {
      subjectLS = "main";
      channelLS = "main";
      localStorage.setItem("subject", "main");
      localStorage.setItem("channel", "main");
    }
    setSubject(subjectLS);
    setChannel(channelLS);
  }, []);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    localStorage.setItem("subject", e.target.value);
  }
  const handleChannelChange = (e) => {
    setChannel(e.target.value);
    localStorage.setItem("channel", e.target.value);
  }
  return (
    <>
      <Outlet />
      <p className="title">Math Forum!</p>
      <p>Subject:</p>
      <input type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange} />
      <p>Channel:</p>
      <input type="text" placeholder="Channel" value={channel} onChange={handleChannelChange} />
      <br /> <br />
      { !!msgs ? (msgs.map((msg) => {
          return (<><Latex>{msg.text}</Latex><p>Posted by: {msg.username}</p></>)})) : <p>No messages</p> }
    </>
  )
  }
  
  export default App;
  