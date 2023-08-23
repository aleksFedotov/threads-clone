'use server';

import { revalidatePath } from 'next/cache';
import User from '../models/user.model';
import Community from '../models/community.model';
import { connectToDB } from '../mongoose';
import { UpdateUserParams } from '@/types';
import Thread from '../models/thread.model';

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UpdateUserParams): Promise<void> {
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === '/profile/edit') {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ id: userId }).populate({
      path: 'communities',
      model: Community,
    });
    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message} `);
  }
}

export async function fetchUserThreads(userId: string) {
  try {
    await connectToDB();

    const userThreads = await User.findOne({ id: userId }).populate({
      path: 'threads',
      model: Thread,
      populate: [
        {
          path: 'community',
          model: Community,
          select: 'name id image _id',
        },
        {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: 'name image id',
          },
        },
      ],
    });

    return userThreads;
  } catch (error: any) {
    throw new Error(`Failed to fetch user threads: ${error.message}`);
  }
}
