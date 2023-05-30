import PageContainer from '@/Components/PageContainer'
import Home from '@/Components/pages/home/Home'
import backend from '@/backend/db';
import { getUserToken } from '@/lib/utils'

export default async function Page() {
  const userData = await getUserToken();
  const initialUserPosts =  await backend.getPosts(userData.id)

  return (
    <Home {...{ userData, initialUserPosts }} />
  )
}
