import SeoHead from "@/components/SeoHead/SeoHead";
import Home from "@/views/Home/Home";

export default function Landing() {
  return (
    <main>
      <SeoHead title="Aggregator | Home" />
      <Home />
    </main>
  );
}
