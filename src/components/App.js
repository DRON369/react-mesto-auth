import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { useEffect, useState } from "react";
import { UserContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch, Redirect, useHistory  } from "react-router-dom";

function App() {

//!==============================================
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const [loggedIn, setLoggedIn] = useState({
    loggedIn: false,
  });

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn])

  function handleLogin({email, password}) {

  }
//!==============================================

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }, []);



  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleAddPlaceSubmit(newCard) {
    api
      .createCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
  }

  function handleUpdateUser(user) {
    api
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  const [cards, setCards] = useState([]);

  const cardsHandler = () => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  };

  useEffect(() => {
    cardsHandler();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((delCard) => {
        setCards((state) =>
          state.filter((currentCard) =>
            currentCard._id === card._id ? delCard._id : currentCard
          )
        );
      })
      .catch((err) =>
        console.log(`При загрузке данных возникла ошибка: ${err.status}`)
      );
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header />

            <Switch>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />

              <Route path="/sign-in">
                <Login onLogin={handleLogin} />
              </Route>

              <Route path="/sign-up">
                <Register />
              </Route>

              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            ></AddPlacePopup>

            {selectedCard ? (
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
