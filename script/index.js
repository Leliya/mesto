const popup = document.querySelectorAll(".popup");
const popupProfile = popup[0];
const popupAddPhoto = popup[1];
const popupPhoto = popup[2];
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelectorAll(".popup__close-button");
const formElement = document.querySelectorAll(".popup__container");
const nameInput = formElement[0].querySelector(".popup__input_type_name");
const activityInput = formElement[0].querySelector(".popup__input_type_activity");
const titleInput = formElement[1].querySelector(".popup__input_type_title");
const linkInput = formElement[1].querySelector(".popup__input_type_link");
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
  const cardsLike = cardsItem.querySelector(".cards__like");
  cardsName.textContent = item.name;
  cardsName.alt = item.name;
  cardsImage.src = item.link;
  cardsLike.addEventListener('click', function(evt){
    const eventTarget = evt.target;
    eventTarget.classList.toggle('cards__like_active')
  })
  cards.prepend(cardsItem);
});

function openPopupProfile() {
 nameInput.value = nameProfile.textContent;
activityInput.value = activityProfile.textContent;
popupProfile.classList.add("popup_opened");
}

function openPopupAddPhoto() {
  titleInput.value =  titleInput.ariaPlaceholder;
  linkInput.value =  linkInput.ariaPlaceholder;
 popupAddPhoto.classList.add("popup_opened");
 }

//function openPopup(event) {
//popup.parentElement.classList.add('popup_opened');
//}

function closePopupProfile() {
  popupProfile.classList.remove("popup_opened");
}

function closePopupAddPhoto() {
  popupAddPhoto.classList.remove("popup_opened");
}

function formSubmitProfileHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  closePopupProfile();
}

function formSubmitAddHandler(evt) {
  evt.preventDefault();
  const cardsItem = templateCards.content.cloneNode(true);
  const cardsImage = cardsItem.querySelector(".cards__image");
  const cardsName = cardsItem.querySelector(".cards__name");
  const cardsLike = cardsItem.querySelector(".cards__like");
  cardsName.textContent = titleInput.value;
  cardsImage.src = linkInput.value;
  cardsLike.addEventListener('click', function(evt){
    const eventTarget = evt.target;
    eventTarget.classList.toggle('cards__like_active')
  })
  cards.prepend(cardsItem);
  closePopupAddPhoto();
}

formElement[0].addEventListener("submit", formSubmitProfileHandler);
profileEditButton.addEventListener("click", openPopupProfile);
popupCloseButton[0].addEventListener("click", closePopupProfile);

profileAddButton.addEventListener("click", openPopupAddPhoto);
popupCloseButton[1].addEventListener("click", closePopupAddPhoto);
formElement[1].addEventListener("submit", formSubmitAddHandler);
//popupCloseButton.addEventListener('click', closePopup);

//function openPopup(event) {
// popup.parentElement.classList.add('popup_opened');
//}
