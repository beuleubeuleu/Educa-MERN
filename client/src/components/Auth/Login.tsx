import React, { useRef, useState } from "react";
import "./Login.css";
import AuthService                 from "../../services/AuthService";
import { useNavigate }             from "react-router-dom";
import { useUserContext }          from "../../context/UserContext.tsx";

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const {checkUserData} = useUserContext()

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if ( emailRef.current && passwordRef.current ) {
        await AuthService.login(
            emailRef.current.value,
            passwordRef.current.value
        )
      }
      checkUserData()
      navigate("/accueil")

    } catch (error: any) {
      setErrorMsg(error.response.data.message)
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
      <div className="">
        <h3 className="">Login</h3>
        <form className="" onSubmit={ handleSubmit }>
          <div className="">
            <input className="" type="email" name="email" placeholder="Email" ref={ emailRef }/>
            <div className="">
              <input
                  className=""
                  type={ showPassword? "text": "password" }
                  name="password"
                  placeholder="Password"
                  ref={ passwordRef }
              />
              <label className="">
                <input className="" type="checkbox" onChange={ handleShowPassword }/>
                Afficher
              </label>
            </div>
            <button className="" type="submit">
              Connexion
            </button>
          </div>
        </form>
        <p>{ errorMsg }</p>
      </div>
  );
};