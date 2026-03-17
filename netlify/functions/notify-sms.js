export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { name, email, subject, message } = await req.json()

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_PHONE_NUMBER
    const toNumber = process.env.NOTIFY_PHONE_NUMBER

    const smsBody = `New inquiry from ${name} (${email})\nSubject: ${subject}\n${message.slice(0, 200)}`

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(`${accountSid}:${authToken}`),
        },
        body: new URLSearchParams({
          To: toNumber,
          From: fromNumber,
          Body: smsBody,
        }).toString(),
      }
    )

    const result = await response.json()

    return new Response(JSON.stringify({ success: response.ok, status: response.status, twilio: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to send SMS' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = {
  path: '/.netlify/functions/notify-sms',
}
