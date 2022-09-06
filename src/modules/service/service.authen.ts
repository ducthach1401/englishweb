import bcrypt from "bcrypt";
import User from "../model/model.user";
import jwt from "jsonwebtoken";

export class authenService {
  async login(data: any) {
    try {
      const user = await User.findOne({
        username: data.username,
      });
      if (!user || user.isDelete) {
        throw Error("User not found!!");
      }
      const check = await bcrypt.compareSync(data.password, user.password);
      if (check) {
        const payload: any = {
          _id: user._id,
          username: user.username,
          name: user.name,
          isAdmin: user.isAdmin,
        };
        const accessToken: any = jwt.sign(
          payload,
          `${process.env.ACCESS_TOKEN_SECRET}`,
          { expiresIn: "6h" }
        );
        const refreshToken: any = jwt.sign(
          payload,
          `${process.env.REFRESH_TOKEN_SECRET}`
        );
        user.refreshToken = refreshToken;
        await user.save();
        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      } else {
        throw Error("Password is incorrect!!");
      }
    } catch (error) {
      throw error;
    }
  }

  async refresh(token: any) {
    try {
      const user = await User.findOne({
        refreshToken: token,
      });
      if (!user) {
        return null;
      }
      const payload: any = {
        _id: user._id,
        username: user.username,
        name: user.name,
        isAdmin: user.isAdmin,
      };
      await jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`);
      const accessToken: any = jwt.sign(
        payload,
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: "6h" }
      );
      return {
        accessToken: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
