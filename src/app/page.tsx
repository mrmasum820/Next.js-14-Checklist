import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/blog">Blog</Link>
      <Link href="/products">Products</Link>
      <h1>Welcome Home</h1>
    </>
  );
}
