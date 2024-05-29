import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CodeEditor.module.css";
import { Editor } from "@monaco-editor/react";
import Loader from "../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";

const CodeEditor = ({ code, dispatch, setOutput }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState({
    name: "javascript",
    value: "nodejs",
  });

  const handleRunCode = async () => {
    const data = { code: code, language: language.value };
    if (!code || code == null || code === "") {
      toast.error("Code cannot be empty");
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://compiler-backend-ashen.vercel.app/api/compile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const response = await res.json();
      setOutput(response?.output);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.section}>
      <header className={styles.head}>
        <div className={styles.fileNameSection}>
          <p>main.js</p>
        </div>
        <div className={styles.actionsSection}>
          {/* <button className={`${styles.btn} ${styles.themeBtn}`}>
            dark/light
          </button> */}
          <button
            className={`${styles.btn} ${styles.clearBtn}`}
            onClick={() => {
              dispatch({ type: "SET_STATE", data: "" });
            }}
          >
            Clear
          </button>
          <button
            onClick={handleRunCode}
            className={`${styles.btn} ${styles.runBtn}`}
          >
            {isLoading ? <Loader /> : "Run"}
          </button>
        </div>
      </header>
      <div className={styles.editorContainer}>
        <Editor
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            wordWrap: "on",
          }}
          height="100%"
          width="100%"
          theme={theme}
          defaultLanguage={language.name}
          value={code}
          onChange={(value) => {
            dispatch({ type: "SET_STATE", data: value });
          }}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CodeEditor;
