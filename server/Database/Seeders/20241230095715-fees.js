'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const fees = [
      {
        student_id: 1,
        amount: "9000",
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        student_id: 2,
        amount: "10000",
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const userInsertedData = fees.map(async (user) => {
      return queryInterface.bulkInsert('fees', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('fees', null, {});
  }
};
