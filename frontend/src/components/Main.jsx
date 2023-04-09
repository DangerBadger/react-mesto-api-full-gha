import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ 
  cards, 
  onEditProfile, 
  onAddPlace, 
  onEditAvatar, 
  onCardClick, 
  onCardLike, 
  onCardDelete,
  onTrashButton
  }) {
  
  // Контекст данных о пользователе
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="page-main">
      <main className="content">

        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar-container">
              <img src={currentUser.avatar} alt="Фотография профиля" className="profile__avatar" />
              <button className="profile__avatar-button" onClick={onEditAvatar}></button>
            </div>
            <div className="profile__text">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
              <p className="profile__job">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </section>

        <section aria-label="Интересные места" className="elements">
          <ul className="elements__list">
            {
              cards.map((card) => 
                <Card 
                  key={card._id} 
                  card={card}
                  onCardClick={onCardClick} 
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                  onTrashButton={onTrashButton}
                />)
            }
          </ul>
        </section>

      </main>
    </div>
  );
};

export default Main;