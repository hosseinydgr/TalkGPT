import { useState } from "react";
import styles from "./App.module.css";
import TalkingHeader from "./components/TalkingHeader";
import ChatHeader from "./components/ChatHeader";

export default function App() {
  const [arr, setArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("talk");

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

  function changeModeHandler() {
    if (mode === "talk") setMode("chat");
    else setMode("talk");
  }

  return (
    <div className={styles["main-cont"]}>
      <button className={styles["change-mode-btn"]} onClick={changeModeHandler}>
        {mode === "talk" ? "Chat" : "Talk"}
      </button>
      {mode === "talk" ? (
        <TalkingHeader
          getAnswer={getAnswer}
          arr={arr}
          setArr={setArr}
          setIsLoading={setIsLoading}
        />
      ) : (
        <ChatHeader
          getAnswer={getAnswer}
          arr={arr}
          setArr={setArr}
          setIsLoading={setIsLoading}
        />
      )}
      <hr />
      {arr.map((txt, i) => (
        <p key={i} className={i % 2 === 0 ? styles.question : styles.answer}>
          {txt}
        </p>
      ))}
      {isLoading && <div className={styles.loading}></div>}
    </div>
  );
}

const msg = new SpeechSynthesisUtterance();
