import "./App.css"
import { Login }                                from "./components/Auth/Login.tsx";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { BlogList }                             from "./components/BlogList/BlogList.tsx";
import UserContext                      from "./context/UserContext.tsx";
import { Header }                       from "./components/Header/Header.tsx";

function App() {

  return (
      <>
        <UserContext>
          <BrowserRouter>
            <Routes>
              <Route element={ <><Header/> <Outlet/></> }>
                <Route path="/" element={ <h2>/</h2> }/>
                <Route path="/connexion" element={ <Login/> }/>
                <Route path="/profile" element={ <>salut</> }/>
                <Route path="/article" element={ <BlogList/> }/>
                <Route path="/categorie" element={ <h2>toutes les categories</h2> }/>
                <Route path="/categorie/:id" element={ <h2>une categorie</h2> }/>
                <Route path="/admin" element={ <h2>admin</h2> }/>
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext>
      </>
  )
}

export default App
