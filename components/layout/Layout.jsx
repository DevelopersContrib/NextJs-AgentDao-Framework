import { getDomain } from "@/lib/data";
import Header from "../Header";
import Footer from "../Footer";

export default async function Layout({ children, disableFooter = false }) {
  const domain = getDomain();

  return (
    <div className="flex flex-col min-h-screen">
      <Header domain={domain} />
      <main className="flex-1 flex justify-center items-center">{children}</main>
      {!disableFooter && <Footer domain={domain} />}
    </div>
  );
}
