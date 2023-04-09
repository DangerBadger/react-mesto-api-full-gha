import { useLocation, useNavigate } from 'react-router-dom';
import success from '../images/success.png';
import denied from '../images/denied.png';

function InfoTooltip({ isSuccess, onClose, isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  function closePopup() {
    if(isSuccess) {
      onClose();
      if(location.pathname === '/sign-up') {
        navigate('/sign-in', {replace: true}); // В таком случае редирект произойдёт только после закрытия модалки
      }
    } else {
      onClose();
    }
  }

  return(
    <div className={`popup ${isOpen && "popup_opened"}`} onMouseDown={(e) => {
      if (e.currentTarget === e.target) {
        closePopup();
      }
    }}>
      <div className="popup__form">
        <button type="button" className="close-btn" onClick={closePopup}></button>
        <img 
          src={isSuccess ? success : denied} 
          alt={isSuccess ? "Вы успешно авторизировались!" : "Что-то рошло не так!"} 
          className="tooltip__img" 
        />
        <p className="tooltip__text">
            {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;