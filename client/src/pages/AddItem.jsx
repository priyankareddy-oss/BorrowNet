import { useState } from "react";
import API from "../services/api";
import "./AddItem.css";

function AddItem() {
  const [item, setItem] = useState({
    name: "",
    description: "",
    category: "Books",
  });

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/items/add", item);
      alert("✅ Item Added Successfully!");

      setItem({
        name: "",
        description: "",
        category: "Books",
      });
    } catch (error) {
      alert("❌ Failed to Add Item");
      console.log(error);
    }
  };

  return (
    <div className="add-container">
      <form className="add-card" onSubmit={handleSubmit}>
        <h1>📦 Add New Item</h1>
        <p>Share your items with the community.</p>

        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={item.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Item Description"
          value={item.description}
          onChange={handleChange}
          required
        ></textarea>

        <select
          name="category"
          value={item.category}
          onChange={handleChange}
        >
          <option>Books</option>
          <option>Electronics</option>
          <option>Sports</option>
          <option>Clothes</option>
          <option>Furniture</option>
        </select>

        <button type="submit" className="add-btn">
          🚀 Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;