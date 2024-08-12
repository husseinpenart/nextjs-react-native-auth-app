import mongoose, { model, models } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
    // Check if password is being modified
    if (!this.isModified('password')) {
        console.log('Password not modified, skipping hash...');
        return next();
    }

    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed:', this.password);
    next();
});

const UserSchema = models.UserSchema || model("UserSchema", userSchema);
export default UserSchema;
