'use strict';

const { DEAPRTMENT_TYPES, STATUS } = require("../../config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {

    let DepartmentList = [];
    let count = 0;
    Object.keys(DEAPRTMENT_TYPES).forEach(index => {
      count = (count + 1);
      DepartmentList.push({
        id: count,
        name: DEAPRTMENT_TYPES[index],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    });
    await queryInterface.bulkInsert('departments', DepartmentList, {});
  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.bulkDelete('departments', null, {});
  }
};
