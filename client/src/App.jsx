import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

// Ambulance Pages
import AmbulanceHomePage from './pages/AmbulancePages/AmbulanceHomePage';
import InventoryPage from './pages/AmbulancePages/InventoryPage';

// Hospital Pages
import HospitalHomePage from './pages/HospitalPages/HospitalHomePage';

// Patient Pages
import PatientHomePage from './pages/PatientPages/PatientHomePage';

// Shared Components
import Navbar from './components/SharedComponents/Navbar';
import Footer from './components/SharedComponents/Footer';

// Dashboard
import Dashboard from './pages/Dashboard/Dashboard';

// Authentication Pages
import SignInPage from './pages/AuthenticationPages/SignInPage';
import SignUpPage from './pages/AuthenticationPages/SignUpPage';

const Layout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )

};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/Ambulance/Home",
        element: <AmbulanceHomePage />,
      },
      {
        path: "/Ambulance/Inventory",
        element: <InventoryPage />,
      },
      {
        path: "/Hospital/Home",
        element: <HospitalHomePage />,
      },
      {
        path: "/Patient/Home",
        element: <PatientHomePage />,
      },
    ]
  },
  {
    path: "/SignIn",
    element: <SignUpPage />
  },
  {
    path: "/SignUp",
    element: <SignInPage />
  },
]);

export default function App() {
  return (
    <div className=''>
      <RouterProvider router={router} />
    </div>
  )
}