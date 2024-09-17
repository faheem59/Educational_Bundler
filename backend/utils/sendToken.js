// Create Token and saving in cookie

/*const sendToken = (user, statusCode, res) => {
    if (typeof user.getJWTToken !== 'function') {
        return res.status(500).json({
            success: false,
            error: 'User does not have a getJWTToken method',
        });
    }

    const token = user.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;*/
exports.sendToken = (res, user, message, statusCode = 200) => {

    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + 15 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        message,
        token,
        user,
    });
}