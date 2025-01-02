'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const students = [
      {
        user_id: 2,
        name: "Darshita",
        username: "Darshita",
        email: "darshita@mailinator.com",
        roll_no: 1,
        mobile: 9375582856,
        division: "A",
        department_id: 1,
        num_subjects: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        name: "Richa",
        username: "Richa",
        email: "richa@mailinator.com",
        roll_no: 2,
        mobile: 9375582856,
        division: "A",
        department_id: 2,
        num_subjects: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ];

    const userInsertedData = students.map(async (user) => {
      return queryInterface.bulkInsert('students', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('students', null, {});
  }
};
