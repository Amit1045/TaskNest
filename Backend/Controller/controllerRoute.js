import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../model/usermodel.js';
import Notes from "../model/NoteModel.js";
import mongoose from "mongoose";


export const SignUpRoute = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // ✅ Validation
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email",
            });
        }

        // ✅ Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Create user
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
        });

    } catch (error) {
        console.error("🔥 MONGO ERROR:", error);
        return res.status(500).json({
            message: error.message,
        });
    }

};

export const LoginRoute = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(501).json({ message: 'All field must filled' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid || !email) return res.status(401).json({ message: "Invalid credentials" });

    // generate token
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
    );

    res.json({
        token,
        user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        },
    });

}

export const getNotes = async (req, res) => {
    try {
        const findNotes = await Notes.find({})
        res.status(201).json({
            success: "true",
            data: findNotes
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Internal server Error");
    }
}
export const CreateNote = async (req, res) => {
    try {
      const { title, description, status, priority, dueDate } = req.body
      if (!title || !description || !status || !priority || !dueDate) {
        return res.status(400).json({
          success: false,
          message: "All fields must be filled!"
        });
      }
      if (new Date(dueDate) < new Date()) {
        return res.status(400).json({
          message: "Due date cannot be in the past"
        });
      }
      
      const newNote = new Notes({
        title,
        description,
        status,
        priority,
        dueDate
      });
  
      await newNote.save();
  
      res.status(201).json({
        success: true,
        data: newNote
      });
  
    } catch (error) {
      console.error("Internal server error:", error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  
export const EditNote = async (req, res) => {
    try {
        const { id } = req.params
        const Note = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Note not Found!!" })
        }
        const UpdateNote = await Notes.findByIdAndUpdate(id, Note, { new: true })
        res.status(201).json({
            success: true,
            message: "Note Updated Successfully"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('Internal server error Edit ');
    }
}

export const DeleteNote = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(401).json({ message: "Note not found!!" })
        }
        await Notes.findByIdAndDelete(id)
        res.status(201).json({ success: true, message: "Note Deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('Internal server error Delete');
    }
}

export const SearchNote = async (req, res) => {
    const { title } = req.query
    try {
        if (!title) {
            return res.status(400).json({ message: "Please provide a title to search" });
        }

        const Note = await Notes.find({
            title: { $regex: title, $options: "i" } // "i" for case-insensitive
        });

        if (Note.length === 0) {
            return res.status(404).json({ message: "No Note Found" });
        }
        res.status(200).json(Note);

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('Internal server error Search ');
    }
}