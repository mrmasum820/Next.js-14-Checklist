"use client";
import { useRouter } from "next/navigation";

export default function OrderProduct() {
  const router = useRouter();
  const handleClick = () => {
    console.log("Placing your order");
    // router.push("/");
    router.replace("/");
    // router.back();
    // router.forward();
  };
  return (
    <>
      <h2>Order Product</h2>
      <button onClick={handleClick}>Place Order</button>
    </>
  );
}
