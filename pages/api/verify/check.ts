import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { phone, code } = req.body

    if (!phone || typeof phone !== 'string') {
      return res.status(400).json({ error: 'Phone number is required' })
    }

    if (!code || typeof code !== 'string' || code.length !== 6) {
      return res.status(400).json({ error: 'A valid 6-digit code is required' })
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID

    if (!accountSid || !authToken || !verifySid) {
      return res.status(500).json({ error: 'Twilio credentials are not configured' })
    }

    const client = twilio(accountSid, authToken)

    const check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phone, code })

    if (check.status !== 'approved') {
      return res.status(400).json({ error: 'Invalid verification code' })
    }

    return res.status(200).json({
      success: true,
      status: check.status,
    })
  } catch (error) {
    console.error('Twilio check error:', error)
    const message =
      error instanceof Error ? error.message : 'Verification failed'
    return res.status(500).json({ error: message })
  }
}
