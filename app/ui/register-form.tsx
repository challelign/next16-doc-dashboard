"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import { useActionState } from "react";
import { register } from "@/app/lib/actions";
import Link from "next/link";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, undefined);

  return (
    <form action={formAction} className="pb-3">
      <div className="flex-1 bg-gray-50 px-6 rounded-lg">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Create an account
        </h1>
        <div className="w-full">
          {/* Name field */}
          <div>
            <label
              className="block mt-2 mb-1 font-medium text-gray-900 text-xs"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block py-[9px] pl-10 border border-gray-200 rounded-md outline-2 w-full placeholder:text-gray-500 text-sm"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                defaultValue={state?.values?.name}
                required
              />
              <UserIcon className="top-1/2 left-3 absolute w-[18px] h-[18px] text-gray-500 peer-focus:text-gray-900 -translate-y-1/2 pointer-events-none" />
            </div>
            {state?.errors?.name && (
              <div className="">
                {state.errors.name.map((error: string) => (
                  <p className="text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Email field */}
          <div>
            <label
              className="block mt-2 mb-1 font-medium text-gray-900 text-xs"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block py-[9px] pl-10 border border-gray-200 rounded-md outline-2 w-full placeholder:text-gray-500 text-sm"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                defaultValue={state?.values?.email}
                required
              />
              <AtSymbolIcon className="top-1/2 left-3 absolute w-[18px] h-[18px] text-gray-500 peer-focus:text-gray-900 -translate-y-1/2 pointer-events-none" />
            </div>
            {state?.errors?.email && (
              <div className="">
                {state.errors.email.map((error: string) => (
                  <p className="text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Password field */}
          <div className="mt-4">
            <label
              className="block mt-5 mb-3 font-medium text-gray-900 text-xs"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block py-[9px] pl-10 border border-gray-200 rounded-md outline-2 w-full placeholder:text-gray-500 text-sm"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="top-1/2 left-3 absolute w-[18px] h-[18px] text-gray-500 peer-focus:text-gray-900 -translate-y-1/2 pointer-events-none" />
            </div>
            {state?.errors?.password && (
              <div className="mt-2">
                {state.errors.password.map((error: string) => (
                  <p className="text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password field */}
          <div className="mt-4">
            <label
              className="block mt-5 mb-3 font-medium text-gray-900 text-xs"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block py-[9px] pl-10 border border-gray-200 rounded-md outline-2 w-full placeholder:text-gray-500 text-sm"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                minLength={6}
              />
              <KeyIcon className="top-1/2 left-3 absolute w-[18px] h-[18px] text-gray-500 peer-focus:text-gray-900 -translate-y-1/2 pointer-events-none" />
            </div>
            {state?.errors?.confirmPassword && (
              <div className="mt-2">
                {state.errors.confirmPassword.map((error: string) => (
                  <p className="text-red-500 text-sm" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Register <ArrowRightIcon className="ml-auto w-5 h-5 text-gray-50" />
        </Button>

        <div
          className="flex items-end space-x-1 mt-2 h-8"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.message && (
            <>
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
              <p className="text-red-500 text-sm">{state.message}</p>
            </>
          )}
        </div>

        <div className="pt-0 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
