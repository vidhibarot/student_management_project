'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const marks = [
      {
        student_id: 1,
        subject: "DCA",
        marks_obtained: 45,
        total_marks: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        student_id: 1,
        subject: "c++",
        marks_obtained: 43,
        total_marks: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        student_id: 1,
        subject: "DBMS",
        marks_obtained: 32,
        total_marks: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        student_id: 2,
        subject: "DCA",
        marks_obtained: 41,
        total_marks: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        student_id: 2,
        subject: "c++",
        marks_obtained: 23,
        total_marks: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        student_id: 2,
        subject: "DBMS",
        marks_obtained: 32,
        total_marks: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ];

    const userInsertedData = marks.map(async (user) => {
      return queryInterface.bulkInsert('marks', [user], {});
    });

    await Promise.all(userInsertedData);

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('marks', null, {});
  }
};
