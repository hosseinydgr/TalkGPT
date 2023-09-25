import styles from "./TalkingHeader.module.css";

export default function TalkingHeader({
  getAnswer,
  arr,
  setArr,
  setIsLoading,
}) {
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
    <div className={styles["btns-cont"]}>
      <button onClick={getSpeech}>Start Talking</button>
      <button onClick={endSpeech}>Done Talking</button>
    </div>
  );
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
