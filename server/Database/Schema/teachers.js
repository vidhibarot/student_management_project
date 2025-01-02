const { Model } = require('sequelize');
const { STATUS } = require('../../Config/constant');

module.exports = (sequelize, DataTypes) => {
    class teachers extends Model {
        static associate(models) {
            teachers.belongsTo(models.users, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
        }
    }

    teachers.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        user_id: {
            allowNull: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'users', key: 'id' }
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        phone_no: {
            type: DataTypes.BIGINT(15),
            allowNull: false,
        },
        profile: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        isDelete: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.NOTDELETED,
            comment: "0 => not_deleted, 1 => Deleted"
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'teachers',
    });

    return teachers;
}
