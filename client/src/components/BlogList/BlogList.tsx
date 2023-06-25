import { Loader }   from "../Loader/Loader.tsx";
import { BlogCard } from "../BlogCard/BlogCard.tsx";
import useFetch     from "../../hooks/useFetch.ts";
import { articleType } from "../../types/articleType.ts";
import "./BlogList.css"

export const BlogList = () => {
  const { data, error, isLoading } = useFetch<{ articles: articleType[] }>("/api/article");

  return (
      <>
        <h2>Tous les articles:</h2>
        <ul className="bloglist">{ isLoading && <Loader/> }
          { error && <p>what the heck</p> }
          { data && data.articles.map(article => <BlogCard article={ article } key={ article._id }/>) }</ul>
      </>
  );
};