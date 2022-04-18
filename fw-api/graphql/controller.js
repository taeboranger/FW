const log = require('../components/logger.js').log
const err = require('../components/logger.js').err

const sequelize = require('sequelize')
const User = require('../models/index').User
const Item = require('../models/index').Item
const ItemImg = require('../models/index').ItemImg
const Sheet = require('../models/index').Sheet

// exports.getItem = async (args) => {

//     if (args.index) {
//         log(`getItem requested, index : ${args.index}`)
//         return await Item.findAll({
//             raw: true,
//             where: {
//                 index: args.index
//             }
//         })
//     }
//     else {
//         log("getItem requested, All")
//         return await Item.findAll({
//             raw: true
//         })
//     }

// }

// exports.getSheet = async (args, context) => {

//     if (args.index) {
//         log(`getSheet requested, index : ${args.index}`)
//         return await Sheet.findAll({
//             raw: true,
//             where: {
//                 index: args.index
//             }
//         })
//     }
//     else {
//         log("getSheet requested, All")
//         return await Sheet.findAll({
//             raw: true
//         })
//     }

// }

exports.setSheet = async (args, context) => {
    try {
        context.req.user.emails[0].value
    }
    catch (error) {
        err("No user info! : ")
        return null
    }
    return await User.findOne({
        attributes: ['index'],
        where: {
            email: context.req.user.emails[0].value
        }
    }).then(res => {
        email = context.req.user.emails[0].value
        console.log(res.index)
        if (res.index) {
            return Sheet.create({
                index: 0,
                userIndex: res.index,
                itemIndex: args.itemIndex,
                price: args.price,
                bonus: args.bonus,
                date: args.date,
                type: args.type
            }).then(res => {
                log(`setSheet created, index: ${res.index}`)
                return res.index
            }).catch(error => {
                err("Sheet creation error occured : " + error)
                return null
            })
        }
        else {
            err("No User info!")
            return { message: "login needed!" }
        }
    }).then(index => {
        return index
    }).catch(error => {
        err("User select error occured : " + error)
        return null
    })

}

exports.updSheet = async (args, context) => {
    try {
        context.req.user.emails[0].value
    }
    catch (error) {
        err("No user info!")
        return null
    }
    return await User.findOne({
        attributes: ['index'],
        where: {
            email: context.req.user.emails[0].value
        }
    }).then(res => {
        email = context.req.user.emails[0].value
        console.log(res.index)
        if (res.index) {
            userIndex = res.index
            Sheet.findOne({
                attributes: ['userIndex'],
                where: {
                    index: args.index
                }
            }).then(res => {
                if (res.userIndex != userIndex) {
                    err("No permission to upd! who tried : " + email)
                    return null
                }
                else {
                    return Sheet.update({
                        itemIndex: args.itemIndex,
                        price: args.price,
                        bonus: args.bonus,
                        date: args.date,
                        type: args.type
                    },
                        {
                            where: {
                                index: args.index
                            }
                        }).then(res => {
                            log(`Sheet updated, index: ${args.index}`)
                            return res[0]
                        }).catch(error => {
                            err("Sheet update error occured : " + error)
                            return null
                        })
                }
            })

        }
        else {
            err("No User info!")
            return { message: "login needed!" }
        }
    }).then(index => {
        return index
    }).catch(error => {
        err("User select error occured : " + error)
        return null
    })

}