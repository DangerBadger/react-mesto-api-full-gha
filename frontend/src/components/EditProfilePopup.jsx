import { useContext, useEffect } from "react";
import useFormValidation from '../hooks/useFormValidation';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, buttonText }) {

  const {
    valuesObj, 
    setValueObj, 
    errorMessageObj, 
    isValid, 
    handleChange, 
    resetValidation
  } = useFormValidation({name: '', about: ''})

  // Контекст пользователя
  const currentUser = useContext(CurrentUserContext);
  // Деструктуризация объекта контекста пользователя для удобства подстановки
  const {name, about} = currentUser;

  // Сабмит формы
  function handleSubmit(evt) {
    evt.preventDefault();

    if (isValid) {
      onUpdateUser({
        name: valuesObj.name, 
        about: valuesObj.about
      });
    }
  }

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setValueObj({
        name,
        about
      });
    }
    if (!isOpen) {
      resetValidation();
    }
  }, [isOpen, currentUser])

  return(
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
      isValid={isValid} 
      title="Редактировать профиль" 
      formType=""
      titleType="" 
      buttonType="" 
      text={isLoading ? buttonText : "Сохранить"} 
      id="popupProfile" 
      formName="profile"
    >
          <fieldset className="popup__form-fieldset">
            <label className="popup__form-label">
              <input type="text" minLength="2" maxLength="40" required placeholder="Введите имя" name="name"
                id="input-name" className={`popup__form-input ${!errorMessageObj.name ? '' : 'popup__form-input_type_error'}`} 
                onChange={handleChange} value={valuesObj.name || ''} 
              />
              <span id="input-name-error" className="popup__form-input-error">{errorMessageObj.name}</span>
            </label>
            <label className="popup__form-label">
              <input type="text" minLength="2" maxLength="200" required placeholder="Укажите профессию" name="about"
                id="input-job" className={`popup__form-input ${!errorMessageObj.about ? '' : 'popup__form-input_type_error'}`} onChange={handleChange} value={valuesObj.about || ''} />
              <span id="input-job-error" className="popup__form-input-error">{errorMessageObj.about}</span>
            </label>
          </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;