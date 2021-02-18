import React from 'react';

import './styles.css';

function Card({ pathImage, altImage, children, isTotal }) {
  return (
    <>
      {isTotal ? (
        <div className="card total">
          <h3>
            <span>
              {children}
            </span>
            <img src={pathImage} alt={altImage} />
          </h3>
          <p id="expenseDisplay">R$ 0,00</p>
        </div>
      ) : (
          <div className="card">
            <h3>
              <span>
                {children}
              </span>
              <img src={pathImage} alt={altImage} />
            </h3>
            <p id="expenseDisplay">R$ 0,00</p>
          </div>
        )
      }
    </>
  )
}

export default Card;