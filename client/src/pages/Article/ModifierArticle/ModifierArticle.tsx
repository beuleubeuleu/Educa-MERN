import { FormEvent, useEffect, useRef, useState } from "react";
import { useCategorieContext }                    from "../../../context/CategorieContext.tsx";
import ArticleService                             from "../../../services/ArticleService.ts";
import { useNavigate, useParams }                 from "react-router-dom";
import { articleType }                            from "../../../types/articleType.ts";
import { Loader }                                 from "../../../components/Loader/Loader.tsx";

export const ModifierArticle = () => {

  const [data, setData] = useState<articleType>();
  const { idArticle } = useParams()
  const navigate = useNavigate()

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleDelete = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleConfirmDelete = () => {
    // Perform the deletion logic
    // ...

    // Hide the delete dialog
    handleCloseDialog();
  };


  const titreRef = useRef<HTMLInputElement>(null);
  const contenuRef = useRef<HTMLTextAreaElement>(null);
  const categorieRef = useRef<HTMLSelectElement>(null);
  const estBrouillonRef = useRef<HTMLInputElement>(null);

  const { catégories } = useCategorieContext()

  const getData = async () => setData(await ArticleService.getOneById(idArticle!))
  useEffect(() => {
    getData()
  }, [idArticle]);

  if (!idArticle) return null
  if(!data) return <Loader/>

  console.log(data)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const ArticleModifié = {
        titre: titreRef.current!.value,
        categorie: categorieRef.current!.value,
        contenu: contenuRef.current!.value,
        estBrouillon: estBrouillonRef.current!.checked
      }
      console.log(data._id)
      await ArticleService.updateArticle(ArticleModifié, data._id)
      navigate("/article/mes-articles")
    } catch (error: any) {
      console.log(error)
    }
  }


  return (
      <div className="nouvel-article__form">
        <h3 className="">Modifier l'article</h3>
        <form className="" onSubmit={ handleSubmit }>
          <div className="">
            <input className="" type="text" name="titre" placeholder="Titre" ref={ titreRef } defaultValue={data.titre} required/>
            <label className="nouvel-article__form--categorie" htmlFor="categorie">Catégorie
              <select id="categorie" name="catégorie" ref={ categorieRef } defaultValue={data.categorie._id} required>
                <option value="">Choisissez une catégorie</option>
                { catégories.map((catégorie) => <option key={ catégorie._id }
                                                        value={ catégorie._id }>{ catégorie.titre }</option>) }
              </select>
            </label>
            <label className="nouvel-article__form--brouillon" htmlFor="estBrouillon">
              Brouillon
              <input className="" id="estBrouillon" type="checkbox"
                     name="estBrouillon" ref={ estBrouillonRef } defaultChecked={data.estBrouillon}/>
            </label>
            <div className="">
              <textarea
                  className=""
                  name="contenu"
                  placeholder="Votre article"
                  ref={ contenuRef }
                  defaultValue={data.contenu}
                  required
              />
            </div>
            <button className="modifier-article__form--supprimer" type="button" onClick={handleDelete}>
              Supprimer
            </button>
            <button className="" type="submit">
              Mettre à jour
            </button>
          </div>
        </form>
        <dialog className="modifier-article__form--delete-modal" ref={dialogRef}>
          <div className="modal-container"><h2>Supprimer l'article</h2>
            <p>êtes vous sur de vouloir supprimer l'article? <br/> après confirmation la récupération de celui-ci sera
               impossible.</p>
            <div>
              <button onClick={ handleCloseDialog }>Annuler</button>
              <button className="modifier-article__form--supprimer" onClick={ handleConfirmDelete }>Supprimer</button>
            </div>
          </div>
        </dialog>
      </div>
  );
};