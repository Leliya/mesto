const popup = document.querySelector(".popup");
const edit = document.querySelector(".profile__edit-button");

edit.addEventListener("click", function () {
  popup.classList.add("popup_opened");
});

const popupClose = popup.querySelector(".popup__close");

popupClose.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

console.log(popup.classList.contains("popup_opened"));
