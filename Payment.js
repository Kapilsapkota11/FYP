import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";

function Payment() {
  const location = useLocation();
  const { boat } = location.state || {};
  const [hours, setHours] = useState(1);
  const [startTime, setStartTime] = useState(""); // Start time input
  const [endTime, setEndTime] = useState(""); // Calculated end time
  const [selectedDate, setSelectedDate] = useState(""); // Selected date
  const [qrCode, setQrCode] = useState("");
  const uuid = uuidv4();

  if (!boat) {
    return <h2>No Boat Selected</h2>;
  }

  const hourlyPrice = parseInt(boat.price.replace(/[^0-9]/g, ""));
  const totalPrice = hourlyPrice * hours;

  // Function to calculate the end time
  const calculateEndTime = (start, hours) => {
    if (!start) return ""; // Return empty if no start time is selected
    const startDate = new Date(`2023-01-01T${start}`);
    startDate.setHours(startDate.getHours() + hours);
    return startDate.toTimeString().slice(0, 5); // Return in HH:MM format
  };

  // Function to validate the selected time
  const isValidTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes; // Convert time to total minutes since midnight
    const minTime = 6 * 60; // 6:00 AM in minutes
    const maxTime = 19 * 60; // 7:00 PM in minutes
    return totalMinutes >= minTime && totalMinutes <= maxTime;
  };

  const handleStartTimeChange = (e) => {
    const selectedTime = e.target.value;

    if (isValidTime(selectedTime)) {
      setStartTime(selectedTime);
      setEndTime(calculateEndTime(selectedTime, hours));
    } else {
      alert("Please select a time between 6:00 AM and 7:00 PM.");
      setStartTime(""); // Reset invalid time
      setEndTime(""); // Clear the end time
    }
  };

  const handleHoursChange = (e) => {
    const hrs = parseInt(e.target.value) || 1;
    setHours(hrs);
    setEndTime(calculateEndTime(startTime, hrs));
  };

  const handleGenerateQrAndPdf = async () => {
    if (!selectedDate) {
      alert("Please select a date for your reservation.");
      return;
    }
  
    try {
      // Generate QR code
      const qrCodeData = await QRCode.toDataURL(uuid);
      setQrCode(qrCodeData);
  
      // Generate PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [300, 400], // Custom small size
      });
  
      // Add background color
      pdf.setFillColor(240, 248, 255); // Light blue background
      pdf.rect(0, 0, 300, 400, "F");
  
      // Add header
      pdf.setFontSize(18);
      pdf.setTextColor(0, 102, 204); // Blue color
      pdf.text("Boat Reservation and Rental", 150, 30, { align: "center" });
  
      // Add boat image
      const boatImage = new Image();
      boatImage.src = boat.image;
      await boatImage.decode();
  
      // Add boat details
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Black text
      pdf.text(`Boat Title: ${boat.title}`, 150, 160, { align: "center" });
      pdf.text(`Condition: ${boat.condition}`, 150, 180, { align: "center" });
      pdf.text(`Reservation Date: ${selectedDate}`, 150, 200, { align: "center" });
      pdf.text(`Start Time: ${startTime}`, 150, 220, { align: "center" });
      pdf.text(`End Time: ${endTime}`, 150, 240, { align: "center" });
      pdf.text(`Hours Reserved: ${hours}`, 150, 260, { align: "center" });
      pdf.text(`Total Cost: Rs.${totalPrice}`, 150, 280, { align: "center" });
  
      // Add QR Code
      const qrImage = new Image();
      qrImage.src = qrCodeData;
      await qrImage.decode();
      pdf.addImage(qrImage, "PNG", 100, 300, 100, 100); // Centered QR Code (adjusted position)
  
      // Save PDF
      pdf.save("boat-reservation.pdf");
    } catch (error) {
      console.error("Error generating QR code or PDF:", error);
    }
  };
  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Payment Page</h1>
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <img
          src={boat.image}
          alt={boat.title}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{boat.title}</h5>
          <p className="card-text">{boat.body}</p>
          <p>
            <strong>Condition:</strong> {boat.condition}
          </p>
          <p>
            <strong>Price Per Hour:</strong> {boat.price}
          </p>
          <div className="mb-3">
            <label className="form-label">Select Reservation Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Start Time</label>
            <input
              type="time"
              className="form-control"
              min="06:00" // Minimum time: 6:00 AM
              max="19:00" // Maximum time: 7:00 PM
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Hours</label>
            <input
              type="number"
              className="form-control"
              min="1"
              value={hours}
              onChange={handleHoursChange}
            />
          </div>
          {endTime && (
            <p>
              <strong>End Time:</strong> {endTime}
            </p>
          )}
          <p>
            <strong>Total Price:</strong> Rs.{totalPrice}
          </p>
          <button
            className="btn btn-success w-100"
            onClick={handleGenerateQrAndPdf}
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Optional: Display QR code */}
      {qrCode && (
        <div className="mt-4 text-center">
          <h5>Your QR Code:</h5>
          <img src={qrCode} alt="Reservation QR Code" style={{ maxWidth: "200px" }} />
        </div>
      )}
    </div>
  );
}

export default Payment;
