const Sequelize = require('sequelize')
const config = require("../configs/config.json")
var db = {}

db_config = config.development
var sequelize = new Sequelize(
    db_config.database,
    db_config.username, 
    db_config.password, 
    db_config
); 


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize)
db.Sheet = require('./Sheet')(sequelize, Sequelize)
db.Item = require('./Item')(sequelize, Sequelize)
db.ItemImg = require('./ItemImg')(sequelize, Sequelize)

module.exports = db;
