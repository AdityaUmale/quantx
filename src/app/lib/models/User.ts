import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: {
        type: String,
        unique: true,
        required: true,
    },
    isAdmin: Boolean || false,
    createdAt: Date,
})

export default mongoose.models.User || mongoose.model('User', userSchema);