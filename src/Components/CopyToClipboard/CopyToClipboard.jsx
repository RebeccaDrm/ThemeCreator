import { useState, useEffect } from "react";
import "./CopyToClipboard.css"; // Optional for styling

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false); // State to manage the copied status

  // Function to copy the hex code to clipboard
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hex); // Copy the hex code to clipboard
      setIsCopied(true); // Show confirmation message
    } catch (error) {
      console.error("Failed to copy: ", error); // Handle the error case
    }
  }

  // useEffect to hide the confirmation message after 3 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer); // Cleanup the timeout when component unmounts
    }
  }, [isCopied]); // Run the effect only when isCopied changes

  return (
    <div className="copy-container">
      <button className="copy-button" onClick={handleCopy}>
        Copy
      </button>
      {isCopied && <span className="copy-confirmation">Copied!</span>}
    </div>
  );
}