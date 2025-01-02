const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class departments extends Model {
        static associate(models) {
            departments.hasMany(models.students, {
                foreignKey: "department_id",
                onDelete: 'cascade'
            });
        }
    }
    departments.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        isDelete: {
            allowNull: false,
            type: DataTypes.TINYINT(1),
            defaultValue: STATUS.NOTDELETED,
            comment: "0 => not_deleted 1 => Deleted"
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
        modelName: 'departments',
    })

    return departments
}