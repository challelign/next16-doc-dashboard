"use client";

import { CustomerField, InvoiceForm } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateInvoice, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: "", errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <div className="bg-gray-50 p-4 md:p-6 rounded-md">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="block mb-2 font-medium text-sm">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block py-2 pl-10 border border-gray-200 rounded-md outline-2 w-full placeholder:text-gray-500 text-sm cursor-pointer"
              defaultValue={invoice.customer_id}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="top-1/2 left-3 absolute w-[18px] h-[18px] text-gray-500 -translate-y-1/2 pointer-events-none" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2 font-medium text-sm">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                defaultValue={invoice.amount}
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block py-2 pl-10 border border-gray-200 rounded-md outline-2 w-full placeholder:text-gray-500 text-sm"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="top-1/2 left-3 absolute w-[18px] h-[18px] text-gray-500 peer-focus:text-gray-900 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="block mb-2 font-medium text-sm">
            Set the invoice status
          </legend>
          <div className="bg-white px-[14px] py-3 border border-gray-200 rounded-md">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === "pending"}
                  className="bg-gray-100 border-gray-300 focus:ring-2 w-4 h-4 text-gray-600"
                />
                <label
                  htmlFor="pending"
                  className="flex items-center gap-1.5 bg-gray-100 ml-2 px-3 py-1.5 rounded-full font-medium text-gray-600 text-xs cursor-pointer"
                >
                  Pending <ClockIcon className="w-4 h-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === "paid"}
                  className="bg-gray-100 border-gray-300 focus:ring-2 w-4 h-4 text-gray-600"
                />
                <label
                  htmlFor="paid"
                  className="flex items-center gap-1.5 bg-green-500 ml-2 px-3 py-1.5 rounded-full font-medium text-white text-xs cursor-pointer"
                >
                  Paid <CheckIcon className="w-4 h-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-red-500 text-sm">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Link
          href="/dashboard/invoices"
          className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 rounded-lg h-10 font-medium text-gray-600 text-sm transition-colors"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
