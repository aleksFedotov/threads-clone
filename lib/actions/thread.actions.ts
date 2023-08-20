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
    // Establish a connection to the database.
    await connectToDB();

    // Create a new thread in the database with provided thread content, author, and associated community.
    const newThread = await Thread.create({
      text,
      author,
      community: communityId,
    });

    // Update the user model to reflect the new thread's addition to the user's threads.
    await User.findByIdAndUpdate(author, { $push: { threads: newThread._id } });

    revalidatePath(path);
  } catch (error: any) {
    console.log(`Failed to creat a thread: ${error.message}`);
  }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  // Calculate the amount of threads to skip in order to fetch the desired page.
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    // Establish a connection to the database.
    await connectToDB();

    // Query the database to fetch threads that have no parent (top-level threads), sorted by creation date in descending order.
    const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        // Populate the 'author' field of each thread with user information from the 'User' model.
        path: 'author',
        model: User,
      })
      .populate({
        // Populate the 'children' field of each thread with information about child threads.
        // Also populate the 'author' field of child threads with user information.
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: '_id name parentId image', // Select specific fields of the 'User' model to populate.
        },
      });

    // Count the total number of threads that match the criteria of having no parent.
    const totalThreadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    // Execute the query to fetch the threads.
    const threads = await threadsQuery.exec();

    // Determine whether there are more threads available beyond the fetched batch.
    const isNext = totalThreadsCount > skipAmount + threads.length;

    // Return an object containing the fetched threads and a flag indicating if there are more threads to fetch.
    return { threads, isNext };
  } catch (error: any) {
    console.log(`Failed to fetch threads: ${error.message}`);
  }
}
