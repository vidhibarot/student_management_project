'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const teachers = [
      {
        user_id: 1,
        name: "Vidhi barot",
        username: "Vidhi",
        email: "vidhi@mailinator.com",
        address: "123 Main Street, Springfield",
        phone_no: 9876543210,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        name: "gopi",
        username: "Gopi",
        email: "gopi@mailinator.com",
        address: "456 Elm Street, Springfield",
        phone_no: 8765432109,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const teacherInsertedData = teachers.map(async (teacher) => {
      return queryInterface.bulkInsert('teachers', [teacher], {});
    });

    await Promise.all(teacherInsertedData);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('teachers', null, {});
  }
};
