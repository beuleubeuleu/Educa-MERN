import { FormEvent, useRef }   from "react";
import { useCategorieContext } from "../../../context/CategorieContext.tsx";
import "./NouvelArticle.css"
import ArticleService          from "../../../services/ArticleService.ts";

export const NouvelArticle = () => {
  const titreRef = useRef<HTMLInputElement>(null);
  const contenuRef = useRef<HTMLTextAreaElement>(null);
  const categorieRef = useRef<HTMLSelectElement>(null);
  const estBrouillonRef = useRef<HTMLInputElement>(null);

  const { catégories } = useCategorieContext()


  const handleSubmit = async(e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    try{
      const nouvelArticle = {
        titre: titreRef.current!.value,
        categorie: categorieRef.current!.value,
        contenu: contenuRef.current!.value,
        estBrouillon: estBrouillonRef.current!.checked,
      }
      await ArticleService.createArticle(nouvelArticle)
    } catch(error: any){
      console.log(error)
    }
  }

  return (
      <div className="nouvel-article__form">
        <h3 className="">Nouvel Article</h3>
        <form className="" onSubmit={ handleSubmit }>
          <div className="">
            <input className="" type="text" name="titre" placeholder="Titre" ref={ titreRef } required/>
            <label className="nouvel-article__form--categorie" htmlFor="categorie">Catégorie
              <select id="categorie" name="catégorie" ref={categorieRef} required>
                <option value="">Choisissez une catégorie</option>
                {catégories.map((catégorie)=> <option key={catégorie._id} value={catégorie._id}>{catégorie.titre}</option>)}
              </select>
            </label>
            <label className="nouvel-article__form--brouillon" htmlFor="estBrouillon">
              Brouillon
              <input className="" id="estBrouillon" type="checkbox"
                     name="estBrouillon" ref={ estBrouillonRef }/>
            </label>
            <div className="">
              <textarea
                  className=""
                  name="contenu"
                  placeholder="Votre article"
                  ref={ contenuRef }
                  required
              />
            </div>
            <button className="" type="submit">
              Créer
            </button>
          </div>
        </form>
      </div>
  );
};