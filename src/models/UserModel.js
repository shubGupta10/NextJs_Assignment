import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },

    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


const User = mongoose.models.User || mongoose.model("User", UserSchema);


export default User