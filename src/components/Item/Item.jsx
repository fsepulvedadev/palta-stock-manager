import React from "react";
import { Link } from "react-router-dom";

import "./Item.css";

const Item = ({
  name,
  stock,
  img,
  description,
  price,
  category,
  selectItem,
  id,
}) => {
  return (
    <>
      <div
        className="my-4 text-center text-white bg-green-900 rounded shadow-lg md:m-4 palta-select-animation"
        style={{ width: "15rem", height: "500px" }}
      >
        <img
          src={img[0]}
          className="w-auto h-50 card-palta-img"
          style={{}}
          alt="..."
        />
        <div className="flex flex-col">
          <div className="h-22">
            <h5 className="py-4 text-xl text-bold">{name}</h5>
          </div>
          <hr />
          <h3>${price}</h3>
          <p className="text-center palta-background-blue">Stock {stock}</p>
          <button className="px-1 py-1 m-auto text-center rounded hover:bg-lime-600 bg-lime-700 w-52">
            {" "}
            <Link
              className="text-white text-decoration-none d-flex justify-content-center align-items-center"
              to={`/edit/${id}`}
            >
              <span className="mx-2 "> Editar </span>
              <ion-icon name="create-outline"></ion-icon>
            </Link>{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Item;
