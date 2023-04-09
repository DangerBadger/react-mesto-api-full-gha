function ImagePopup({ onClose, card }) {
  return (
    <div className={`popup popup_dark ${card !== null && "popup_opened"}`} id="popupImage" onClick={(e) => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    }}>
      <div className="popup__img-container">
        <button type="button" className="close-btn" onClick={onClose}></button>
        <figure className="popup__figure">
          <img src={card?.link} alt={card?.name}
            className="popup__figure-image" />
          <figcaption className="popup__figure-caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;