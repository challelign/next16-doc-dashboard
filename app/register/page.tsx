import AcmeLogo from "@/app/ui/acme-logo";
import RegisterForm from "@/app/ui/register-form";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};
export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="relative flex flex-col space-y-2.5 mx-auto w-full max-w-[400px]">
        <div className="flex items-end bg-blue-500 p-3 rounded-lg w-full h-20 md:h-36">
          <div className="w-32 md:w-36 text-white">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
