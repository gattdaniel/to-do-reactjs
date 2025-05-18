import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Resetpassword= lazy(()=> import ("./pages/Resetpassword"))

function App() {
  const { user, loading } = useContext(AuthContext);
  console.log(user)
 

  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>; 
  }
  return (
    <>
     
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/",
            element: <Suspense ><Login /></Suspense>,
          },
          {
            path: "/signup",
            element: <Suspense>{!user ? <Signup /> : <Dashboard />}</Suspense>,
          },
          {
            path: "/Resetpassword", 
            element: <Resetpassword />,
          }
        ])}
      />
    </>
  );
}

export default App;
