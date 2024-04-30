// import React from "react";
// import { Card, Avatar, Button, InputNumber } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";

// const { Meta } = Card;

// const Cart = () => {
//   const cartItems = [
//     {
//       id: 1,
//       name: "Product 1",
//       price: 19.99,
//       quantity: 2,
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 2,
//       name: "Product 2",
//       price: 24.99,
//       quantity: 1,
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 3,
//       name: "Product 3",
//       price: 14.99,
//       quantity: 3,
//       image: "https://via.placeholder.com/150",
//     },
//   ];

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const handleQuantityChange = (id, value) => {
//     // Handle quantity change logic
//     console.log(`Item ID: ${id}, New Quantity: ${value}`);
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
//           {cartItems.map((item) => (
//             <Card
//               key={item.id}
//               className="mb-4"
//               actions={[
//                 <InputNumber
//                   min={1}
//                   max={10}
//                   defaultValue={item.quantity}
//                   onChange={(value) => handleQuantityChange(item.id, value)}
//                 />,
//                 <DeleteOutlined key="delete" />,
//               ]}
//             >
//               <Meta
//                 avatar={<Avatar src={item.image} />}
//                 title={item.name}
//                 description={`$${item.price} x ${item.quantity}`}
//               />
//             </Card>
//           ))}
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="mb-4">
//             <p className="text-gray-600 mb-2">Total Price:</p>
//             <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
//           </div>
//           <Button type="primary" block>
//             Proceed to Checkout
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// second cart component

import React, { useState } from "react";
import { Button, InputNumber, List } from "antd";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 10, quantity: 1 },
    { id: 2, name: "Product 2", price: 20, quantity: 2 },
    { id: 3, name: "Product 3", price: 15, quantity: 1 },
  ]);

  const handleIncrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => handleDecrement(item.id)}>-</Button>,
              <InputNumber value={item.quantity} min={1} />,
              <Button onClick={() => handleIncrement(item.id)}>+</Button>,
              <Button danger onClick={() => handleRemove(item.id)}>
                Remove
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<div className="font-semibold">{item.name}</div>}
              description={`Price: $${item.price} | Total: $${
                item.price * item.quantity
              }`}
            />
          </List.Item>
        )}
      />
      <div className="mt-4 text-right">
        <p className="font-bold">Total: ${totalPrice}</p>
        <Button type="primary" className="mt-2">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
