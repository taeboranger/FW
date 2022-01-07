module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Item', {
        index: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(2000)
        },
        number : {
            type : DataTypes.STRING(200)
        },
        price : {
            type : DataTypes.INTEGER
        },
        series : {
            type : DataTypes.STRING(200)
        },
        category : {
            type : DataTypes.STRING(200)
        },
        bonus : {
            type : DataTypes.INTEGER
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
        tableName: 'Item',
        unique: false
    })
}