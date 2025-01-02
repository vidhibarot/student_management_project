const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class fees extends Model {
        static associate(models) {
            fees.belongsTo(models.students, {
                foreignKey: "student_id",
                onDelete: 'cascade'
            });
        }
    }
    fees.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        student_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'students', key: 'id' }
        },
        amount: {
            allowNull: true,
            type: DataTypes.STRING(255),
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE,
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
        modelName: 'fees',
    })

    return fees
}