function PopupWithForm({
  name,
  isOpen,
  id,
  onClose,
  onSubmit,
  isValid,
  formType,
  formName,
  titleType,
  title,
  children,
  buttonType,
  text
}) {

  return (
    <div className={`popup  popup_type_${name} ${isOpen && "popup_opened"}`} id={id} onMouseDown={(e) => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    }}>
      <form className={`popup__form ${formType}`} name={formName} onSubmit={onSubmit} noValidate>
        <div className="popup__form-container">
          <button type="button" className="close-btn" onClick={onClose}></button>
          <h2 className={`popup__form-header ${titleType}`}>{title}</h2>
          {children}
          <button 
            disabled={!isValid} 
            type="submit" 
            className={`popup__submit-btn ${buttonType} ${!isValid ? 'popup__submit-btn_inactive' : ''}`} 
          >
            {text}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PopupWithForm;