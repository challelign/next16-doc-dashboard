import { auth } from "@/auth";

export default async function UserGreeting() {
  const session = await auth();
  const userName = session?.user?.name || "Guest";

  return (
    <div className="mb-4">
      <h1 className="font-bold text-gray-800 text-2xl">
        Welcome back, <span className="text-blue-600">{userName}</span>! 👋
      </h1>
      <p className="mt-1 text-gray-600">
        Here&apos;s what&apos;s happening with your dashboard today.
      </p>
    </div>
  );
}
