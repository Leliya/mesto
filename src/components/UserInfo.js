export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._activity = document.querySelector(data.activity);
  }

  getUserInfo() {
    this._user = {};
    this._user.name = this._name.textContent;
    this._user.activity = this._activity.textContent;
    return this._user;
  }

  setUserInfo({ name, activity }) {
    this._name.textContent = name;
    this._activity.textContent = activity;
  }
}
