export default function handler(req, res) {
  if (req.method === "POST") {
    const { products } = req.body;
    console.log("Processing checkout for items:", products);

    res.status(200).json({ message: "Checkout successful" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
