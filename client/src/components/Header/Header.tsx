import "./Header.css"
import { Fragment, useEffect, useState } from "react";
import { useUserContext }                from "../../context/UserContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import CategoriesService from "../../services/CategoriesService.ts";
import categoriesService                 from "../../services/CategoriesService.ts";

type menuType = {
  title: string;
  path: string;
  children?: { title: string; path: string; id: number }[];
}[]

export const Header = () => {
  const navigate = useNavigate()
  const { user, logout } = useUserContext()

  const [catégoriesMenuItem, setCatégoriesMenuItem] = useState([]);

  const getCategoriesMenuItem = async () => {
    const catégories = await CategoriesService.getAll()
    const catégoriesMenuItem = catégories.map((catégorie: any)=>{
      return {title: catégorie.titre, path:`/categorie/${catégorie._id}`, id:catégorie._id}
    })
    setCatégoriesMenuItem(catégoriesMenuItem)
  }

  useEffect(() => {
    getCategoriesMenuItem()
  }, []);

  let menu: menuType = []

  const invitéMenu: menuType = [
    { title: "S'inscrire", path: "/inscription" },
    { title: "Se connecter", path: "/connexion" },
    { title: "À propos", path: "/" },
  ];

  const élèveMenu: menuType = [
    { title: "Article", path: "/article" },
    { title: "Catégorie", path: "/categorie", children: catégoriesMenuItem },
    { title: "profile", path: "/profile" },
  ];

  const professeurMenu: menuType = [
    { title: "Article", path: "/article" },
    { title: "Catégorie", path: "/categorie", children: catégoriesMenuItem },
    { title: "Écrire un article", path: "/article/nouveau" },
    { title: "profile", path: "/profile" },
  ];

  const adminMenu: menuType = [
    { title: "Validation-Professeur", path: "/admin/prof-application" },
    { title: "Dashboard", path: "/admin/dashboard" },
  ];

  if (!user) {
    menu = invitéMenu
  }

  switch (user?.role) {
    case "élève":
      menu = élèveMenu
      break;
    case "professeur":
      menu = professeurMenu
      break;
      case "admin":
        menu = adminMenu
          navigate("/admin")
      break;
    default:
      menu = invitéMenu
  }


  return (
      <>
        <header className="header">
          <input aria-label="Mobile Menu" type="checkbox" className="header__burger"/>

          <Link to="/" className="header__logo">
            <h1 className="header__title">Educa</h1>
          </Link>

          <div className="header__links">
            {
              menu.map((item, index) => (
                  <Fragment key={ index }>
                    { item.children && ( <Fragment key={ index }>

                          <Link className="header__link" to={ item.path }>{ item.title }</Link>
                          <div className="header__sublinks">
                            { item.children.map((children) => (
                                <Link to={ children.path } key={ children.id }>{ children.title }</Link>
                            )) }
                          </div>
                        </Fragment>
                    ) }

                    { !item.children && (
                        <Link className="header__link" to={ item.path }>{ item.title }</Link>
                    ) }
                  </Fragment>
              ))
            }
                    {user&& <button onClick={()=> logout()} >Déconnexion</button>}
          </div>
        </header>
      </>
  )
      ;
};