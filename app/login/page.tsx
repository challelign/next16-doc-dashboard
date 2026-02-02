import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center py-8 min-h-screen">
      <div className="relative flex flex-col space-y-2.5 mx-auto p-4 w-full max-w-[400px]">
        <div className="flex items-end bg-blue-500 p-3 rounded-lg w-full h-20 md:h-36">
          <div className="w-32 md:w-36 text-white">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
