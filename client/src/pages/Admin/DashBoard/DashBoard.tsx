import { useEffect, useState } from "react";
import AdminService            from "../../../services/AdminService.ts";
import { formatDateWithWords } from "../../../ts/utils.tsx";
import { Loader }              from "../../../components/Loader/Loader.tsx";
import "./Dashboard.css"

export const DashBoard = () => {
  const [eleveCount, setEleveCount] = useState<number>();
  const [profCount, setProfCount] = useState<number>();
  const [userCount, setUserCount] = useState<number>();
  const [articleCount, setArticleCount] = useState<{ count: number, publicCount: number }>();

  const getEleveCount = async () => setEleveCount(await AdminService.getEleveCount())
  const getProfCount = async () => setProfCount(await AdminService.getProfCount())
  const getUserCount = async () => setUserCount(await AdminService.getUserCount())
  const getArticleCount = async () => setArticleCount(await AdminService.getArticleCount())

  useEffect(() => {
    getEleveCount()
    getProfCount()
    getUserCount()
    getArticleCount()
  }, []);

  const isReady = eleveCount && profCount && userCount && articleCount
  const ajd = new Date();

  return (
      <section className="admin-info__container">
        <div className="admin-info__titre">
          <p className="admin-info__titre--p">Bon retour!</p>
          <p className="admin-info__titre--p">Nous sommes le <span
              className="admin-info__date">{ formatDateWithWords(ajd) }</span></p>
          <p className="admin-info__titre--p">Voici un rapport de l'état de santé du site</p>
        </div>
        { isReady &&
            <ul className="admin-info__info-grid">
              <li className="admin-info__info-item">Nombre d'élèves:
                <span className="admin-info__info-item--data">{ eleveCount? eleveCount: <Loader/> }</span></li>

              <li className="admin-info__info-item">Nombre de professeurs:
                <span className="admin-info__info-item--data">{ profCount? profCount: <Loader/> }</span></li>

              <li className="admin-info__info-item">Nombre d'articles publiés:
                <span className="admin-info__info-item--data">{ articleCount? articleCount.publicCount: <Loader/> }</span></li>

              <li className="admin-info__info-item">Nombre total d'articles (avec brouillon):
                <span className="admin-info__info-item--data">{ articleCount? articleCount.count: <Loader/> }</span></li>

              <li className="admin-info__info-item">Nombre total d'utilisateurs:
                <span className="admin-info__info-item--data">{ userCount? userCount: <Loader/> }</span></li>
            </ul> }
      </section>
  );
};