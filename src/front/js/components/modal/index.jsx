import React from "react";
import styles from "./modal.module.css";

const Modal = ({ isOpen, close, title, children }) => {
  return (
    <div>
      {isOpen ? (
        <div onClick={close} className={styles._overlay}>
          <div className={styles._center}>
            <article
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`${styles._modalContainer} _boxShadow`}
            >
              <div className={styles._header}>
                <h1>{title}</h1>
                <button onClick={close}>X</button>
              </div>
              <div className={styles._childrenContainer}>{children}</div>
            </article>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
