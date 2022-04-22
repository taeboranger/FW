const log = require('../components/logger.js').log
const err = require('../components/logger.js').err

const sequelize = require('sequelize')
const User = require('../models/index').User
const Item = require('../models/index').Item
const ItemImg = require('../models/index').ItemImg
const Sheet = require('../models/index').Sheet

exports.getUser = async (args, context) => {

    try {
        context.req.user.emails[0].value
    }
    catch (error) {
        err("No user info! : ")
        return null
    }

    return await User.findOne({
        where: {
            email: context.req.user.emails[0].value
        }
    }).then(res => {
        index = res.index
        return Sheet.findAll({
            attributes: ['index', 'userIndex', 'itemIndex', 'price', 'bonus', 'date', 'type'],
            raw: true,
            where: {
                userIndex: index
            }
        }).then(res => {
            total_c = res.length
            total_p = 0
            res.forEach(sheet => {
                total_p += sheet.price
            })
            return User.update({
                total_c: total_c,
                total_p: total_p
            }, {
                where: {
                    index: index
                }
            }).then(_ => {
                return User.findOne({
                    where: {
                        index: index
                    }
                }).then(res => {
                    return res
                }).catch(error => {
                    err("Can't select user : " + error)
                    return null
                })
            }).catch(error => {
                err("Can't update user : " + error)
                return null
            })
        }).catch(error => {
            err("Can't select sheet : " + error)
            return null
        })
    }).catch(error => {
        err("Can't select user : " + error)
        return null
    })

}

exports.getItem = async (args) => {

    if (args.index) {
        log(`getItem requested, index : ${args.index}`)
        return await Item.findOne({
            raw: true,
            where: {
                index: args.index
            }
        }).then(res1 => {
            return ItemImg.findOne({
                attributes: ['index', 'file_link'],
                where: {
                    index: args.index
                }
            }).then(res2 => {
                res1.img = 'img'
                console.log(res1)
                return [res1]
            })
        })
    }
    else {
        log("getItem requested, All")
        return await Item.findAll({
            raw: true
        })
    }

}

exports.getSheet = async (args, context) => {

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
        if (args.index) {
            userIndex = res.index
            return Sheet.findOne({
                attributes: ['index', 'userIndex', 'itemIndex', 'price', 'bonus', 'date', 'type'],
                where: {
                    index: args.index
                }
            }).then(res => {
                if (res.userIndex == userIndex) {
                    console.log("!")
                    return [res]
                }
                else {
                    err("Not your sheet! : " + email)
                    return null
                }
            }).catch(error => {
                err("Sheet selection(one) error! : " + error)
                return null
            })
        }
        else {
            userIndex = res.index
            return Sheet.findAll({
                raw: true,
                attributes: ['index', 'userIndex', 'itemIndex', 'price', 'bonus', 'date', 'type'],
                where: {
                    userIndex: userIndex
                },
                offset: (args.page - 1) * 20,
                limit: 20
            }).then(res => {
                console.log(res)
                return res
            }).catch(error => {
                err("Sheet selection(all) error! : " + error)
                return null
            })
        }
    }).catch(error => {
        err("User select error occured : " + error)
        return null
    })

}

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