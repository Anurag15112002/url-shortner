const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function handleSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    return res.status(201).json({ message: "Signup successful!" });
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 24,
        path: '/'
    });

    return res.status(200).json({ message: "Login successful!" });
}

async function handleLogout(req, res) {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Error during logout" });
            }

            res.clearCookie('connect.sid', { 
                path: '/', 
                secure: true,
                httpOnly: true, 
                sameSite: 'None' 
            });

            res.clearCookie('token', { 
                path: '/', 
                secure: true,
                httpOnly: true, 
                sameSite: 'None' 
            });

            return res.status(200).json({ message: "Logout successful!" });
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred during logout." });
    }
}

module.exports = {
    handleSignUp,
    handleLogin,
    handleLogout
};
