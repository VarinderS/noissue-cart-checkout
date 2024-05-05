function CartItem({ item }) {
  return (
    <div className="p-4 mb-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold">
        {item.productName} ({item.productQuantity})
      </h2>
      <p className="text-gray-600">{item.productDescription}</p>
      <div className="font-semibold text-gray-800">
        Price: {item.payment.symbol}
        {item.payment.total} {item.payment.currency}
      </div>
      <div className="text-gray-500">
        Supplier: {item.supplier.supplierName}
      </div>
    </div>
  );
}

export { CartItem };
