import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Boats from "../boats.txt"
function Renting() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      Boats
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setFilteredData(json);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilter = () => {
    let filtered = data;

    if (filterType) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(filterType.toLowerCase())
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map((price) => parseInt(price));
      filtered = filtered.filter((item) => {
        const itemPrice = parseInt(item.price.replace(/[^0-9]/g, ""));
        return itemPrice >= min && itemPrice <= max;
      });
    }

    setFilteredData(filtered);
  };

  const handleReserve = (boat) => {
    navigate(`/payment/${boat.boatId}`, { state: { boat } });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-white">Boat Listings</h1>
      <div className="row mb-4">
        <div className="col-12 col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Boat Type (e.g., Yacht)"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4 mb-3">
          <select
            className="form-control"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Filter by Price</option>
            <option value="0-500">Rs.0 - Rs.500</option>
            <option value="501-1000">Rs.501 - Rs.1000</option>
            <option value="1001-2000">Rs.1001 - Rs.2000</option>
            <option value="2001-5000">Rs.2001 - Rs.5000</option>
          </select>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <button className="btn btn-primary w-100" onClick={handleFilter}>
            Apply Filters
          </button>
        </div>
      </div>
      <div className="row">
        {filteredData.map((item) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.boatId}>
            <div className="card h-100">
              <img
                src={item.image}
                alt={item.title}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.body}</p>
                <p className="card-text">
                  <strong>Condition:</strong> {item.condition}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> {item.price}
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleReserve(item)}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Renting;
