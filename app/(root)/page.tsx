import ThreadCard from '@/components/cards/ThreadCard';
import { fetchThreads } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';

export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();

  if (!user) return null;
  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <div className="mt-9 flex flex-col gap-10">
        {result?.threads.length === 0 ? (
          <p className="no-result">No treads found</p>
        ) : (
          <>
            {result?.threads.map((thread) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user.id}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
