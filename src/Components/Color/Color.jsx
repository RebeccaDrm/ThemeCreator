import "./Color.css";
import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm"; // Import ColorForm
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

export default function Color({ color, onDelete, onEdit }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [a11yScore, setA11yScore] = useState(null); // State to store contrast score
  const [a11yBgColor, setA11yBgColor] = useState(null); // State to store contrast score

  function handleDelete() {
    setShowConfirm(true); // show conformation message
  }

  function confirmDelete() {
    onDelete(color.id); // delete color
    setShowConfirm(false); // hide conformation message
  }

  // hide conformation message
  function cancelDelete() {
    setShowConfirm(false);
  }

  // Handle entering edit mode
  function handleEdit() {
    setIsEditing(true);
  }

  // Trigger API call when the component mounts or color/contrastText changes
  useEffect(() => {
    postFetch(color.hex, color.contrastText);
  }, [color.hex, color.contrastText]); // Dependency array to trigger on color change

  // Handle canceling the edit
  function cancelEdit() {
    setIsEditing(false);
  }

  // Handle submitting the edited color
  function handleSubmitEdit(updatedColor) {
    onEdit(color.id, updatedColor); // Call the edit function passed from the parent
    setIsEditing(false); // Exit edit mode after submission
  }

  async function postFetch(hex, contrastText) {
    const response = await fetch(
      "https://www.aremycolorsaccessible.com/api/are-they",
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ colors: [hex, contrastText] }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    setA11yScore(responseData.overall);
    if (responseData.overall === "Yup") {
      setA11yBgColor("green");
    } else if (responseData.overall === "Kinda") {
      setA11yBgColor("orange");
    } else {
      setA11yBgColor("red");
    }
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {isEditing ? (
        // Show ColorForm when in edit mode
        <ColorForm onSubmitColor={handleSubmitEdit} initialData={color} />
      ) : (
        <>
          <div className="color-header">
            <h3 className="color-card-headline">{color.hex}</h3>
            <CopyToClipboard hex={color.hex} />
          </div>
          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>
          <p
            className="a11y-score"
            style={{
              background: a11yBgColor,
              display: "inline",
            }}
          >
            Accessibility: {a11yScore}
          </p>

          <div className="button-container">
            {!showConfirm ? (
              <>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
              </>
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
        </>
      )}
      {isEditing && <button onClick={cancelEdit}>Cancel Edit</button>}{" "}
      {/* Cancel edit button */}
    </div>
  );
}
