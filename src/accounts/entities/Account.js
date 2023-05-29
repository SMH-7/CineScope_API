export default class {
    constructor(id = undefined, email, password, favourites = [], watchList = []) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.favourites = favourites;
      this.watchList = watchList;
    }
  }
