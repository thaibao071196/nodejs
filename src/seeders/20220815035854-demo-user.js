"use strict";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "nguyen",
          lastName: "bao",
          email: "thaibao071196@gmail.com",
          password: await bcrypt.hashSync("helloae43", salt),
          address: "da nang",
          gender: 1,
          phoneNumber: "84787509651",
          positionId: "",
          image: "",
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
