const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Group = sequelize.define("group", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  GroupName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

module.exports = Group;
