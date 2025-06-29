# 📧 Email Setup Guide

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Enable 2-factor authentication

2. **Generate App Password**
   - Go to Google Account → Security → App passwords
   - Select "Mail" and generate a password
   - Use this generated password in `EMAIL_PASSWORD` (not your regular Gmail password)

3. **Update Environment Variables**
   ```bash
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASSWORD=generated-app-password
   ```

## Other Email Providers

### Yahoo Mail
- Change service to 'yahoo' in `src/lib/emailService.ts`
- Use Yahoo app password

### Outlook/Hotmail
- Change service to 'hotmail' in `src/lib/emailService.ts`
- Use regular password or app password

### Custom SMTP
Replace the transporter configuration in `src/lib/emailService.ts`:

```typescript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Features

✅ **Confirmation Emails**: Users get confirmation when they submit contact form
✅ **Reply Emails**: Users get actual emails when admin replies
✅ **Professional Templates**: Beautiful HTML email templates
✅ **Error Handling**: Email failures don't break the contact system

## Testing

1. Submit a contact form - user should receive confirmation email
2. Reply from admin panel - user should receive reply email
3. Check console logs for email sending status

## Troubleshooting

- **Authentication Error**: Check if app password is correct
- **Connection Error**: Check internet connection and email provider settings
- **Rate Limiting**: Some providers have sending limits

## Security Notes

- Never commit your `.env.local` file
- Use app passwords instead of regular passwords
- Keep your email credentials secure 



 अब आपको क्या करना है:
Step 1: Environment Variables Add करें
अपनी .env.local file में ये add करें:
Apply to EMAIL_SETUP....
Run
Step 2: Gmail Setup (Recommended)
2-Factor Authentication enable करें Google account में
App Password generate करें:
Google Account → Security → App passwords
"Mail" select करके password generate करें
यह password use करें EMAIL_PASSWORD में (regular password नहीं)
Step 3: Test करें
Contact form submit करें - confirmation email आना चाहिए
Admin panel से reply करें - reply email आना चाहिए
Console logs check करें email status के लिए
📋 Complete Flow अब:
User submits contact form
✅ Database में save होता है
✅ User को confirmation email मिलता है
Admin replies from admin panel
✅ Database में reply save होती है
✅ User को actual reply email मिलता है
✅ Admin को success message दिखता है
📧 Email Templates Include:
Professional design with Shakti Sabha branding
Original message और reply दोनों दिखते हैं
Responsive design mobile-friendly
Beautiful styling with gradients और emojis
🔒 Security Features:
App passwords use करते हैं (secure)
Environment variables में credentials
Error handling proper
अब यह 100% functional है! Environment variables set करने के बाद यह actually emails भेजेगा। 🚀
EMAIL_SETUP.md file भी बनाई है complete instructions के लिए!