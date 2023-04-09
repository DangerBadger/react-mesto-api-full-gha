import { useEffect } from 'react';
import { useRef } from 'react';
import useFormValidation from '../hooks/useFormValidation';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, buttonText }) {
  const {
    errorMessageObj, 
    isValid, 
    handleChange, 
    resetValidation
  } = useFormValidation({link: ''})

  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    if(isValid) {
      onUpdateAvatar({ avatar: avatarRef.current.value })
    }
  }

  useEffect(() => {
    if(!isOpen) {
      resetValidation();
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  return(
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
      isValid={isValid}
      title="Обновить аватар"
      formType="popup__form_type_avatar" 
      titleType="popup__form-header_type_avatar" 
      buttonType="popup__submit-btn_type_avatar"
      text={isLoading ? buttonText : "Сохранить"} 
      id="popupAvatar" 
      formName="avatar"
    >
      <fieldset className="popup__form-fieldset">
        <label className="popup__form-label">
          <input type="url" required placeholder="Ссылка на картинку" name="link" id="input-avatar-link"
            className={`popup__form-input ${!errorMessageObj.link ? '' : 'popup__form-input_type_error'}`} ref={avatarRef} onChange={handleChange} />
          <span id="input-avatar-link-error" className="popup__form-input-error">{errorMessageObj.link}</span>
        </label>
      </fieldset>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;