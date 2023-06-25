import "./App.css"
import { Login }                               from "./components/Auth/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BlogList }                            from "./components/BlogList/BlogList.tsx";

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Login/> },
    { path: "/accueil", element:  <BlogList/>},
  ]);

  return (
      <>
        <RouterProvider router={ router }/>
      </>
  )
}

export default App
