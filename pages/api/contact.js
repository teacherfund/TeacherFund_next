export default function (req, res) {
  const nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    // This is for mailtrap tester. Need to update to real SMTP settings, such as Gmail.
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailData = {
    // Customize to your SMTP requirements
    from: process.env.EMAIL_USERNAME,
    to: 'youremail@email.com', // Can be an array of recipients
    subject: `Message from ${req.body.name}: ${req.body.subject}`,
    text: `${req.body.message} | Sent from: ${req.body.email}`,
    html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      // TODO: Add error handling
      console.log(err)
      res.status(500)
    } else {
      res.status(200).json({ success: true })
    }
  })
}
