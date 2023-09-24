import { useState } from "react";
import "./App.css";

export default function App() {
  const [arr, setArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAnswer = async (txt) => {
    // msg.text = text;
    // window.speechSynthesis.speak(msg);
    try {
      let res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: txt,
        }),
      });

      const data = await res.json();
      console.log(data.message);
      setIsLoading(false);
      setArr((prev) => [...prev, data.message]);
      msg.text = data.message;
      window.speechSynthesis.speak(msg);
    } catch (e) {
      console.log("inner error", e);
    }
  };

  const getSpeech = () => {
    console.log("clicked microphone");
    recognition.onstart = () => {
      console.log("starting listening, speak in microphone");
    };
    // recognition.onspeechend = () => {
    //   console.log("stopped listening");
    //   setTimeout(() => {
    //     recognition.stop();
    //   }, 5000);
    // };
    recognition.onresult = (result) => {
      console.log(result.results[0][0].transcript);
      setArr([...arr, result.results[0][0].transcript]);
      getAnswer(result.results[0][0].transcript);
    };

    recognition.start();
  };

  function endSpeech() {
    setIsLoading(true);
    recognition.stop();
  }

  return (
    <div className="main-cont">
      <div className="btns-cont">
        <button onClick={getSpeech}>Start Talking</button>
        <button onClick={endSpeech}>Done Talking</button>
      </div>
      <hr />
      {arr.map((txt, i) => (
        <p key={i} className={i % 2 === 0 ? "question" : "answer"}>
          {txt}
        </p>
      ))}
      {isLoading && <div className="loading"></div>}
    </div>
  );
}

const msg = new SpeechSynthesisUtterance();
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
