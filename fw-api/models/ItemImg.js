module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ItemImg', {
        index: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        itemCode : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false
        },
        file_link : {
            type : DataTypes.STRING(500),
            primaryKey : true,
            allowNull : false
        },
        turn : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
        tableName: 'ItemImg',
        unique: false
    })
}