import { useCategorieContext } from "../../context/CategorieContext.tsx";
import { CategorieCard }       from "./CategorieCard/CategorieCard.tsx";
import  "../../style/CardList.css"

export const CategorieList = () => {
  const {catégories} = useCategorieContext()

  return (
      <>
        <ul className="card__liste">
          { catégories.map(catégorie => <CategorieCard catégorie={ catégorie } key={ catégorie._id }/>) }
        </ul>
      </>
  );
};