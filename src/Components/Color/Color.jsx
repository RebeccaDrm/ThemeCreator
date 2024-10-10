import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";  // Import ColorForm

export default function Color({ color, onDelete, onEdit}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode

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

  // Handle canceling the edit
  function cancelEdit() {
    setIsEditing(false);
  }

    // Handle submitting the edited color
    function handleSubmitEdit(updatedColor) {
      onEdit(color.id, updatedColor); // Call the edit function passed from the parent
      setIsEditing(false); // Exit edit mode after submission
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
        <ColorForm 
        onSubmitColor={handleSubmitEdit} 
        initialData={color} 
        />
      ) : (
        <>

      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

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
 {isEditing && <button onClick={cancelEdit}>Cancel Edit</button>} {/* Cancel edit button */}
 </div>
   );
  }