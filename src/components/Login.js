import { useState, useEffect } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emailHandler(event) {
    setEmail(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin({email, password});

  }

  return (
    <div className={`authPage authPage_type_login`}>
      <div className="authPage__container">
        <h3 className="authPage__title">Войти</h3>
        <form
          className="authPage__form"
          method="POST"
          name="login"
          onSubmit={handleSubmit}
        >
          <input
            className="authPage__input"
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            required
            onChange={emailHandler}
            value={email || ""}
          />
          <span id="email-error" className="error"></span>

          <input
            className="authPage__input"
            id="password"
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Пароль"
            required
            onChange={passwordHandler}
            value={password || ""}
          />
          <span className="error" id="password-error"></span>

          <button className="authPage__submit-button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
