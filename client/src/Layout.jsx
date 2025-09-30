// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { Outlet } from "react-router-dom";

// const Layout=()=>{
//     return(
//         <>
//          <Header/>

        
//          <Outlet/>


//          <Footer/>
        
//         </>
//     )
// }

// export default Layout;


import Header from "./components/Header";
// import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
