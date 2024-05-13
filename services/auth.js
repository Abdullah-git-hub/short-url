const jwt = require("jsonwebtoken");
const secret = "arafat123";

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        },
        secret
    );
}
0;
function getUser(token) {
    // console.log(jwt.verify(token, secret));
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = { setUser, getUser };
