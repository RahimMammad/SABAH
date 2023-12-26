import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, maxLength: 255 },
        password: { type: String, required: true, maxLength: 255 },
        role: {type: String, required: true, default: "user"}
    },
    { timestamps: true }
);

// UserSchema.pre("save", async (next) => {
//     const hashPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashPassword;
//     next();
// })


export default mongoose.model("User", UserSchema);