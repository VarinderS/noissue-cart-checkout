import { useRouter } from "next/router";
import { CartItem } from "@/components/cart-item";

export default function Home({ products, shippingFees }) {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });
      if (response.ok) {
        router.push("/confirmation");
      } else {
        throw new Error("Failed to checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error processing your checkout.");
    }
  };

  return (
    <div className="container min-h-full px-4 mx-auto">
      <h1 className="my-4 text-2xl font-bold">Shopping Cart</h1>
      {products.length > 0 ? (
        products.map((item, index) => <CartItem key={index} item={item} />)
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Shipping Fees</h2>
        <p className="text-gray-800">
          Total Shipping Fee: {shippingFees.totalFee.symbol}
          {shippingFees.totalFee.total}
        </p>
        <ul className="pl-5 list-disc">
          {shippingFees.supplierShippingFees.map((fee, index) => (
            <li key={index}>
              {fee.supplierName}: {fee.payment.symbol}
              {fee.payment.total}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={handleCheckout}
      >
        Submit
      </button>
    </div>
  );
}

export async function getServerSideProps() {
  const cartData = await import("@/data/cart.json");

  const supplierMap = cartData.products.reduce((acc, product) => {
    const { supplierId, supplierName } = product.supplier;
    acc[supplierId] = supplierName;
    return acc;
  }, {});

  const { shippingFees } = cartData;

  const shippingFeesWithSupplierNames = shippingFees.supplierShippingFees.map(
    (fee) => ({
      ...fee,
      supplierName: supplierMap[fee.supplierId.padStart(5, "0")],
    })
  );

  const modifiedShippingFees = Object.assign(shippingFees, {
    supplierShippingFees: shippingFeesWithSupplierNames,
  });

  return {
    props: {
      products: cartData.products,
      shippingFees: modifiedShippingFees,
    },
  };
}
