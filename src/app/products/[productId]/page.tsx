export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  return <h2>Product detail page {params.productId}</h2>;
}
