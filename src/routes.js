import Index from "./Components";
import Cart from "./Components/Cart";
import Signin from "./Login/Signin";
import ProductDetailPage from "./Components/productdpage";
import RegistrationForm from "./Login/sinup";
import AdminPage from "./Adminpage";
export const router = [
  { path: "/", index: true, element: <Index /> },
  { path: "/cart", index: false, element: <Cart /> },
  { path: "/signup", index: false, element: <Signin />},
  { path: "/product/:productId", index: false, element: <ProductDetailPage /> },  
  { path: "/register", index: false, element: <RegistrationForm /> },
  { path: "/admin", index: false, element: <AdminPage /> }

];
