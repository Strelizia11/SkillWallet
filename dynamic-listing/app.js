import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, text: "Learn React Hooks" },
  { id: 2, text: "Understand useState" },
  { id: 3, text: "Practice dynamic rendering" },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  // Step 4.1: Add item to list
  const handleAddItem = () => {
    const trimmed = inputValue.trim();

    // Step 5.2: Validate user input
    if (!trimmed) {
      setError("Item cannot be empty.");
      return;
    }

    const isDuplicate = items.some(
      (item) => item.text.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      setError("Item already exists in the list.");
      return;
    }

    const newItem = {
      id: Date.now(),
      text: trimmed,
    };

    setItems([...items, newItem]);
    setInputValue("");
    setError("");
  };

  // Step 4.2: Remove item from list
  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddItem();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Dynamic List Manager</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          className="list-input"
          placeholder="Add a new item..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={handleAddItem}>
          Add
        </button>
      </div>

      {/* Validation Error */}
      {error && <p className="error-message">{error}</p>}

      {/* Step 5.1: Handle empty list scenario */}
      {items.length === 0 ? (
        <div className="empty-state">
          <p>No items in the list. Add one above!</p>
        </div>
      ) : (
        // Step 3.1 & 3.2: Render list dynamically with map() and unique key prop
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="list-item">
              <span className="item-text">{item.text}</span>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="item-count">
        {items.length} item{items.length !== 1 ? "s" : ""} in list
      </p>
    </div>
  );
}

export default App;