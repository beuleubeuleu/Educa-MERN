import React, { useRef, useState } from "react";
import AuthService                 from "../../services/AuthService";
import { Link }                    from "react-router-dom";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const nomRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const prenomRef = useRef<HTMLInputElement>(null);
  const élèveRef = useRef<HTMLInputElement>(null);
  const professeurRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(professeurRef)

    try {
      await AuthService.register(
          nomRef.current!.value,
          prenomRef.current!.value,
          emailRef.current!.value,
          passwordRef.current!.value,
          professeurRef.current!.checked? professeurRef.current!.value: élèveRef.current!.value
      )
      setIsRegisterSuccess(true)
    } catch (error: any) {
      console.log(error)
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
      <div className="">
        <h3 className="">Inscription</h3>
        <form className="" onSubmit={ handleSubmit }>

          <div className="">
            <input className="" type="text" name="name" placeholder="Nom" required ref={ nomRef }/>
            <input className="" type="tel" name="phone" placeholder="Prénom" required ref={ prenomRef }/>

            <label htmlFor="role">Vous vous inscrivez en tant que:
              <input type="radio" id="eleve" name="role" value="élève"  ref={élèveRef} defaultChecked/>
              <label htmlFor="eleve">Élève</label>
              <input type="radio" id="professeur" name="role" value="professeur" ref={professeurRef} />
              <label htmlFor="professeur">Professeur</label>
            </label>
          </div>

          <div className="">
            <input className="" type="email" name="email" placeholder="Email" required ref={ emailRef }/>
            <input className="" type="password" name="password" placeholder="Mot de passe" required
                   ref={ passwordRef }/>
            <label className="">
              <input className="" type="checkbox" onChange={ handleShowPassword }/>
              Afficher
            </label>
          </div>

          <button className="" type="submit">Inscription</button>
        </form>
        <p>Déjà inscrit ? <span><Link to="/connexion">Connectez-vous!</Link></span></p>
      </div>
  );
};

export default Register;