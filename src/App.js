import './App.css';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [productsList, setProductsList] = useState([]);

  const sortList = arr => {
    arr.sort(function (a, b) {
      var x = Number(a['popularity']);
      var y = Number(b['popularity']);
      return x < y ? 1 : x > y ? -1 : 0;
    });
  };

  useEffect(() => {
    fetch(`https://s3.amazonaws.com/open-to-cors/assignment.json`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        let prods = [];
        let products = response.products;
        prods = Object.entries(products).map(e => e[1]);
        setProductsList(prods);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  return (
    <div className="App">
      {productsList && sortList(productsList)}
      {productsList.map((prod, key) => {
        return (
          <div className="card" key={key}>
            <div className="box1">
              <h3>Title</h3>
              <h3>{prod.title}</h3>
            </div>
            <div className="box2">
              <h3>Price: </h3>
              <h3>{prod.price}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
