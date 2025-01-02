// 'use strict';

// module.exports = {
//     async up(queryInterface, Sequelize) {
//         const users = [
//             {
//                 role_id: 1,
//                 username: "Vidhi",
//                 password: "$2b$10$fAz5kUgJaeHcG6qXE0wkuOe4MJeOnH4Ybrfo9W7BvzyuQKYCZtO.C", //123123 
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//             },
//             {
//                 role_id: 2,
//                 username: "Darshita",
//                 password: "$2b$10$i4s2vGv3diL/Lx8.73scaOZeJNfV8fwsSOPTVi38sBECL.m5qdQ4y", //123123
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//             },
//             {
//                 role_id: 2,
//                 username: "Richa",
//                 password: "$2b$10$fAz5kUgJaeHcG6qXE0wkuOe4MJeOnH4Ybrfo9W7BvzyuQKYCZtO.C", //123123 
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//             },
//             {
//                 role_id: 1,
//                 username: "Gopi",
//                 password: "$2b$10$fAz5kUgJaeHcG6qXE0wkuOe4MJeOnH4Ybrfo9W7BvzyuQKYCZtO.C", //123123 
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//             },

//         ];

//         const userInsertedData = users.map(async (user) => {
//             return queryInterface.bulkInsert('users', [user], {});
//         });

//         await Promise.all(userInsertedData);

//     },

//     async down(queryInterface, Sequelize) {
//         return await queryInterface.bulkDelete('users', null, {});
//     }
// };

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Define the user data
    const users = [
      {
        role_id: 1,
        username: "Vidhi",
        password: "$2b$10$fAz5kUgJaeHcG6qXE0wkuOe4MJeOnH4Ybrfo9W7BvzyuQKYCZtO.C", //hashed version of "123123"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 2,
        username: "Darshita",
        password: "$2b$10$i4s2vGv3diL/Lx8.73scaOZeJNfV8fwsSOPTVi38sBECL.m5qdQ4y", //hashed version of "123123"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 2,
        username: "Richa",
        password: "$2b$10$fAz5kUgJaeHcG6qXE0wkuOe4MJeOnH4Ybrfo9W7BvzyuQKYCZtO.C", //hashed version of "123123"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 1,
        username: "Gopi",
        password: "$2b$10$fAz5kUgJaeHcG6qXE0wkuOe4MJeOnH4Ybrfo9W7BvzyuQKYCZtO.C", //hashed version of "123123"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Perform a single bulk insert with the entire array of users
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    // Delete all the seeded users if needed
    return await queryInterface.bulkDelete('users', null, {});
  }
};
