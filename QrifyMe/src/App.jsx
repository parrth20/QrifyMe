
// import './App.css'
// import { Footer } from './components/Footer'
// import { LandingPage } from './components/Landing'
// import { LoginPage } from './components/Login'
// import { Maarquee } from './components/Marquee'
// import { Navbar } from './components/Navbar'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { SignupPage } from './components/SignupForm'
// import { HomeLayout } from './components/Homelayout'
// // import LoginPage from './LoginPage';   
// // import SignupPage from './SignupPage'; 

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       {/* <div>
//         <Navbar></Navbar>
//         <Maarquee></Maarquee>
//         <LandingPage></LandingPage>
//         <Footer></Footer>
//         <BrowserRouter>
//         <Routes>
//             <Route path="/login" element={<LoginPage/>} />
//             <Route path="/signup" element={<SignupPage/>} />
//         </Routes>
//       </BrowserRouter>
//       </div> */}
//       <BrowserRouter>
//         <Routes>
//         {/* Home route: includes the full landing page layout */}
//         <Route path="/" element={<HomeLayout />} />
        
//         {/* Standalone routes for login and signup */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//       </Routes>
//       </BrowserRouter>

//     </>
//   )
// }

// export default App
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your new and existing components
import HomeLayout from "./components/Homelayout"; // This might include your landing page, navbar, footer, etc.
import Login from "./components/Login";           // New Login.jsx file using Tailwind designs
import Register from "./components/Register";     // New Register.jsx file using Tailwind designs
import Dashboard from "./components/Dashboard";   // New Dashboard.jsx file

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route: renders the full landing page layout */}
        <Route path="/" element={<HomeLayout></HomeLayout>} />
        {/* Standalone routes for login, registration, and dashboard */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
