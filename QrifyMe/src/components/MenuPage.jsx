import React, { useEffect, useState } from "react";
import axios from "axios";

const MenuPage = ({ userId }) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Assume your backend provides a public endpoint to fetch products for a user.
    axios
      .get(`http://localhost:3000/public-menu/${userId}`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Our Menu</h1>
      <ul>
        {products.map((prod) => (
          <li key={prod._id} className="mb-2">
            <h2 className="font-semibold">{prod.name}</h2>
            <p>{prod.desc}</p>
            <p>
              Price: <span className="font-bold">${prod.price}</span>{" "}
              Discount: <span className="font-bold">{prod.discount}%</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPage;
