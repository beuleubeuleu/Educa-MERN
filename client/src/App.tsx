import "./App.css"
import { Login }                               from "./components/Auth/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BlogList }                            from "./components/BlogList/BlogList.tsx";
import UserContext                             from "./context/UserContext.tsx";

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Login/> },
    { path: "/accueil", element: <BlogList/> }
  ]);

  return (
      <>
        <UserContext>
          <RouterProvider router={ router }/>
        </UserContext>
      </>
  )
}

export default App
