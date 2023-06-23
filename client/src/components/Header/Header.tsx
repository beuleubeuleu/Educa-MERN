import "./Header.css"
import { Fragment } from "react";

export const Header = () => {
  const menuItems: {
    title: string;
    path: string;
    children?: { title: string; path: string; id:number }[];
  }[] = [
    {title: "home", path:"/"}
  ];
  return (
      <header className="header">
        <input aria-label="Mobile Menu" type="checkbox" className="header__burger"/>

        <a href="/" className="header__logo">
          <h1 className="header__title">Educa</h1>
        </a>

        <div className="header__links">
          {
            menuItems.map((item, index) => (
                <Fragment key={index}>
                { item.children && (<Fragment key={index}>

                      <a className="header__link" href={ item.path }>{ item.title }</a>
                      <div className="header__sublinks">
                        { item.children.map((children) => (
                            <a href={ children.path } key={children.id }>{ children.title }</a>
                        )) }
                      </div></Fragment>
            ) }

          { !item.children && (
              <a className="header__link" href={ item.path } >{ item.title }</a>
          ) }
        </Fragment>
        ))
        }
      </div>
</header>
)
  ;
};