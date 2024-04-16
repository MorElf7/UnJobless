import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import {
  GetAccessTokenRequest,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
} from "../interfaces/IAuth";
import { DataResponse } from "../interfaces/IResponse";
import { IUser } from "../interfaces/IUser";
import { User, UserCredential } from "../models/User";
import HttpException from "../utils/HttpException";
import { checkUser } from "../utils/checkUtility";

const generateAccessToken = (user: any) => {
  return jwt.sign(user, config.accessTokenSecret, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
};

const generateRefreshToken = async (id: string) => {
  const refreshToken = jwt.sign({ id: id }, config.refreshTokenSecret);
  await UserCredential.create({
    user: id,
    token: refreshToken,
    expireAt: Date.now() + 1000 * 60 * 60 * 24,
    createdAt: Date.now(),
  });
  return refreshToken;
};

export class AuthService {
  static async login(payload: LoginRequest): Promise<LoginResponse> {
    const { email, password } = payload;
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      throw new HttpException(401, "Invalid username or password");
    }
    const userCreds = await UserCredential.findOne({ userId: userInfo._id });
    if (!userCreds) {
      throw new HttpException(500, "Internal server error");
    }
    const matchPassword = await bcrypt.compare(
      password,
      userCreds.passwordHash,
    );
    if (matchPassword) {
      const user = { ...userInfo.toJSON() };
      const token = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(userInfo._id.toString());
      return {
        token,
        refreshToken,
      };
    } else {
      throw new HttpException(401, "Invalid username or password");
    }
  }

  static async signup(payload: SignUpRequest): Promise<LoginResponse> {
    const { email, password, firstName, lastName, phone } = payload;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HttpException(400, "User already exists");
    }
    const passwordHash = await bcrypt.hash(password, config.saltRounds);
    const userInfo = await User.create({
      email,
      phone,
      firstName,
      lastName,
    });
    await UserCredential.create({ userId: userInfo, passwordHash });
    const user = { ...userInfo.toJSON(), avatar: null };
    const token = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(userInfo._id.toString());
    return {
      token,
      refreshToken,
    };
  }

  static async getAccessToken(
    payload: GetAccessTokenRequest,
  ): Promise<LoginResponse> {
    const { token } = payload;
    const userCredential = await UserCredential.findOne({
      token,
    });
    if (!userCredential || userCredential.get("isExpired")) {
      throw new HttpException(401, "Invalid token");
    }
    const userInfo = await checkUser({ _id: userCredential?.userId });

    const user = { ...userInfo.toJSON() };
    const accessToken = generateAccessToken(user);
    return {
      token: accessToken,
    };
  }

  static async getUserProfile(
    currentUser: IUser,
  ): Promise<DataResponse<IUser>> {
    const userProfile = await User.findById(currentUser.id);
    if (!userProfile) {
      throw new HttpException(404, "User not found");
    }
    return { data: userProfile.toJSON() };
  }
}
