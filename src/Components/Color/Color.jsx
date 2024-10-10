import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDelete() {
    setShowConfirm(true); // show conformation message
  }

  function confirmDelete() {
    onDelete(color.id); // delete color
    setShowConfirm(false); // hide conformation message
  }

  function cancelDelete() {
    setShowConfirm(false); // hide conformation message
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      <div className="button-container">
        {!showConfirm ? (
          <button onClick={handleDelete}>Delete</button>
        ) : (
          <>
            <div className="color-card-highlight">
              <p>Are you sure, that you want to delete?</p>
            </div>
            <button onClick={cancelDelete}>Cancel</button>
            <button onClick={confirmDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
