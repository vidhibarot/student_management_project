const { Model } = require('sequelize');
const { STATUS,  } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate(models) {
            users.belongsTo(models.roles, {
                foreignKey: "role_id",
                onDelete: 'cascade'
            })
            users.hasMany(models.students, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            users.hasMany(models.teachers, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
        }
    }
    users.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        role_id: {
            allowNull: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'roles', key: 'id' }
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            allowNull: true,
            type: DataTypes.STRING(255),
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
        modelName: 'users',
    })

    return users
}