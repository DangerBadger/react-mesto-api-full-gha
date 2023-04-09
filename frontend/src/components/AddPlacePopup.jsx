import { useEffect } from "react";
import useFormValidation from '../hooks/useFormValidation';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, buttonText }) {
  const {
    valuesObj, 
    errorMessageObj, 
    isValid, 
    handleChange, 
    resetValidation
  } = useFormValidation({name: '', link: ''})

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    if(isValid) {
      onAddPlace({
        name: valuesObj.name,
        link: valuesObj.link
      })
    }
  }

  useEffect(() => {
    if(!isOpen) {
      resetValidation();
    }
  }, [isOpen])

  return (
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
      isValid={isValid}
      title="Новое место" 
      formType="" 
      titleType=""
      buttonType="" 
      text={isLoading ? buttonText : "Создать"} 
      id="popupCard" 
      formName="card"
    >
      <fieldset className="popup__form-fieldset">
        <label className="popup__form-label">
          <input type="text" minLength="2" maxLength="30" required placeholder="Название" name="name"
            id="input-place" className={`popup__form-input ${!errorMessageObj.name ? '' : 'popup__form-input_type_error'}`} 
            value={valuesObj.name || ''} onChange={handleChange} />
          <span id="input-place-error" className="popup__form-input-error">{errorMessageObj.name}</span>
        </label>
        <label className="popup__form-label">
          <input type="url" required placeholder="Ссылка на картинку" name="link" id="input-link"
            className={`popup__form-input ${!errorMessageObj.link ? '' : 'popup__form-input_type_error'}`} 
            value={valuesObj.link || ''} onChange={handleChange} />
          <span id="input-link-error" className="popup__form-input-error">{errorMessageObj.link}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;