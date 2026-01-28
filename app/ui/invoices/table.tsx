import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/data";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="flow-root mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="bg-gray-50 p-2 md:pt-0 rounded-lg">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white mb-2 p-4 rounded-md w-full"
              >
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <div className="flex items-center mb-2">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-gray-500 text-sm">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex justify-between items-center pt-4 w-full">
                  <div>
                    <p className="font-medium text-xl">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden md:table min-w-full text-gray-900">
            <thead className="rounded-lg font-normal text-sm text-left">
              <tr>
                <th scope="col" className="px-4 py-5 sm:pl-6 font-medium">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pr-3 pl-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="py-3 border-b last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg w-full text-sm"
                >
                  <td className="py-3 pr-3 pl-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {invoice.email}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="py-3 pr-3 pl-6 whitespace-nowrap">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
