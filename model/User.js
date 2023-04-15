import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        apellido: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        pass: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics.encryptPassword = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
};

userSchema.statics.comparePassword = async function (receivedPassword, u) {
    return await bcrypt.compare(receivedPassword, u)
}

export default mongoose.model("User", userSchema);