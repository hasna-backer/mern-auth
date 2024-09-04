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

const User = mongoose.model('User', userSchema)
export default User;