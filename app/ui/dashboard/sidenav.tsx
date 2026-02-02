import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import UserDropdown from "@/app/ui/dashboard/user-dropdown";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import { auth, signOut } from "@/auth";

export default async function SideNav() {
  const session = await auth();
  const userName = session?.user?.name || "Guest";
  const userEmail = session?.user?.email || "";

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <div className="flex flex-col px-3 md:px-2 py-4 h-full">
      <Link
        className="flex justify-start items-end bg-blue-600 mb-2 p-4 rounded-md h-20 md:h-40"
        href="/"
      >
        <div className="w-32 md:w-40 text-white">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex flex-row md:flex-col justify-between space-x-2 md:space-x-0 md:space-y-2 grow">
        <NavLinks />
        <div className="hidden md:block bg-gray-50 rounded-md w-full h-auto grow"></div>

        {/* User Dropdown with Sign Out */}
        <div className="hidden md:block">
          <UserDropdown
            userName={userName}
            userEmail={userEmail}
            onSignOut={handleSignOut}
          />
        </div>

        {/* Mobile Sign Out */}
        <form className="md:hidden" action={handleSignOut}>
          <button className="flex justify-center items-center gap-2 bg-gray-50 hover:bg-sky-100 p-3 rounded-md h-[48px] font-medium hover:text-blue-600 text-sm grow">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
