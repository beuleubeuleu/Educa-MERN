import { Loader }   from "../Loader/Loader.tsx";
import { BlogCard } from "../BlogCard/BlogCard.tsx";
import useFetch     from "../../hooks/useFetch.ts";
import { articleType } from "../../types/articleType.ts";
import "../../style/CardList.css"
import { useUserContext } from "../../context/UserContext.tsx";

export const BlogList = () => {
  const { data, error, isLoading } = useFetch<{ articles: articleType[] }>("/api/article");
  const {user} = useUserContext()

  return (
      <>
        <h2 className="card__titre"> salut {user?.nomComplet} Tous les articles:</h2>
        <ul className="card__liste">
          { isLoading && <Loader/> }
          { error && <p>what the heck</p> }
          { data && data.articles.map(article => <BlogCard article={ article } key={ article._id }/>) }
        </ul>
      </>
  );
};