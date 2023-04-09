import { useEffect } from "react";
import { Link } from 'react-router-dom';
import useFormValidation from "../hooks/useFormValidation";

function Register({ handleRegistration, isSuccess }) {

  const {
    valuesObj, 
    errorMessageObj, 
    isValid, 
    handleChange, 
    resetValidation
  } = useFormValidation({email: '', password: ''})

  useEffect(() => {
    resetValidation();
  }, [])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(isValid) {
      handleRegistration(valuesObj.password, valuesObj.email);
      if(isSuccess) {
        resetValidation();  // Теперь инпуты не будут сбрасываться после неудачной попытки
      }
    }
  }

  return (
    <>
      <div className="auth__wrapper">
        <h1 className="auth__title">Регистрация</h1>
        <form className="auth__form" onSubmit={handleSubmit} >
          <fieldset className="auth__fieldset">
            <label className="popup__form-label">
              <input 
                className="auth__input"
                type="email" 
                name="email" 
                placeholder="Email" 
                value={valuesObj.email || ''} 
                onChange={handleChange}
                autoComplete="on"
                required 
              />
              <span className="popup__form-input-error">{errorMessageObj.email}</span>
            </label>
            <label className="popup__form-label">
              <input 
                className="auth__input"
                type="password"
                name="password" 
                placeholder="Пароль" 
                value={valuesObj.password || ''} 
                onChange={handleChange}
                autoComplete="on"
                required 
              />
              <span className="popup__form-input-error">{errorMessageObj.password}</span>
            </label>
          </fieldset>
          <button className={`auth__button ${!isValid ? 'auth__button_inactive' : ''}`} disabled={!isValid}>Зарегистрироваться</button>
        </form>
        <p className="auth__text">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
      </div>
    </>
  )
}

export default Register;