import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Hello from "./components/Hello";
import Bye from "./components/Bye";
import ShoppingCartPage from "./user/ShoppingCart";
import { MenuPage } from "./user/menu";
import AdminTrack from "./admin/AdminTrack1";
import Stats from "./admin/Stats1";
import Carousel from "./user/Carousel";
import Inventory from "./admin/Inventory1";
import RevenueGraph from "./admin/RevenueGraph";
import WalletPage from "./user/Wallet";
import Shop from "./user/Shop";
import { NavAdm } from "./admin/AdminTrack";
import { NavInv } from "./admin/Inventory";
import { NavStat } from "./admin/Stats";
import Home from "./home";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesWeb />
      </BrowserRouter>
    </>
  );
}

const RoutesWeb = () => {
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* {loading && <Loader />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* User Routes Here */}
        <Route path="/user/menu" element={<MenuPage />} />
        <Route path="/user/caru" element={<Carousel />} />
        <Route path="/user/wallet" element={<WalletPage />} />
        <Route path="/user/cart" element={<ShoppingCartPage />} />
        <Route path="/user/shop" element={<Shop />} />

        {/* Admin Routes Here */}
        <Route path="/admin/stats" element={<NavStat />} />
        <Route path="/admin/track" element={<NavAdm />} />
        <Route path="/admin/inventory" element={<NavInv />} />
      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
    </>
  );
};

export default App;
