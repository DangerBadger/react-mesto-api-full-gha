import { useEffect } from "react";
import useFormValidation from "../hooks/useFormValidation";

function Login({ handleLogin, isSuccess, setIsSuccess }) {
  
  // Сброс стэйта после успешной регистрации, для того чтобы после неудачной попытки поля не очистились из-за truthy-значения
  useEffect(() => {
    setIsSuccess(false);
  }, []);

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
    if(isValid){
      handleLogin(valuesObj.password, valuesObj.email);
      if(isSuccess) {
        resetValidation();  // Теперь инпуты не будут сбрасываться после неудачной попытки
      }
    }
  } 

  return (
    <>
      <div className="auth__wrapper">
        <h1 className="auth__title">Вход</h1>
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
          <button className={`auth__button ${!isValid ? 'auth__button_inactive' : ''}`} disabled={!isValid}>
            Войти
          </button>
        </form>
      </div>
    </>
  )
}

export default Login;