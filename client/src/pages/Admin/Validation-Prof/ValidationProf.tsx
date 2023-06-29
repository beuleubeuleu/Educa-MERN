import { useEffect, useState } from "react";
import { utilisateurType }     from "../../../types/utilisateurType.ts";
import AdminService            from "../../../services/AdminService.ts";
import { Loader }              from "../../../components/Loader/Loader.tsx";
import "./ValidationProf.css"

export const ValidationProf = () => {
  const [pendingProfs, setPendingProfs] = useState<utilisateurType[]>([]);
  const getPendingProfs = async () => setPendingProfs(await AdminService.getPendingProfs())

  useEffect(() => {
    getPendingProfs()
  }, []);

  async function handleValidateProf(id: string) {
    await AdminService.validateProf(id);
    getPendingProfs()
  }

  return (
      <main className="admin-validation__container">
        <div className="admin-info__titre">
          <p className="admin-info__titre--p">Bon retour!</p>
          <p className="admin-info__titre--p">Nombre de professeurs en attente de
                                              validation: { pendingProfs.length }</p>
        </div>
        <div className="admin-validation__table-container">
          <table className="admin-validation__prof-table">
            <thead>
            <tr>
              <th>Email</th>
              <th>Nom Complet</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            { !pendingProfs? (
                <tr>
                  <td colSpan={ 4 }><Loader/></td>
                </tr>
            ): (
                  pendingProfs.map((prof) => (
                      <tr key={ prof._id }>
                        <td>{ prof.email }</td>
                        <td>{ prof.nomComplet }</td>
                        <td>{ prof.statut }</td>
                        <td>
                          <button onClick={ () => handleValidateProf(prof._id) }>
                            Valider
                          </button>
                        </td>
                      </tr>
                  ))
              ) }
            </tbody>
          </table>
        </div>
      </main>
  );
};