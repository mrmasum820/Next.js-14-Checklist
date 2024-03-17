import { cookies } from "next/headers";

export default function AboutPage() {
  const cookiesStore = cookies();
  const theme = cookiesStore.get("theme");

  console.log(theme);
  console.log("About server component");
  return <h1>About page {new Date().toLocaleTimeString()}</h1>;
}
