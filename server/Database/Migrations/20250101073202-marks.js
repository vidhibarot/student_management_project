'use strict';

const { STATUS } = require("../../config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('marks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      student_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'students', key: 'id' }
      },
      subject: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      marks_obtained: {
        allowNull: true,
        type: Sequelize.BIGINT(10),
      },
      total_marks: {
        allowNull: true,
        type: Sequelize.BIGINT(10),
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
    await queryInterface.dropTable('marks');
  }
};