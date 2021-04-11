function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      id={props.name}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        ></button>
        <div className="popup__auth-image"></div>
        <h3 className="popup__label">{props.title}</h3>

      </div>
    </div>
  );
}

export default InfoTooltip;
