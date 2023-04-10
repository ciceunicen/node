import mongoose from "mongoose";

export const ROLES = ["super_admin", "admin", "usuario", "regular", "emprendedor"];

const roleSchema = new mongoose.Schema(
    {
        tipo: String,
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Role", roleSchema);