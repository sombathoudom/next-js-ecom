import UserTable from "./_components/user-table";
import { api } from "@/trpc/server";
export default async function page() {
  // const post = await api.post.getLatest();
  // return <div>Latest Post: {post?.name}</div>;

  return <UserTable />;
}
