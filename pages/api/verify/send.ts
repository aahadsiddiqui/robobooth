import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const { phone } = body

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({ error: 'Phone number is required' })
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID

    if (!accountSid || !authToken || !verifySid) {
      return res.status(500).json({ error: 'Twilio credentials are not configured' })
    }

    const client = twilio(accountSid, authToken)

    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phone, channel: 'sms' })

    return res.status(200).json({
      success: true,
      status: verification.status,
    })
  } catch (error) {
    console.error('Twilio send error:', error)
    const message =
      error instanceof Error ? error.message : 'Failed to send verification code'
    return res.status(500).json({ error: message })
  }
}
