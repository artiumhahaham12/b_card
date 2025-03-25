const jwt = require("jsonwebtoken");

module.exports = (req, res,next) => {
    try {
        const header = req.header("Authorization");
        if (!header) return res.status(400).send("user not allowed");
        const result = jwt.verify(header,process.env.JWTKEY);
        if(!result) return res.status(400).send("user not allowed");
        req.auth = result;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}