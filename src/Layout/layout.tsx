
import Footer from "../components/footer";
import { NavbarSimple } from "../components/header2";
function Layout(props: any) {
  return (
    <>
      {/* <Header /> */}
      <NavbarSimple/>
      <div className="flex-grow    mt-[65px]">
      {props.page}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
