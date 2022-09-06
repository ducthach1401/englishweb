import { IUser } from "../model/model.user";

export function serializerUserInfo(model: IUser): any {
  return {
    name: model.name,
    markExam: model.markExam,
    markTopic: model.markTopic,
    isAdmin: model.isAdmin,
  };
}
