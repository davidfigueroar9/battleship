import React from "react";
import styles from "./Message.module.css";

const Message = ({ text }) => (
  <div className={styles.container}>
    <span className={`${styles.messageText} ${text ? styles.show : ""} `}>
      {text}
    </span>
  </div>
);

export default Message;
