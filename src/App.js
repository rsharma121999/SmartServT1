import './App.css';
import React, { useState, useEffect } from 'react';
import TableFooter from './TableFooter';
import Table from './Table';

export default function App() {
  const [productsList, setProductsList] = useState([]);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  //BASICALLY IT DIVIDES THE LENGTH OF DATA ARRAY BY GIVEN NO. OF PAGES
  // IF YOU HAVE ARRAY WITH 1000 LENGTH AND 10 PAGES, IT RETURNS AN ARRAY OF VALUES FROM 1-100
  const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };

  // SLICES THE DATA ARRAY FROM PAGE-1 TO PAGE * ROWS PER PAGE
  // BASICALLY IF YOU ARE ON PAGE 2 AND YOU HAVE 10 PAGES IN PAGINATION
  // IT WILL SPLICE THE DATA ARRAY FROM INDEX 10 TO INDEX 20
  const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };

  // SORTS THE DATA ARRAY IN DECREASAING ORDER OF THE KEY "POPULARITY"
  const sortList = arr => {
    arr.sort(function (a, b) {
      var x = Number(a['popularity']);
      var y = Number(b['popularity']);
      return x < y ? 1 : x > y ? -1 : 0;
    });
  };

  // ASYNC FUNCTION TO FETCH DATA FROM API
  async function fetchProductsList() {
    try {
      const response = await fetch(
        `https://s3.amazonaws.com/open-to-cors/assignment.json`
      );
      const json = await response.json();
      let products = json.products;
      let prods = [];
      prods = Object.entries(products).map(e => e[1]);
      setProductsList(prods);
    } catch (error) {}
  }

  // USE EFFECT TO CALL THE ASYNC FUNCTION AND GET THE DATA
  useEffect(() => {
    fetchProductsList();
  }, []);

  // USE EFFECT TO SORT THE DATA ARRAY IN DESCENDING ORDER OF POPULARITY
  // RETURN THE RANGE WHICH DEPENDS ON THE NO. OF ROWS
  // ALSO RETURNS THE SLICED ARRAY CONTAINING DATA DEPENDING ON THE NUMBER OF PAGE
  useEffect(() => {
    sortList(productsList);

    const range = calculateRange(productsList, rows);
    setTableRange([...range]);

    const slice = sliceData(productsList, page, rows);
    setSlice([...slice]);
  }, [productsList, rows, page]);

  return (
    <div className="Box">
      {/* { OPTION TO SELECT THE NUMBER OF ROWS } */}
      <div className="select-box">
        <h3>Select Number of Rows </h3>
        <select
          value={rows}
          onChange={event => {
            setRows(event.target.value);
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </div>
      {/* { MAIN TABLE COMPONENT  } */}
      <Table slice={slice} />
      {/* { TABLE FOOTER COMPONENT WITH PAGINATION  } */}
      <TableFooter range={tableRange} page={page} setPage={setPage} />
    </div>
  );
}
