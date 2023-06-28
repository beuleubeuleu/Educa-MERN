import { Loader }      from "../../../../components/Loader/Loader.tsx";
import { BlogCard }    from "../BlogCard/BlogCard.tsx";
import "../../../../style/CardList.css"
import { articleType } from "../../../../types/articleType.ts";

type BlogListProps = {
  titre: string,
  data: articleType[]
}

export const BlogList = ({titre, data}: BlogListProps) => {

  return (
      <>
        <h2 className="card__titre"> Tous les articles {titre}:</h2>
        <ul className="card__liste">
          { !data && <Loader/> }
          { data && data.map(article => <BlogCard article={ article } key={ article._id }/>) }
        </ul>
      </>
  );
};