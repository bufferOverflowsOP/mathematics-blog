import React from 'react';
import Latex from 'react-latex-next';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import 'katex/dist/katex.min.css';

const config = {
  tex2jax: {
  inlineMath: [ ['$$','$$'], ["\\(","\\)"] ],
  displayMath: [],
  processEscapes: true
}
};

const Box = (props) => {
  const { text, pfp, username } = props;
  if (!(text.includes("<MathJax>") && text.includes("</MathJax>"))) {
    return (<><Latex>{text}</Latex><p>Posted by: {username}</p></>) 
  } else {
    return (<><MathJaxContext version={2} config={config} dynamic><MathJax>{text.substring(text.indexOf("<MathJax>") + 9, text.lastIndexOf("</MathJax>"))}</MathJax><p>Posted by: {username}</p></MathJaxContext></>)
  }
};

export default Box;