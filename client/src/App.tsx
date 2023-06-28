import "./App.css"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { BlogList }                             from "./components/BlogList/BlogList.tsx";
import UserProvider                             from "./context/UserContext.tsx";
import { Header }                               from "./components/Header/Header.tsx";
import CategorieProvider                        from "./context/CategorieContext.tsx";
import { CategorieList }                        from "./pages/Catégories/CategorieList.tsx";
import Register                                 from "./components/Auth/Register.tsx";
import { PrivateRoutes }                        from "./components/Routes/PrivateRoutes.tsx";
import { Login }                                from "./components/Auth/Login.tsx";
import { GuestRoutes }                          from "./components/Routes/GuestRoutes.tsx";
import { ProfRoutes }                           from "./components/Routes/ProfRoutes.tsx";
import { AdminRoutes }                          from "./components/Routes/AdminRoutes.tsx";
import { NouvelArticle }                        from "./pages/NouvelArticle/NouvelArticle.tsx";


function App() {

  return (
      <>
        <UserProvider>
          <CategorieProvider>
            <BrowserRouter>
              <Routes>
                <Route element={ <><Header/> <Outlet/></> }>

                  //routes de user Invité------------------------

                  <Route element={ <GuestRoutes/> }>
                    <Route path="/connexion" element={ <Login/> }/>
                    <Route path="/inscription" element={ <Register/> }/>
                  </Route>

                  //routes de user Connecté------------------------
                  <Route element={ <PrivateRoutes/> }>
                    <Route path="/" element={ <h2>/</h2> }/>
                    <Route path="/article" element={ <BlogList/> }/>
                    <Route path="/categorie" element={ <CategorieList/> }/>
                    <Route path="/categorie/:id" element={ <h2>une categorie</h2> }/>
                  </Route>

                  //routes de user Professeur-----------------------
                  <Route element={ <ProfRoutes/> }>
                    <Route path="/article/nouveau" element={ <NouvelArticle/> }/>
                    <Route path="/article/mes-articles" element={ <BlogList/> }/>
                  </Route>

                  //routes de user Admin------------------------
                  <Route element={ <AdminRoutes/> }>
                    <Route path="/admin/" element={ <></> }/>
                    <Route path="/admin/validation-professeur" element={ <></> }/>
                    <Route path="/admin/dashboard" element={ <></> }/>
                  </Route>

                </Route>
              </Routes>
            </BrowserRouter>
          </CategorieProvider>
        </UserProvider>
      </>
  )
}

export default App
