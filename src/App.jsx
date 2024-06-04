import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; 
import { sendMsg } from './firebase-functions';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import './App.scss';

const App = () => {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("main");
  const [channel, setChannel] = useState("main");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMsg(text, subject, channel).then(() => { setText("Submitted!") });
  }
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  }
  const handleChannelChange = (event) => {
    setChannel(event.target.value);
  }

  return (
    <>
      <Outlet />
      <p className="title">Math Forum!</p>
      <p>Subject:</p>
      <input type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange} />
      <p>Channel:</p>
      <input type="text" placeholder="Channel" value={channel} onChange={handleChannelChange} />
      <form onSubmit={handleSubmit}>
      <p>This is a place dedicated to mathematics research and communication!</p>
      <textarea placeholder="Enter text with LaTeX" rows={6} style={{ width: 420 }} 
      value={text} onChange={(event) => { setText(event.target.value) }} />
      <br />
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
