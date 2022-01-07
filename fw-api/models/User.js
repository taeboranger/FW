module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        index: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        userId : {
            type : DataTypes.STRING(200),
            primaryKey : true,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING(200),
            primaryKey : true,
            allowNull : false
        },
        total_c : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        total_p : {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: true,
        freezeTableName: true,
        tableName: 'User',
        unique: false
    })
}