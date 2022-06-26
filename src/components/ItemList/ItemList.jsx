import React from "react";
import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ items, selectItem }) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center w-full">
        {items.map((item) => {
          return (
            <Item
              selectItem={selectItem}
              key={item.id}
              id={item.id}
              category={item.category}
              name={item.name}
              stock={item.stock}
              img={item.img}
              description={item.description}
              price={item.price}
            />
          );
        })}
      </div>
    </>
  );
};

export default ItemList;
