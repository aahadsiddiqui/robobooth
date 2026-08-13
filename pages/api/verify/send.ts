import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

/** Prevent duplicate SMS when the client double-fires Send Code */
const recentSends = new Map<string, number>()
const SEND_COOLDOWN_MS = 15000

function pruneRecentSends(now: number) {
  for (const [key, ts] of recentSends) {
    if (now - ts > SEND_COOLDOWN_MS) recentSends.delete(key)
  }
}

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

    const normalizedPhone = phone.trim()
    const now = Date.now()
    pruneRecentSends(now)

    const lastSent = recentSends.get(normalizedPhone)
    if (lastSent && now - lastSent < SEND_COOLDOWN_MS) {
      // Treat as success so the UI still advances to OTP entry without a second Twilio SMS
      return res.status(200).json({
        success: true,
        status: 'pending',
        deduped: true,
      })
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID

    if (!accountSid || !authToken || !verifySid) {
      return res.status(500).json({ error: 'Twilio credentials are not configured' })
    }

    recentSends.set(normalizedPhone, now)

    const client = twilio(accountSid, authToken)

    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: normalizedPhone, channel: 'sms' })

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
