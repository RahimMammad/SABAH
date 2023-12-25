import UserSchema from "../models/UserSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers = async (req, res) => {
    try {
        const users = await UserSchema.find({})
        if (users) {
            res.status(200).send(users)
        } else {
            res.status(404).send("Something Wrong!")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id)
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send("Something Wrong!")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.query
        const userExist = await UserSchema.findOne({ username })
        if (userExist) {
            return res.status(409).send({ msg: "User Exists!" })
        }
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);
        const newUser = new UserSchema({
            username,
            password: hashedPassword
        });

        await newUser.save()
        res.status(200).send({ msg: "User created!" })

    } catch (error) {
        res.status(500).send(error)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.query
        console.log(username,password );
        const findUser = await UserSchema.findOne({username})
        console.log(findUser);
        if (!findUser) {
            res.status(404).send('User not found!')
        }
        if ( !(bcrypt.compare(password, findUser.password))) {            
            res.status(404).send('Incorrect password!')
        }
        const token = jwt.sign(
            {
                userId: user._id
            },
            "secretKey",
            { expiresIn: "7d" }
        )
        console.log(token);
        res.send("User logined")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await UserSchema.findByIdAndUpdate(req.params.id)
        const { username, password } = req.query
        if (user) {
            user.username = username,
                user.password = password
            await user.save()
            res.send({ msg: "User Updated" })
        } else {
            res.status(404).json({ message: "Not Found" })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await UserSchema.findByIdAndDelete(req.params.id) ?
            res.status(200).send({ msg: "User Deleted" }) :
            res.status(404).send({ msg: "Not Found!" })
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}