export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._activity = document.querySelector(data.activity);
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userActivity: this._activity.textContent,
    };
  }

  setUserInfo({ name, activity }) {
    this._name.textContent = name;
    this._activity.textContent = activity;
  }
}
