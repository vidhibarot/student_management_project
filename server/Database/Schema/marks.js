const { Model } = require('sequelize');
const { STATUS } = require('../../config/constant');
module.exports = (sequelize, DataTypes) => {
    class marks extends Model {
        static associate(models) {
            marks.belongsTo(models.students, {
                foreignKey: "student_id",
                onDelete: 'cascade'
            });
        }
    }
    marks.init({
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
          subject: {
            allowNull: true,
            type: DataTypes.STRING(255),
          },
          marks_obtained: {
            allowNull: true,
            type: DataTypes.BIGINT(10),
          },
          total_marks: {
            allowNull: true,
            type: DataTypes.BIGINT(10),
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
        modelName: 'marks',
    })

    return marks
}