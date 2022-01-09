module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Sheet', {
        index: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        userIndex : {
            type : DataTypes.INTEGER,
        },
        itemIndex : {
            type : DataTypes.INTEGER,
        },
        price : { //실구매가
            type : DataTypes.INTEGER,
        },
        bonus : { //특전판 유무
            type : DataTypes.INTEGER,
        },
        date : { //구매일
            type : DataTypes.STRING(200)
        },
        type : {
            type : DataTypes.STRING(200),
            allowNull : false
        }
    },
    {
        timestamps: true,
        freezeTableName: true,
        tableName: 'Sheet',
        unique: false
    })
}