import User from '../model/model.user';
import bcrypt from 'bcrypt';

const saltRound = 10;
export class userService {
    async createUser(data: any): Promise<any>{
        try {
            const user = await User.findOne({
                username: data.username
            });
            if (user){
                throw Error('Username exist!!');
            }
            data.password = bcrypt.hashSync(data.password, saltRound);
            const newUser = new User(data);
            await newUser.save();
            return 'Register Success!!';
        } catch (error) {
            throw error;
        }
    }

    async updateUser(data: any): Promise<any> {
        try {
            const user = await User.findOne({
                username: data.username,
                isDelete: false
            });
            if (!user){
                throw Error('Username not found!!');
            }
            await User.updateOne({username: data.username}, data);
            return 'update User Success';
        } catch (error) {
            throw error
        }
    }

    async deleteUser(id: any): Promise<any>{
        try {
            const user = await User.findOne(id);
            if (!user){
                throw Error('Username not found!!');
            }
            await User.updateOne(id, {
                isDelete: true
            });
            return 'delete User Success';
        } catch (error) {
            throw error;
        }
    }

    async getUser(data: any): Promise<any> {
        const user = await User.findOne({
            username: data.username,
            isDelete: false
        });
        if (!user){
            throw Error('Username not found!!');
        }
        return user;
    }

    async getAllUser(data: any): Promise<any> {
        const user = await User.find({
            isDelete: false
        });
        if (user.length <= 0){
            throw Error('Username not found!!');
        }
        return user;
    }  
}