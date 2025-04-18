import User from "@/models/userModel";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import bcrypt from "bcryptjs";

type SendEmailType = {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
} as SMTPTransport.Options);

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailType): Promise<SMTPTransport.SentMessageInfo> => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 1000 * 60 * 60 * 24,
        }
      );
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: Date.now() + 1000 * 60 * 15,
        }
      );
    }

    const mailOptions = getMailOptions(email, emailType, hashedToken);

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
    throw new Error("Failed to send email due to unknown error.");
  }
};

function getMailOptions(
  email: string,
  emailType: "VERIFY" | "RESET",
  hashedToken: string
) {
  const path = emailType === "VERIFY" ? "verifyemail" : "resetpassword";

  const actionText =
    emailType === "VERIFY" ? "verify your email" : "reset your password";

  const subject =
    emailType === "VERIFY"
      ? "Verify Your Email - Account Activation"
      : "Reset Your Password - Account Recovery";

  const greeting =
    emailType === "VERIFY"
      ? "Thank you for signing up! Please verify your email address to activate your account."
      : "We received a request to reset your password. If you didn't make this request, you can ignore this email.";

  const url = `${process.env.DOMAIN}/${path}?token=${hashedToken}`;

  return {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">
        <h2 style="color: #333;">${subject}</h2>
        <p>${greeting}</p>
        <p>Please click the button below to ${actionText}:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${url}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
          </a>
        </div>
        <p>Or copy and paste this URL into your browser:</p>
        <p style="background-color: #f5f5f5; padding: 10px; word-break: break-all;">${url}</p>
        <p style="font-size: 12px; color: #777; margin-top: 20px; border-top: 1px solid #e9e9e9; padding-top: 10px;">
          If you didn't request this ${actionText}, you can safely ignore this email.
          ${emailType === "RESET" ? "Your password will remain unchanged." : ""}
        </p>
      </div>
    `,
    text: `
      ${subject}
      
      ${greeting}
      
      Please use the link below to ${actionText}:
      
      ${url}
      
      If you didn't request this ${actionText}, you can safely ignore this email.
      ${emailType === "RESET" ? "Your password will remain unchanged." : ""}
    `,
  };
}
