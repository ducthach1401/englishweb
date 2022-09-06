import { model, Schema } from "mongoose";
import { IBase, SchemaBase } from "./model.base";

export interface IUser extends IBase {
  isAdmin: boolean;
  name: string;
  username: string;
  password: string;
  refreshToken: string;
  markExam: [
    {
      mark: number;
      date: Date;
    }
  ];
  markTopic: [
    {
      mark: number;
      date: Date;
    }
  ];
}

const userSchema = new Schema(
  SchemaBase({
    isAdmin: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String, default: "" },
    markExam: [
      {
        mark: { type: Number },
        date: { type: Number },
      },
    ],
    markTopic: [
      {
        mark: { type: Number },
        date: { type: Number },
      },
    ],
  }),
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model<IUser>("User", userSchema);
