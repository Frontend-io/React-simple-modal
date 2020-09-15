import React, { useState } from "react";
import "./styles.css";
import Modal from "./modal";
import Login from "./login";

export default function App() {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false);

  const handleEvent = () => {
    setModal(!modal);
  };
  const handleType = () => {
    setType(!type);
  };

  return (
    <div className="App">
      <h3>Simple React modal</h3>
      <label>
        Mode:
        <input
          type="checkbox"
          onChange={handleType}
          name="type"
          checked={type}
        />
        <span>{type ? "Fullscreen" : "Compact"}</span>
      </label>
      <br />
      <button
        style={{
          padding: "10px 20px",
          background: "teal",
          border: "none",
          marginTop: 20,
          borderRadius: 3,
          color: "white",
          cursor: "pointer"
        }}
        onClick={handleEvent}
      >
        Open modal
      </button>

      {modal && (
        <Modal
          resetModalState={handleEvent}
          isOpen={modal}
          fullScreen={type}
          title="Login"
        >
          <Login type={type} />
        </Modal>
      )}
    </div>
  );
}
