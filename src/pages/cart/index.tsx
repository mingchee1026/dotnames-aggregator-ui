import { useAppSelector } from "@/redux/store";
import Cart from "@/views/Cart/Cart";
import React from "react";

type Props = {};

function CartPage({}: Props) {

  return (
    <div>
      <Cart />
    </div>
  );
}

export default CartPage;
