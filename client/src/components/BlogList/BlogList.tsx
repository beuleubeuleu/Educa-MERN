import { Loader }   from "../Loader/Loader.tsx";
import { BlogCard } from "../BlogCard/BlogCard.tsx";
import useFetch     from "../../hooks/useFetch.ts";
import { articleType } from "../../types/articleType.ts";
import "./BlogList.css"
import { useUserContext } from "../../context/UserContext.tsx";

export const BlogList = () => {
  const { data, error, isLoading } = useFetch<{ articles: articleType[] }>("/api/article");
  const {user} = useUserContext()

  return (
      <>
        <h2> salut {user?.nomComplet} Tous les articles:</h2>
        <ul className="bloglist">{ isLoading && <Loader/> }
          { error && <p>what the heck</p> }
          { data && data.articles.map(article => <BlogCard article={ article } key={ article._id }/>) }</ul>
      </>
  );
};