const popup = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelector(".popup__close-button");
const formElement = popup.querySelector(".popup__container");
const nameInput = formElement.querySelector(".popup__input_type_name");
const activityInput = formElement.querySelector(".popup__input_type_activity");
const nameProfile = document.querySelector(".profile__name");
const activityProfile = document.querySelector(".profile__activity");

const initialCards = [
  {
    name: "Самара",
    link: "https://images.unsplash.com/photo-1646580060894-10b1e2d9ac7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Санкт-Петербург",
    link: "https://images.unsplash.com/photo-1596014531797-b3f67a07a493?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Калининград",
    link: "https://images.pexels.com/photos/8321728/pexels-photo-8321728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Карелия",
    link: "https://images.pexels.com/photos/8632549/pexels-photo-8632549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },

  {
    name: "Алтай",
    link: "https://images.pexels.com/photos/7300311/pexels-photo-7300311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    name: "Байкал",
    link: "https://images.pexels.com/photos/8676972/pexels-photo-8676972.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
];

const templateCards = document.querySelector("#cards-item");
const cards = document.querySelector(".cards");

initialCards.forEach(function (item) {
  const cardsItem = templateCards.content.cloneNode(true);
  const cardsImage = cardsItem.querySelector(".cards__image");
  const cardsName = cardsItem.querySelector(".cards__name");
  cardsName.textContent = item.name;
  cardsName.alt = item.name;
  cardsImage.src = item.link;
  cards.prepend(cardsItem);
});

function openPopup() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;
  popup.classList.add("popup_opened");
}

//function openPopup(event) {
//popup.parentElement.classList.add('popup_opened');
//}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
profileEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);

//profileAddButton.addEventListener("click", openPopup);
//popupCloseButton.addEventListener('click', closePopup);

//function openPopup(event) {
// popup.parentElement.classList.add('popup_opened');
//}
