import { model, Schema } from "mongoose";
import { IBase, SchemaBase } from "./model.base";

export interface ICategory extends IBase {
  category: string;
}

const categorySchema = new Schema(
  SchemaBase({
    category: { type: String, required: true, unique: true },
  }),
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model<ICategory>("Category", categorySchema);
