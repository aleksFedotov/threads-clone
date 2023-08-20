import { fetchThreads } from '@/lib/actions/thread.actions';

export default async function Home() {
  const result = await fetchThreads(1, 30);

  console.log(result);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
    </>
  );
}
