export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._activity = document.querySelector(data.about);
    this._avatar = document.querySelector(data.avatar);
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userActivity: this._activity.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._activity.textContent = about;
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
