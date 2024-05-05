function ConfirmationPage({ orders }) {
  return (
    <div className="container px-4 mx-auto">
      <h1 className="my-4 text-2xl font-bold">Checkout Confirmation</h1>
      {orders.map((order, index) => (
        <div key={index} className="p-4 mb-6 border rounded shadow">
          <h2 className="text-lg font-semibold">{order.supplierName}</h2>
          <ul className="pl-5 list-disc">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.productName} - {item.productQuantity} units - $
                {item.payment.total}
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const cartData = await import("@/data/cart.json");

  const orders = cartData.products.reduce((acc, item) => {
    const { supplierId, supplierName } = item.supplier;
    if (!acc[supplierId]) {
      acc[supplierId] = {
        supplierName,
        items: [],
        total: 0,
      };
    }
    acc[supplierId].items.push(item);
    acc[supplierId].total += parseFloat(item.payment.total);
    return acc;
  }, {});

  return {
    props: {
      orders: Object.values(orders),
    },
  };
}

export default ConfirmationPage;
