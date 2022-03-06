module.exports = isLogined = (req, res, next) => {
    if(req.user.id){
        next()
    }
    else{
        res.status(402).send("Login Needed!")
    }
}