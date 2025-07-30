const ContactEmailTemplate = ({ name, email, subject, message }) => {
  return (
    <div className='email-container'>
      <div className='email-wrapper'>
        <div className='email-card'>
          <div className='email-card-body'>
            {/* Header */}
            <div className='email-header'>
              <div>
                <h1 className='email-title'>
                  The Teacher Fund
                </h1>
                <p className='email-subtitle'>
                  Contact Form Submission
                </p>
                <div className='email-separator' />
              </div>
            </div>

            {/* Content */}
            <div className='email-content'>
              <div className='email-content-header'>
                <h2 className='email-content-title'>
                  New Contact Form Message
                </h2>
                <span className='email-badge'>
                  New
                </span>
              </div>

              <div>
                {/* Name Field */}
                <div className='email-field'>
                  <div className='email-field-label'>
                    Name:
                  </div>
                  <div className='email-field-content'>
                    <p className='email-field-text'>{name}</p>
                  </div>
                </div>

                {/* Email Field */}
                <div className='email-field'>
                  <div className='email-field-label'>
                    Email:
                  </div>
                  <div className='email-field-content'>
                    <p className='email-field-email'>{email}</p>
                  </div>
                </div>

                {/* Subject Field */}
                <div className='email-field'>
                  <div className='email-field-label'>
                    Subject:
                  </div>
                  <div className='email-field-content'>
                    <p className='email-field-subject'>{subject}</p>
                  </div>
                </div>

                {/* Message Field */}
                <div className='email-field'>
                  <div className='email-field-label'>
                    Message:
                  </div>
                  <div className='email-field-content'>
                    <p className='email-field-message'>{message}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className='email-footer'>
              <div className='email-footer-separator' />
              <div>
                <p className='email-footer-text'>
                  This message was sent from the Teacher Fund contact form.
                </p>
                <p className='email-footer-text'>
                  Please respond directly to:{' '}
                  <span className='email-footer-email'>
                    {email}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactEmailTemplate
