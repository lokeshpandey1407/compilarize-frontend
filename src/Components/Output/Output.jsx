import styles from "./Output.module.css";
const Output = ({ output, setOutput }) => {
  return (
    <div className={styles.section}>
      <header className={styles.head}>
        <p>Output</p>
        <div className={styles.actionsSection}>
          <button
            className={`${styles.btn} ${styles.clearBtn}`}
            onClick={() => {
              setOutput("");
            }}
          >
            Clear
          </button>
        </div>
      </header>
      <pre className={styles.outputContainer}>{output}</pre>
    </div>
  );
};

export default Output;
