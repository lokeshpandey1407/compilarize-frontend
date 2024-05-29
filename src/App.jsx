import { useReducer, useState } from "react";
import styles from "./App.module.css";
import CodeEditor from "./Components/CodeEditor/CodeEditor";
import Navbar from "./Components/Navbar/Navbar";
import Output from "./Components/Output/Output";

function codeReducer(state, payload) {
  switch (payload.type) {
    case "SET_STATE":
      return payload.data;
  }
}

function App() {
  const [code, dispatch] = useReducer(
    codeReducer,
    `//Write your code here \n console.log("Compilerize, your online javascript solutions"); `
  );
  const [output, setOutput] = useState("Output will be displayed here");

  return (
    <div className={styles.main}>
      <Navbar />
      <section className={styles.workingSection}>
        <CodeEditor code={code} dispatch={dispatch} setOutput={setOutput} />
        <Output output={output} setOutput={setOutput} />
      </section>
    </div>
  );
}

export default App;
