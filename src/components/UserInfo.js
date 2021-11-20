export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector, _id }) {
    this.id = _id;
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this.id = _id;
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
    this._avatarElement.alt = `Аватар профиля ${name}`;
  }
}
