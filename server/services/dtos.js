module.exports = class UserDto {
  id
  email
  name
  role
  isActivated
  isAuthenticated

  constructor(model) {
    this.id = model.id
    this.name = model.name
    this.email = model.email
    this.role = model.role
    this.isActivated = model.isActivated
    this.isAuthenticated = model.isAuthenticated
  }
}
