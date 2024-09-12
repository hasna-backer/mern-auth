import mongoose from "mongoose";
import bcrypyt from 'bcryptjs'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default:
            'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
}, {
    timestamps: true
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypyt.genSalt(10)
    this.password = await bcrypyt.hash(this.password, salt)

})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypyt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema)
export default User;