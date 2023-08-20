export interface UpdateUserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export interface CreateThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
