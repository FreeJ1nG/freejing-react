import { useState } from 'react';

const products = [
  { title: 'Apple', isFruit: true, id: 1 },
  { title: 'Orange', isFruit: true, id: 2 },
  { title: 'Peanut', isFruit: false, id: 3 },
];

function FruitList() {
  const listItem = products.map(product =>
    <li
      key = { product.id }
      style = {{
        color: product.isFruit ? 'red' : 'magenta'
      }}
    >
      { product.title }
    </li>
  )
  return listItem;
}

// function MyButton() {
//   const [count, setCount] = useState(0);
//   function handleClick() {
//     alert('you clicked me!');
//     setCount(count + 1);
//   }
//   return (
//     <button onClick = { handleClick }>
//       Click { count } times
//     </button>
//   );
// }

function MyButton({ count, onClick }) {
  return (
    <button onClick = { onClick }>
      Pressed { count } times!
    </button>
  );
}

export default function ShoppingList() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <>
      <MyButton count = { count } onClick = { handleClick } />
      <MyButton count = { count } onClick = { handleClick } />
    </>
  );
}
