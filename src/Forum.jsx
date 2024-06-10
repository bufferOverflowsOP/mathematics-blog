import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; 
import { getMsgs } from './firebase-functions';
import { Box } from './components';

const App = () => {
  const [subject, setSubject] = useState("main");
  const [channel, setChannel] = useState("main");
  const [msgs, setMsgs] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      getMsgs(subject, channel).then((data) => {
        setMsgs(data);
      })
    }, 15000)
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
      getMsgs(subject, channel).then((data) => {
        setMsgs(data);
      })
    }
  );
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
      { !(JSON.stringify(msgs)===JSON.stringify([])) ? (msgs.map((msg) => {
        return (<Box text={msg.text} username={msg.username} pfp={msg.pfp} />)
      }))
        : (<p>No messages</p>)
      }
    </>
  )
  }
  
  export default App;
  