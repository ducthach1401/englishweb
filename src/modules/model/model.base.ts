import {Document, SchemaDefinition, Schema} from 'mongoose';

export interface IBase extends Document {
    _id: string,
    isDelete: boolean,
    created_at: Date,
    updated_at: Date
}

export function SchemaBase(schema: SchemaDefinition | any) {
    const defaultSchema = {
        isDelete: {
            type: Boolean,
            required: true,
            default: false
        }
    };

    return {
        ...schema,
        ...defaultSchema
    };
}