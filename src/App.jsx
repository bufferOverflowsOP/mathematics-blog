import { useState } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import './App.scss';

const App = () => {
  const [text, setText] = useState("");
  return (
    <>
      <p className="title">Math Forum!</p>
      <p>This is a place dedicated to mathematics research and communication!</p>
      <textarea placeholder="Enter text with LaTeX" rows={6} 
      style={{ width: 420 }} value={text} 
      onChange={(event) => {
        setText(event.target.value);
      }}
      />
      <br />
      <span>
        <p className="preview">Latex previewer: </p>
        <Latex>{text ? text : "$\\text{Nothing entered.}$"}</Latex>
      </span>
    </>
  )
}

export default App;
