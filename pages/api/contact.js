import { Resend } from 'resend'
import ContactEmailTemplate from '../../components/emails/contactEmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const { data, error } = await resend.emails.send({
    from: 'Teacher Fund <joel@theteacherfund.com>',
    to: email,
    subject,
    react: ContactEmailTemplate({
      name,
      email,
      subject,
      message
    })
  })

  if (error) {
    return res.status(500).json(error)
  }

  return res.status(200).json(data)
}
