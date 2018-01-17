import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];
const buildControls = props => {
  let buttonChoice = (
    <button onClick={props.ordered} disabled={!props.purchasable} className={classes.OrderButton}>
      {props.isLoggedin ? 'ORDER NOW' : 'LOGIN TO ORDER'}
    </button>
  );

  let menuChoices = (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>{' '}
      </p>
      {controls.map((ctrl, i) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}

      {buttonChoice}
    </div>
  );
  // }
  return menuChoices;
};

export default buildControls;
