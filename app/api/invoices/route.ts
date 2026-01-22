import { NextResponse } from 'next/server';
import { z } from 'zod';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const CreateInvoiceSchema = z.object({
  customerId: z.string().min(1),
  amount: z.coerce.number().positive(),
  status: z.enum(['pending', 'paid']),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateInvoiceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: parsed.error.message }, { status: 422 });
    }

    const { customerId, amount, status } = parsed.data;
    const amountInCents = Math.round(amount * 100);
    const date = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    return NextResponse.json({ success: true, message: 'Invoice created' });
  } catch (err) {
    console.error('API /api/invoices error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
