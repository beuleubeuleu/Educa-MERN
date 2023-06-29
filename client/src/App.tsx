import "./App.css"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import UserProvider                             from "./context/UserContext.tsx";
import { Header }                               from "./components/Header/Header.tsx";
import CategorieProvider                        from "./context/CategorieContext.tsx";
import { CategorieList } from "./pages/Catégories/CategorieList.tsx";
import Register          from "./pages/Auth/Register.tsx";
import { PrivateRoutes } from "./components/Routes/PrivateRoutes.tsx";
import { Login }         from "./pages/Auth/Login.tsx";
import { GuestRoutes }   from "./components/Routes/GuestRoutes.tsx";
import { ProfRoutes }                           from "./components/Routes/ProfRoutes.tsx";
import { AdminRoutes }                          from "./components/Routes/AdminRoutes.tsx";
import { NouvelArticle }                        from "./pages/NouvelArticle/NouvelArticle.tsx";
import { ArticleLayout }                        from "./pages/Article/ArticleLayout/ArticleLayout.tsx";
import { TousLesArticles }     from "./pages/Article/TousLesArticles/TousLesArticles.tsx";
import { ArticleParCategorie } from "./pages/Article/ArticleParCategorie/ArticleParCategorie.tsx";
import { ArticleParAuteur } from "./pages/Article/ArticleParAuteur/ArticleParAuteur.tsx";


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
                    <Route path="/article" element={ <TousLesArticles/> }/>
                    <Route path="/article/:idArticle" element={ <ArticleLayout/> }/>
                    <Route path="/categorie" element={ <CategorieList/> }/>
                    <Route path="/article/categorie/:idCategorie" element={ <ArticleParCategorie/> }/>
                    <Route path="/article/auteur/:idAuteur" element={ <ArticleParAuteur/> }/>
                  </Route>

                  //routes de user Professeur-----------------------
                  <Route element={ <ProfRoutes/> }>
                    <Route path="/article/nouveau" element={ <NouvelArticle/> }/>
                    <Route path="/article/mes-articles" element={ <></> }/>
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
