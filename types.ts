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

export interface ThreadAuthor {
  name: string;
  image: string;
  id: string;
}
export interface Community {
  id: string;
  name: string;
  image: string;
}

export interface ThreadCardProps {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: ThreadAuthor;
  community: Community | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

export interface CommentsFormProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}
