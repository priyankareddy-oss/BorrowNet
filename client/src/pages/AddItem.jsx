import { useState } from "react";
import API from "../services/api";

function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/items/add", {
        name,
        description,
        category,
        owner: "6a43cadeffe503844c249181",
      });

      alert("Item Added Successfully");

      setName("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to Add Item");
    }
  };

  return (
    <div>
      <h1>Add Item</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;