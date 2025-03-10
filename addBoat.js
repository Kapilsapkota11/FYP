import React, { useState } from "react";

const AddBoat = () => {
  // State to hold form data
  const [boatData, setBoatData] = useState({
    boat_id: "",
    price: "",
    description: "",
    category_id: "",
    image: null,
  });

  // Handle input change for text fields
  const handleChange = (e) => {
    setBoatData({ ...boatData, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setBoatData({ ...boatData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data to send as multipart/form-data
    const formData = new FormData();
    formData.append("boat_id", boatData.boat_id);
    formData.append("price", boatData.price);
    formData.append("description", boatData.description);
    formData.append("category_id", boatData.category_id);
    formData.append("image", boatData.image);

    try {
      // Send POST request to PHP backend
      const response = await fetch("http://localhost/your_project_folder/add_boat.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(data.message); // Show success or error message

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add boat!");
    }
  };

  return (
    <div>
      <h2>Add New Boat</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Boat ID:</label>
        <input type="text" name="boat_id" onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" onChange={handleChange} required />

        <label>Category ID:</label>
        <input type="text" name="category_id" onChange={handleChange} required />

        <label>Boat Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />

        <button type="submit">Add Boat</button>
      </form>
    </div>
  );
};

export default AddBoat;
