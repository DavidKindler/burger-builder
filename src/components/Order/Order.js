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

  // let transformedIngredients = Object.keys(props.ingredients)
  //   .map(igKey => {
  //     return [...Array(props.ingredients[igKey])].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />);
  //   })
  //   .reduce((arr, el) => {
  //     return arr.concat(el);
  //   }, []);

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
    </div>
  );
};

export default Order;
