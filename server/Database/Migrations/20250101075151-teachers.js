'use strict';

const { STATUS } = require("../../config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("teachers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      user_id: {
        allowNull: true,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'users', key: 'id' }
    },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      phone_no: {
        type: Sequelize.BIGINT(15),
        allowNull: false,
      },
      profile: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      isDelete: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.NOTDELETED,
        comment: "0 => not_deleted, 1 => Deleted"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teachers');
  }
};