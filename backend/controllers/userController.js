import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }
        const ismatched = await bcrypt.compare(password, user.password)
        if (ismatched) {
            const token = createtoken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Password is incorrect" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

// Route for user signup
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const emailExist = await userModel.findOne({ email })
        if (emailExist) {
            return res.json({ success: false, message: "User already exist" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createtoken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

// Route for admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }

    const token = jwt.sign(
      {
        email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.status(200).json({
      success: true,
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}


