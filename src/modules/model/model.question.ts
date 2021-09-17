import { model, Schema } from "mongoose";
import { IBase, SchemaBase } from "./model.base";

export interface IQuest extends IBase {
    english: string,
    vietnamese: string,
    type: string,
    meaning: string,
    exampleEnglish: string,
    exampleVietnamese: string,
    catalogy: string
}

const questionSchema = new Schema(SchemaBase({
    english: {type: String, required: true},
    vietnamese: {type: String, required: true},
    type: {type: String, required: true},
    meaning: {type: String},
    exampleEnglish: {type: String, required: true},
    exampleVietnamese: {type: String},
    catalogy: {type: String, required: true}
}),{
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

export default model<IQuest>('Quest', questionSchema);