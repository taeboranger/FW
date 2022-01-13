const log = require('../components/logger.js').log
const err = require('../components/logger.js').err

const sequelize = require('sequelize')
const Item = require('../models/index').Item
const ItemImg = require('../models/index').ItemImg
const Sheet = require('../models/index').Sheet

exports.getItem = async (args) => {

    if(args.index) {
        log(`getItem requested, index : ${args.index}`)
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
        log(`getSheet requested, index : ${args.index}`)
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

exports.setSheet = async (args, context) => {

    console.log(context.req['method'])
    res = await Sheet.create({
        index: 0,
        userIndex: 0,
        itemIndex: args.itemIndex,
        price: args.price,
        bonus: args.bonus,
        date: args.date,
        type: args.type
    })
    log(`setSheet created, index: ${res.index}`)
    return res.index

}

exports.updSheet = async (args) => {

    res = await Sheet.update({
        itemIndex: args.itemIndex,
        price: args.price,
        bonus: args.bonus,
        date: args.date,
        type: args.type
    },
    {
        where: args.index
    })
    log(`setSheet updated, index: ${res.index}`)
    return res.index

}