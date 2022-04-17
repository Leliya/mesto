const popup = document.querySelector(".popup");
const edit = document.querySelector(".profile__edit-button");
const popupClose = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__container");
const save = popup.querySelector(".popup__button");

edit.addEventListener("click", function () {
  popup.classList.add("popup_opened");
});

popupClose.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  const nameInput = formElement.querySelector(".popup__input_type_name");
  const activityInput = formElement.querySelector(
    ".popup__input_type_activity"
  );
  const nameProfile = document.querySelector(".profile__name");
  const activityProfile = document.querySelector(".profile__activity");

  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);