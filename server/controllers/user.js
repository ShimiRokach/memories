import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'invalid credentials' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'invalid credentials' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret', { expiresIn: "1w" });
        res.status(200).json({ result: existingUser, token });
    }
    catch (error) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

export const signUp = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'user already exist' });
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: "1w" });
        res.status(200).json({ result, token });
    }
    catch (error) {
        res.status(500).json({ message: 'something went wrong' });
    }
}