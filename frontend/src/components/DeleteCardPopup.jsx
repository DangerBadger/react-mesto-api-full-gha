import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onSubmit, isLoading, buttonText }) {
  return(
    <PopupWithForm 
      onSubmit={onSubmit} 
      isOpen={isOpen} 
      onClose={onClose}
      isValid={true} 
      title="Вы уверены?" 
      formType="popup__form_type_confirm" 
      titleType="popup__form-header_type_confirm"
      buttonType="popup__submit-btn_type_confirm" 
      text={isLoading ? buttonText : "Да"} 
      id="popupDeleteConfirm" 
      formName="confirmation" 
    />
  )
}

export default DeleteCardPopup;