import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import kusto from '../images/kusto.jpg';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {

  const navigate = useNavigate();

  // Стэйт текущего пользователя 
  const [currentUser, setCurrentUser] = useState({ name: 'Жак-Ив Кусто', avatar: kusto, about: 'Исследователь океана' });
  // Стэйт начального массива карточек
  const [cards, setCards] = useState([]);
  // Стэйт логина пользователя
  const [isLoggedIn, setIsloggedIn] = useState(false);
  // Стэйт удаляемой карточки
  const [deletedCard, setdeletedCard] = useState({ _id: '' });
  // Стэйт модалки профиля
  const [isEditAvatarOpened, setIsEditAvatarOpened] = useState(false);
  // Стэйт модалки ред. профиля
  const [isEditProfileOpened, setIsEditProfileOpened] = useState(false);
  // Стэйт модалки доб. места
  const [isAddPlaceOpened, setIsAddPlaceOpened] = useState(false);
  // Стэйт модалки удаления карточки
  const [isDeleteCardOpened, setIsDeleteCardOpened] = useState(false);
  // Стэйт модалки сообщения о авторизации
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  // Стэйт просматриваемой карточки
  const [selectedCard, setSelectedCard] = useState(null);
  // Стэйт Email пользователя
  const [userEmail, setUserEmail] = useState('');
  // Стэйт загрузки
  const [isLoading, setIsLoading] = useState(false);
  // Стэйт успешной авторизации
  const [isSuccess, setIsSuccess] = useState(false);

  // Есть ли открытый попап для навешивания слушателя?
  const isPopupOpened = isEditAvatarOpened ||
    isEditProfileOpened ||
    isAddPlaceOpened ||
    isDeleteCardOpened ||
    selectedCard ||
    isInfoTooltipOpened;

  // Изменение стейта логина
  const enableLogin = () => {
    setIsloggedIn(true);
  }

  // Выход
  const logout = () => {
    localStorage.removeItem('jwt');
    auth.logout();
    setIsloggedIn(false);
    setUserEmail('');
  }

  // Закрытие модалки по esc
  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isPopupOpened) {
      document.addEventListener('keydown', closeByEsc);
    }

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    }
  }, [isPopupOpened])

  // Открытия карточки
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  // Открытие изменения аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarOpened(true);
  }

  // Открытие редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfileOpened(true);
  }

  // Открытие добавления места
  const handleAddPlaceClick = () => {
    setIsAddPlaceOpened(true);
  }

  // Обработка нажатия на кнопку удаления
  const handleTrashCardClick = (card) => {
    setdeletedCard(card);
    setIsDeleteCardOpened(true);
  }

  // Закрытие всех модалок
  const closeAllPopups = () => {
    setIsEditAvatarOpened(false);
    setIsEditProfileOpened(false);
    setIsAddPlaceOpened(false);
    setIsDeleteCardOpened(false);
    setIsInfoTooltipOpened(false);
    setSelectedCard(null);
  }

  // Запрос на добавление/удаление лайка
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((prevState) =>
          prevState.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch(err => console.warn(err));
  }

  // Удаление карточки
  const handleCardDelete = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    api.deleteCard(deletedCard._id)
      .then(() => {
        setCards((prevState) =>
          prevState.filter(c => c._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch(err => console.warn(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Изменение данных пользователя
  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);
    api.setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.warn(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Изменение аватара
  const handleUpdateAvatar = (userInfo) => {
    setIsLoading(true);
    api.setUserAvatar(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.warn(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Добавление карточки
  const handleAddPlaceSubmit = (newCard) => {
    setIsLoading(true);
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.warn(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Запрос на регистрацию
  const handleRegistration = (password, email) => {
    auth.register(password, email)
    .then(() => {
      setIsSuccess(true);
      setIsInfoTooltipOpened(true);
    })
    .catch((err) => {
      console.warn(err);
      setIsSuccess(false);
      setIsInfoTooltipOpened(true);
    });
  }

  // Запрос на авторизацию
  const handleLogin = (password, email) => {
    auth.authorize(password, email)
      .then((data) => {
        if(data._id) {
          localStorage.setItem('jwt', data._id);
          enableLogin();
          setUserEmail(email);
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        console.warn(err);
        setIsSuccess(false);
        setIsInfoTooltipOpened(true);
      });
  } 

  // Проверка токена
  const tokenCheck = () => {
    const token = localStorage.getItem('jwt');

    if(token) {
      auth.checkToken()
      .then((res) => {
        if(res) {
          enableLogin();
          setUserEmail(res.email);
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.warn(err));
    }
  }

   // Проверка токена при монтировании
   useEffect(() => {
    tokenCheck();
  }, [])

   // Запрос информации о пользователе и начального массива картчочек
   useEffect(() => {

    if(isLoggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo(currentUser)])
      .then(([cardsArray, userData]) => {
        setCards(cardsArray);
        setCurrentUser(userData);
      })
      .catch(err => {
        console.warn(err)
      })
    }
  }, [isLoggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="App">
        <Header logout={logout} isLoggedIn={isLoggedIn} userEmail={userEmail}/>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onTrashButton={handleTrashCardClick}
            />}
          />

          <Route path="/sign-up" element={
            <Register
              isSuccess={isSuccess}
              handleRegistration={handleRegistration}
            />} 
          />

          <Route path="/sign-in" element={
            <Login
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
              handleLogin={handleLogin}
            />} 
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfileOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          buttonText={'Сохранение...'}
        />

        <AddPlacePopup
          isOpen={isAddPlaceOpened}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          buttonText={'Создание...'}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          buttonText={'Сохранение...'}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardOpened}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
          buttonText={'Удаление...'}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip isSuccess={isSuccess} onClose={closeAllPopups} isOpen={isInfoTooltipOpened} />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;