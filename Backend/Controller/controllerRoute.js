import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const SignUpRoute = async (req, res) => {

    try {

        const { fullname, email, password } = req.body
        if (!fullname || !email || !password) {
            console.log('All field must filled');
        }
        if (!password.length < 6) {
            console.log('Password must be at least 6 digit ');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ error: err.message });
        console.log('Internal server error');

    }

}
export const LoginRoute = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        console.log('All field must filled');
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    // generate token
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,

        { expiresIn: "8h" }
    );

    res.json({ token });
}
export const LogoutRoute = async (req, res) => {

}