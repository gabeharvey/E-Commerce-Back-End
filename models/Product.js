// Import Important Parts of Sequelize Library
const { Model, DataTypes } = require('sequelize');

// Import our Database Connection from config.js
const sequelize = require('../config/connection');

// Initialize Product Model (table) by Extending Off Sequelize's Model Class
class Product extends Model {}

// Set Up Fields and Rules for Product model
Product.init(
  {
    // These Define Product Columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isNumeric: true,
      },
    },

    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
