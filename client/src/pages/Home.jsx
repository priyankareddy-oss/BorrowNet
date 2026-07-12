import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const borrowItem = async (id) => {
    try {
      await API.put(`/items/borrow/${id}`);
      alert("Item Borrowed Successfully!");
      fetchItems();
    } catch (error) {
      alert("Failed to Borrow Item");
    }
  };

  const deleteItem = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/items/delete/${id}`);
    alert("✅ Item Deleted Successfully!");
    fetchItems();
  } catch (error) {
    alert("❌ Failed to Delete Item");
  }
};

  const returnItem = async (id) => {
    try {
      await API.put(`/items/return/${id}`);
      alert("Item Returned Successfully!");
      fetchItems();
    } catch (error) {
      alert("Failed to Return Item");
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = items.length;
  const availableItems = items.filter(
    (item) => item.status === "available"
  ).length;
  const borrowedItems = items.filter(
    (item) => item.status === "borrowed"
  ).length;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="hero">
        <h1>Borrow. Share. Save. 🌍</h1>
        <p>Community Sharing Platform for Everyone</p>

        <input
          type="text"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      {/* Categories */}
      <div className="categories">
        <div className="category-card">
          📚
          <h3>Books</h3>
        </div>

        <div className="category-card">
          💻
          <h3>Electronics</h3>
        </div>

        <div className="category-card">
          🏸
          <h3>Sports</h3>
        </div>

        <div className="category-card">
          👕
          <h3>Clothes</h3>
        </div>

        <div className="category-card">
          🏠
          <h3>Home</h3>
        </div>

        <div className="category-card">
          🎸
          <h3>Music</h3>
        </div>
      </div>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="dashboard-card">
          <h2>{totalItems}</h2>
          <p>Total Items</p>
        </div>

        <div className="dashboard-card">
          <h2>{availableItems}</h2>
          <p>Available</p>
        </div>

        <div className="dashboard-card">
          <h2>{borrowedItems}</h2>
          <p>Borrowed</p>
        </div>
      </div>

      {/* Features */}
      <div className="features">
        <div className="feature-card">
          🚀
          <h2>Fast Borrowing</h2>
          <p>Borrow items in just one click with an easy process.</p>
        </div>

        <div className="feature-card">
          🔒
          <h2>Safe & Secure</h2>
          <p>Your shared items are managed securely.</p>
        </div>

        <div className="feature-card">
          🌍
          <h2>Community Sharing</h2>
          <p>Help people by sharing things you don't use.</p>
        </div>
      </div>

      {/* Featured Items */}
      <div className="section-title">
        <h2>🔥 Featured Items</h2>
        <p>Browse the most popular items shared by our community.</p>
      </div>
      <div className="home-container">
        {filteredItems.length === 0 ? (
          <h2>No Items Found</h2>
        ) : (
          filteredItems.map((item) => (
            <div key={item._id} className="item-card">

              <div className="item-image">
                {item.category === "Books"
                  ? "📚"
                  : item.category === "Electronics"
                  ? "💻"
                  : item.category === "Sports"
                  ? "⚽"
                  : item.category === "Furniture"
                  ? "🪑"
                  : item.category === "Clothes"
                  ? "👕"
                  : item.category === "Home"
                  ? "🏠"
                  : item.category === "Music"
                  ? "🎸"
                  : "📦"}
              </div>

              <span className="category-badge">
                {item.category}
              </span>

              <h2>{item.name}</h2>

              <p>{item.description}</p>

              <p>
                <strong>Status:</strong> {item.status}
              </p>

              {item.status === "available" ? (
  <button
    className="borrow-btn"
    onClick={() => borrowItem(item._id)}
  >
    🚀 Borrow Now
  </button>
) : (
  <button
    className="return-btn"
    onClick={() => returnItem(item._id)}
  >
    ↩️ Return Item
  </button>
)}

<button
  className="delete-btn"
  onClick={() => deleteItem(item._id)}
>
  🗑 Delete
</button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <h2>🚀 BorrowNet</h2>

        <p>Borrow. Share. Save.</p>

        <p>
          Made with ❤️ using React, Node.js, Express &
          MongoDB
        </p>

        <p>© 2026 BorrowNet. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Home;