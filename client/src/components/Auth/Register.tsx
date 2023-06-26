import React, { useRef, useState } from "react";
import AuthService                 from "../../services/AuthService";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const nomRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const prenomRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await AuthService.register(
          nomRef.current!.value,
          prenomRef.current!.value,
          emailRef.current!.value,
          passwordRef.current!.value,
          e.currentTarget.role!
      )
      setIsRegisterSuccess(true)
    } catch (error: any) {
      console.log(error)
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if ( isRegisterSuccess ) {
    return <>
      <iframe src="https://giphy.com/embed/111ebonMs90YLu" width="480" height="360"
              className="giphy-embeded" allowFullScreen></iframe>
      <p>
        <a href="https://giphy.com/gifs/thumbs-up-111ebonMs90YLu">via GIPHY</a>
      </p>
    </>
  }
  return (
      <div className="">
        <h3 className="">Registration</h3>
        <form className="" onSubmit={ handleSubmit }>

          <div className="">
            <input className="" type="text" name="name" placeholder="Nom" required ref={ nomRef }/>
            <input className="" type="tel" name="phone" placeholder="Prénom" required ref={ prenomRef }/>

            <label htmlFor="role">Vous vous inscrivez en tant que:
            <input type="radio" id="eleve" name="role" value="eleve" defaultChecked/>
            <label htmlFor="eleve">Élève</label>
            <input type="radio" id="professeur" name="role" value="professeur"/>
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

          <button className="" type="submit">Register</button>
        </form>
      </div>
  );
};

export default Register;