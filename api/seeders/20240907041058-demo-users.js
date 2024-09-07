import { Sequelize, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          permalink: "user1",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          password: "hashedPassword1",
          enabled: true,
          deleted: false,
        },
        {
          permalink: "user2",
          name: "Jane Doe",
          email: "jane.doe@example.com",
          phone: "0987654321",
          password: "hashedPassword2",
          enabled: true,
          deleted: false,
        },
        {
          permalink: "user3",
          name: "Alice Smith",
          email: "alice.smith@example.com",
          phone: "1122334455",
          password: "hashedPassword3",
          enabled: true,
          deleted: false,
        },
        {
          permalink: "user4",
          name: "Bob Johnson",
          email: "bob.johnson@example.com",
          phone: "2233445566",
          password: "hashedPassword4",
          enabled: true,
          deleted: false,
        },
        {
          permalink: "user5",
          name: "Charlie Brown",
          email: "charlie.brown@example.com",
          phone: "3344556677",
          password: "hashedPassword5",
          enabled: true,
          deleted: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
