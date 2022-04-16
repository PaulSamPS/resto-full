const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.STRING(2048), unique: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, required: true },
  email: { type: DataTypes.STRING, unique: true, required: true },
  phone: { type: DataTypes.STRING, unique: true, required: true },
  password: { type: DataTypes.STRING, required: true },
  role: { type: DataTypes.STRING, defaultValue: 'USER', required: true },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  isAuthenticated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
  tokenAccessExp: { type: DataTypes.STRING },
  resetToken: { type: DataTypes.STRING },
  resetTokenExp: { type: DataTypes.DATE },
})

const Token = sequelize.define('token', {
  id: { type: DataTypes.STRING(2048), unique: true, primaryKey: true },
  userId: { type: DataTypes.STRING(2048) },
  refreshToken: { type: DataTypes.STRING(2048), ref: 'user' },
})

const Product = sequelize.define('product', {
  id: { type: DataTypes.STRING(2048), unique: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING(1000) },
  weight: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
})

const ProductInfo = sequelize.define(
  'product_info',
  {
    id: { type: DataTypes.STRING(2048), primaryKey: true, unique: true },
    name: { type: DataTypes.STRING },
    value: { type: DataTypes.STRING },
  },
  { timestamps: false }
)

const CategoryType = sequelize.define(
  'category_type',
  {
    id: { type: DataTypes.STRING, primaryKey: true, unique: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { timestamps: false }
)

const BasketProduct = sequelize.define('basket_product', {
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
})

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  comment: { type: DataTypes.STRING },
  prettyCreatedAt: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('createdAt').toLocaleString('ru-RU')
    },
  },
  prettyUpdatedAt: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('updatedAt').toLocaleString('ru-RU')
    },
  },
})

// позиции заказа, в одном заказе может быть несколько позиций (товаров)
const OrderItem = sequelize.define('order_item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
})

// связь заказа с позициями: в заказе может быть несколько позиций, но
// каждая позиция связана только с одним заказом
Order.hasMany(OrderItem, { as: 'items', onDelete: 'CASCADE' })
OrderItem.belongsTo(Order)

// связь заказа с пользователями: у пользователя может быть несколько заказов,
// но заказ может принадлежать только одному пользователю
User.hasMany(Order, { as: 'orders', onDelete: 'SET NULL' })
Order.belongsTo(User)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

Basket.belongsToMany(Product, { through: BasketProduct, onDelete: 'CASCADE' })
Product.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

CategoryType.hasMany(Product)
Product.belongsTo(CategoryType)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

User.hasOne(Basket)
Basket.belongsTo(User)

module.exports = {
  User,
  Token,
  Product,
  ProductInfo,
  CategoryType,
  BasketProduct,
  Basket,
  Order,
  OrderItem,
}
