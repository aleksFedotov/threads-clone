'use server';

import { CreateThreadParams } from '@/types';
import { connectToDB } from '../mongoose';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';

export async function createThread({
  text,
  author,
  communityId,
  path,
}: CreateThreadParams) {
  try {
    await connectToDB();
    const newThread = await Thread.create({
      text,
      author,
      community: communityId,
    });

    //update user model
    await User.findByIdAndUpdate(author, { $push: { threads: newThread._id } });
    revalidatePath(path);
  } catch (error: any) {
    console.log(`Failed to creat a thread: ${error.message}`);
  }
}
