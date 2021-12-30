import React from 'react';
import './TableStyles.css';

const Table = ({ slice }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Popularity</th>
          </tr>
          {slice &&
            slice.map((prod, key) => {
              return (
                <tr key={key}>
                  <td>{prod.title}</td>
                  <td>{prod.price}</td>
                  <td>{prod.popularity}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
