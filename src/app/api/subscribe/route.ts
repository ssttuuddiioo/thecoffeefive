import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Coffee Five <noreply@thecoffeefive.com>',
      to: 'juan@thecoffeefive.com',
      subject: 'Website Signup',
      text: `New signup from the website:\n\n${email}`,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
