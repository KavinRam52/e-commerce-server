import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, "Username must have atleast 3  characters minimum"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must have at least 6 characters minimum"]
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number']
    },
    profilePic: {
        type: String,
        default: 'defaultPic.jpg'
    }
},
    {
        timestamps: true,
    }
);


const User = mongoose.model("user", userSchema);

export default User;