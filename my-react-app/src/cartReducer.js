import { useReducer,useState } from 'react';


export function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}

export function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [count,setCount] = useState(0);
  function addToCart(item) {
   console.log(count);
    item.id =setCount(count + 1);
    item.name = `Item ${count}`;
    dispatch({ type: 'add', payload: item });
  }

  function removeFromCart(item) {
    console.log(item.id);
    dispatch({ type: 'remove', payload: item });
  }

  return (
    <div>
      <p>Shopping cart</p>
      
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={(item) => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={(item) => addToCart(item)}>Add item 1</button>

    </div>
  );
}

export default ShoppingCart;