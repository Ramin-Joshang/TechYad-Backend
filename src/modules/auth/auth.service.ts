import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from './user.model.js';
import { Role } from './role.model.js';
import { AppError } from '../../common/errors/AppError.js';
import { env } from '../../config/env.js';

const signToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

const signRefreshToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });
};

export class AuthService {
  static async register(data: any) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError('Email already in use', 400, 'AUTH_EMAIL_EXISTS');
    }

    // Assign 'student' role by default
    let studentRole = await Role.findOne({ slug: 'student' });
    if (!studentRole) {
      studentRole = await Role.create({
        name: 'Student',
        slug: 'student',
        permissions: [],
      });
    }

    const passwordHash = await argon2.hash(data.password);

    const newUser = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
      role: studentRole._id,
      status: 'active',
    });

    const accessToken = signToken(newUser._id as string);
    const refreshToken = signRefreshToken(newUser._id as string);

    return {
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: studentRole.slug
      },
      accessToken,
      refreshToken
    };
  }

  static async login(data: any) {
    const user = await User.findOne({ email: data.email }).select('+passwordHash').populate('role');
    if (!user) {
      throw new AppError('Invalid email or password', 401, 'AUTH_INVALID_CREDENTIALS');
    }

    const isPasswordCorrect = await argon2.verify(user.passwordHash, data.password);
    if (!isPasswordCorrect) {
      throw new AppError('Invalid email or password', 401, 'AUTH_INVALID_CREDENTIALS');
    }

    if (user.status !== 'active') {
      throw new AppError('Your account is not active', 403, 'AUTH_ACCOUNT_INACTIVE');
    }

    const accessToken = signToken(user._id as string);
    const refreshToken = signRefreshToken(user._id as string);

    const role = user.role as any;

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: role?.slug
      },
      accessToken,
      refreshToken
    };
  }
}
