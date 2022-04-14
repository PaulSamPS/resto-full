module.exports = class UserDto {
  email
  name
  id
  isActivated
  isAuthenticated

  constructor(model) {
    this.email = model.email
    this.name = model.name
    this.id = model.id
    this.isActivated = model.isActivated
    this.isAuthenticated = model.isAuthenticated
  }
}