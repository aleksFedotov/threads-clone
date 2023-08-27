import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';

import { communityTabs } from '@/constants';

import UserCard from '@/components/cards/UserCard';

import ProfileHeader from '@/components/shared/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  fetchCommunities,
  fetchCommunityDetails,
} from '@/lib/actions/community.actions';
import ThreadsTab from '@/components/shared/TreadsTab';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import CommunityCard from '@/components/cards/CommunityCard';

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <>
      <h1 className="head-text">Communities</h1>

      {/* <div className="mt-5">
        <Searchbar routeType="communities" />
      </div> */}

      <section className="mt-9 flex flex-wrap gap-4">
        {result.communities.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      {/* <Pagination
        path="communities"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
    </>
  );
}

export default Page;
