import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

// (!) Деструктурирование пропов в самом компоненте, ведёт к непредсказуемому поведению при ответе от сервера
function Card(props) {
  // Деструктуризируем часть пропов для более короткой записи
  const {name, link, likes, owner} = props.card;

  // Контекст данных о пользователе
  const currentUser = useContext(CurrentUserContext);

  // Нахождение своих карточек
  const isOwn = owner._id === currentUser._id || owner === currentUser._id;
  // Наждение своих лайков
  const isLiked = likes.some(i => i._id === currentUser._id);
  // Активация кнопки лайка на неоценнённых карточках
  const cardLikeButtonClassName = (`elements__like-button ${isLiked && 'elements__like-button_active'}`);

  // Открытие картчоки
  function handleClick() {
    props.onCardClick(props.card)
  }

  // Установка лайка
  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  // Удаление карточки
  function handleDeleteClcick() {
    props.onTrashButton(props.card)
  }

  return (
    <li className="elements__item">
      <div className="elements__card">
        <button className="elements__img-button" onClick={handleClick}>
          <img className="elements__img" alt={name} src={link} />
        </button>
        { isOwn && <button className="elements__delete-btn" onClick={handleDeleteClcick}></button> }
        <div className="elements__text-container">
          <p className="elements__caption">{name}</p>
          <div className="elements__like-container">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <span className="elements__like-counter">{likes.length}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;