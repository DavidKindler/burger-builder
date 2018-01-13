import React from 'react';
import classes from './Order.css';

const Order = props => {
  let ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const newDate = new Date(props.orderDate);
  const orderDate = newDate.toLocaleString();
  // const orderDate = Date.parse(props.orderDate);
  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '4px 8px 0',
          border: '1px solid #ccc',
          padding: '5px'
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD ${(+props.price).toFixed(2)}</strong>
      </p>
      <p>Order Date: {orderDate}</p>
    </div>
  );
};

export default Order;
