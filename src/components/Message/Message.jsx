import React from "react";
import PropTypes from "prop-types";
import styles from "./Message.module.css";

const Message = ({ text }) => (
  <div className={styles.container}>
    <span className={`${styles.messageText} ${text ? styles.show : ""} `}>
      {text}
    </span>
  </div>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
