import { useState } from "react";
import styles from "./ChatHeader.module.css";

export default function ChatHeader({ getAnswer, arr, setArr, setIsLoading }) {
  const [text, setText] = useState("");

  function textChangeHandler(e) {
    setText(e.target.value);
    // e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  function sendChatHandler() {
    setIsLoading(true);
    setArr([...arr, text]);
    getAnswer(text);
    setText("");
  }
  return (
    <div className={styles["chat-input-cont"]}>
      <textarea
        className={styles["chat-input"]}
        value={text}
        onChange={textChangeHandler}
        placeholder="Send a message"
      />
      <button className={styles["chat-send-btn"]} onClick={sendChatHandler}>
        Send
      </button>
    </div>
  );
}
