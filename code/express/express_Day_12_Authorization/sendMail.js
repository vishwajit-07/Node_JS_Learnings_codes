const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "vishwajitmavalankar54339@gmail.com",
    pass: "jzcq bxgp kcdn kqld",
  },
});

// Send an email using async/await
const sendMail = async (mail, otp) => {
  const info = await transporter.sendMail({
    from: "vishwajitmavalankar54339@gmail.com",
    to: mail,
    subject: "Account Verification",
    text: "Hello", // Plain-text version of the message
    html: `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background:#fafafa; font-family:Arial;">

    <table width="100%" style="padding:30px 0;">
      <tr>
        <td align="center">

          <table width="400" style="background:#fff; border:1px solid #ddd; border-radius:10px; padding:30px; text-align:center;">
            
            <tr>
              <td style="font-size:26px; font-weight:bold; padding-bottom:20px;">
                Instagram
              </td>
            </tr>

            <tr>
              <td style="font-size:20px; color:#262626;">
                Verify Your Email
              </td>
            </tr>

            <tr>
              <td style="font-size:14px; color:#555; padding:15px 0;">
                Use this OTP to complete your signup:
              </td>
            </tr>

            <tr>
              <td>
                <div style="background:#f2f2f2; display:inline-block; padding:15px 25px; font-size:28px; letter-spacing:8px; font-weight:bold; border-radius:8px;">
                  ${otp}
                </div>
              </td>
            </tr>

            <tr>
              <td style="font-size:12px; color:#888; padding-top:15px;">
                This code expires in 5 minutes.
              </td>
            </tr>

            <tr>
              <td style="font-size:12px; color:#999; padding-top:20px;">
                If you didn’t request this, ignore this email.
              </td>
            </tr>

          </table>

          <div style="font-size:12px; color:#aaa; margin-top:10px;">
            © 2026 Instagram Clone
          </div>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `,
  });

  console.log("Message sent:", info.messageId);
};

module.exports = sendMail;
