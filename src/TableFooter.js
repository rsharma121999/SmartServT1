import React from 'react';
import './TableFooterStyles.css';

const TableFooter = ({ range, setPage, page }) => {
  return (
    <div className="wrapper">
      <div className="pagination">
        {range.map((el, index) => {
          return (
            <button
              className={el === page ? 'button active' : 'button'}
              onClick={() => setPage(el)}
              key={index}
            >
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TableFooter;
