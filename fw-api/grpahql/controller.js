const log = require('../components/logger.js').log
const err = require('../components/logger.js').err

const sequelize = require('sequelize')
const Item = require('../models/index').Item
const ItemImg = require('../models/index').ItemImg
const Sheet = require('../models/index').Sheet

exports.getItem = async (args) => {

    if(args.index) {
        log("getItem requested, index : " + String(args.index))
        return await Item.findAll({
            raw: true,
            where: {
                index: args.index
            }
        })
    }
    else {
        log("getItem requested, All")
        return await Item.findAll({
            raw: true
        })
    }

}

exports.getSheet = async (args) => {

    if(args.index) {
        log("getSheet requested, index : " + String(args.index))
        return await Sheet.findAll({
            raw: true,
            where: {
                index: args.index
            }
        })
    }
    else {
        log("getSheet requested, All")
        return await Sheet.findAll({
            raw: true
        })
    }

}