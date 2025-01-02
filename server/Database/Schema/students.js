const { Model } = require('sequelize');
const { ROLE_TYPES, STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
    class students extends Model {
        static associate(models) {
            students.belongsTo(models.users, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
            students.hasMany(models.fees, {
                foreignKey: "student_id",
                onDelete: 'cascade'
            });
            students.hasMany(models.marks, {
                foreignKey: "student_id",
                onDelete: 'cascade'
            });
            students.belongsTo(models.departments, {
                foreignKey: "department_id",
                onDelete: 'cascade'
            });
        }
    }

    students.init({
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
        roll_no: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mobile: {
            allowNull: false,
            type: DataTypes.BIGINT(10),
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        division: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
        department_id: {
            allowNull: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: { model: 'departments', key: 'id' }
        },
        num_subjects: {
            type: DataTypes.BIGINT(10),
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
        modelName: 'students',
    })

    return students
}