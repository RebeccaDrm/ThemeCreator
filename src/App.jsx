import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]); // add unique ID + new color
  }

  function handleDeleteColor(id) {
    setColors(colors.filter((color) => color.id !== id)); // delete the color
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} />

      {colors.map((color) => (
        <Color key={color.id} color={color} onDelete={handleDeleteColor}/>
      ))}
    </>
  );
}

export default App;

/*
return (
  <>
    <h1>Theme Creator</h1>
    {initialColors.map((color) => {
      return <Color key={color.id} color={color} />;
    })}
  </>
);
}
*/
