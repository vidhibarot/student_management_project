
'use strict';

const { STATUS} = require("../../config/constant");

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20).UNSIGNED
            },
            role_id: {
                allowNull: true,
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: { model: 'roles', key: 'id' }
            },
            username: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            isDelete: {
                allowNull: false,
                type: Sequelize.TINYINT(1),
                defaultValue: STATUS.NOTDELETED,
                comment: "0 => not_deleted, 1 => Deleted"
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

        await queryInterface.dropTable('users');
    }
};