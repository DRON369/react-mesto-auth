import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  return (
    <div className="authPage authPage_type_register">
      <div className="authPage__container">
        <h3 className="authPage__title">Регистрация</h3>
        <form
          className="authPage__form"
          method="POST"
          name="register"
          onSubmit={props.onSubmit}
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
            onChange={"" /* handleChangeCardName */}
            value={"" /* cardName */ || ""}
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
            onChange={"" /* handleChangeCardLink */}
            value={"" /* cardLink */ || ""}
          />
          <span className="error" id="password-error"></span>

          <button className="authPage__submit-button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in">Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  );
}

export default Register;
