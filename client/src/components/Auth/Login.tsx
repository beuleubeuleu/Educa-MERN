import React, { useRef, useState } from "react";
import "./Login.css";
import AuthService from "../../services/AuthService";

export const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (emailRef.current && passwordRef.current) {
        const response = await AuthService.login(
            emailRef.current.value,
            passwordRef.current.value
        )
      console.log(response.data)
      }

    } catch (error:any) {
      console.log(error.response)
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
      </div>
  );
};