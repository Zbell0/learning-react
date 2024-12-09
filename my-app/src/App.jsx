import { useState } from "react";
import Button from "./Button";
import styles from "./App.module.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className={styles.title}>Welcome</h1>
      <Button text={"Continue"} />
    </div>
  );
}

export default App;
