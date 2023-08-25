import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadsTab from '@/components/shared/TreadsTab';

import { profileTabs } from '@/constants';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect('/onboarding');

  //   Fetch uesrs
  const result = await fetchUsers({
    userId: user.id,
    searchStrig: '',
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <div>
      <h1 className="head-text mb-10">Search</h1>
    </div>
  );
};

export default Page;
