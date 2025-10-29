import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTRATION USER API
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body.data;

    if (await User.findOne({ email })) {
      return res.status(400).json({ errors: "Email Already Registered" });
    }
    if (!username || !email || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({
      message: "Users Registration Successfuly",
      data: {
        id: user._id,
        username,
        email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ errors: "Sory Looks Like Something Went Wrong" });
    console.log(error);
  }
};

// LOGIN USER API CONTROLLER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body.data;

    if (!email || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ errors: "Password is incorrect" });
    }
    res.status(200).json({
      message: "Login Successfuly",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ errors: "Sory Looks Like Something Went Wrong" });
    console.log(error);
  }
};

//  UPDATE USER API
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ errors: "User Not Found" });
    }
    const { username, password, allocation } = req.body.data;
    if (username) {
      user.username = username;
    }
    if (allocation) {
      user.allocation = allocation;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    const updateUser = await user.save();
    res.status(200).json({
      message: "User Updated Successfuly",
      data: {
        username: updateUser.username,
        allocation: updateUser.allocation || [],
        email: updateUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ errors: "Sory Looks Like Something Went Wrong" });
    console.log(error);
  }
};
// GET USER API
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not Authorized" });

    const {username, email, allocation} = req.user;

    res.status(200).json({
      message: "Get User Successfuly",
      data: {
        username,
        email,
        allocation: allocation || [],
      },
    });
  } catch (error) {
    res.status(500).json({ errors: "Sory Looks Like Something Went Wrong" });
    console.log(error);
  }
};

// LOGOUT USER API
export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ data: "User delete successfuly" });
  }catch (error) {
    res.status(500).json({ errors: "Sory Looks Like Something Went Wrong" });
    console.log(error);
  }
};


// DELETE USER API
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params; // ambil id dari URL params

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ errors: "User dengan ID ini tidak ditemukan" });
    }

    res.status(200).json({
      message: "User berhasil dihapus",
      data: {
        id: deletedUser._id,
        username: deletedUser.name,
        email: deletedUser.email,
      },
    });

    if (req.user._id.toString() !== id) {
      return res
        .status(403)
        .json({ errors: "Kamu tidak bisa menghapus akun user lain" });
    }
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};
