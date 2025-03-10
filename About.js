// src/components/About.js
import React from 'react';
import '../CSS/About.css';

const About = () => {
  return (
    <div className="about-container bg-transparent text-white">
      <header className="about-header text-center py-5">
        <h1 className="display-4 font-weight-bold">About Us</h1>
      </header>

      <section className="about-content container py-5">
        <div className="card transparent-gray-card mx-auto shadow-lg">
          <div className="card-body">
            <p className="lead">
              At Boat rental and reservation, we make your dream nautical adventure a reality. Whether you're looking to spend a relaxing day on the water with family or need a boat for a special event or party, we have a variety of boats to choose from.
            </p>
            
            <p className="lead">
              Our platform allows you to easily browse through different types of boats, check availability, and make instant reservations or rentals for your trip.
            </p>

            <h3 className="mt-5 mb-3">Our Services Include:</h3>
            <ul className="list-unstyled">
              <li><i className="fas fa-check-circle"></i> Boat Rentals: Choose from a wide range of boats including speedboats, yachts, and fishing boats.</li>
              <li><i className="fas fa-check-circle"></i> Reservation Management: Book boats in advance and manage your reservations.</li>
              <li><i className="fas fa-check-circle"></i> Private Boat Tours: Explore scenic water routes with a dedicated crew.</li>
            </ul>

            <h3 className="mt-5 mb-3">Why Choose Us?</h3>
            <ul className="list-unstyled">
              <li><i className="fas fa-check-circle"></i> Affordable Pricing</li>
              <li><i className="fas fa-check-circle"></i> Easy Online Booking</li>
              <li><i className="fas fa-check-circle"></i> Safety and Comfort</li>
            </ul>

            <p className="lead">
              Join us today and make unforgettable memories on the water with Boat rental and reservation
            </p>
          </div>
        </div>
      </section>

      <footer className="about-footer text-center py-3">
        <p>&copy; 2025 Boat rental and reservation. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
