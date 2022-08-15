"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "nguyen",
          lastName: "bao",
          email: "thaibao071196@gmail.com",
          password: "123456",
          address: "da nang",
          gender: 1,
          typeRole: "ROLE",
          keyRole: "R1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
