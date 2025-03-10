// import React from "react";

// function Register() {
//   return (
//     <div
//       style={{
//         backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?nature,water')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         className="card shadow p-4"
//         style={{ backgroundColor: "rgba(15, 1, 1, 0.7)", borderRadius: "10px", width: "400px" }}
//       >
//         <h3 className="text-center text-white mb-4">Register</h3>
//         <form>
//           <div className="mb-3">
//             <label className="form-label text-white">Full Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter full name"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label text-white">Email Address</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter email"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label text-white">Phone Number</label>
//             <input
//               type="tel"
//               className="form-control"
//               placeholder="Enter phone number"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label text-white">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Password"
//               required
//             />
//           </div>
//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // To show success/error messages

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const response = await axios.post("http://localhost/boatreservationandrental/register.php", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setMessage(response.data.message); // Show success/error message
    } catch (error) {
      setMessage("Registration failed! Check server connection.");
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?nature,water')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ backgroundColor: "rgba(15, 1, 1, 0.7)", borderRadius: "10px", width: "400px" }}
      >
        <h3 className="text-center text-white mb-4">Register</h3>

        {message && <p className="text-center text-light">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="full_name"
              placeholder="Enter full name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
