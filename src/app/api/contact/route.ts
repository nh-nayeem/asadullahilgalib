import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate the request data
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #444; border-radius: 8px; overflow: hidden; font-family: Arial, sans-serif; background-color: #111827;">
          <!-- Header Section -->
          <div style="background-color: #111827; color: #ffffff; padding: 20px 25px; border-bottom: 1px solid #444;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 500; letter-spacing: 0.5px;">New Contact Form Submission</h2>
          </div>
          
          <!-- Sender Info Section -->
          <div style="background-color: #1F2937; padding: 10px; border-bottom: 1px solid #444;">
            <div style="margin-bottom: 15px; color: #ffffff; font-size: 15px; line-height: 1.6;">
              <p style="margin: 0 0 15px 0">
                <span style="color: #bbbbbb;">Name:</span> ${name}
              </p>
              <p style="margin: 0;">
                <span style="color: #bbbbbb;">Email:</span> 
                <a href="mailto:${email}" style="color: #ffffff; text-decoration: none; font-weight: 500;">
                  ${email}
                </a>
              </p>
            </div>
          </div>
          
          <!-- Message Section -->
          <div style="background-color: #1F2937; padding: 25px;">
            <div style="margin-bottom: 15px;">
              <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                Message
              </h3>
              <div style="background-color: #111827; border-left: 3px solid #666666; padding: 20px; border-radius: 0 4px 4px 0;">
                <p style="margin: 0; color: #ffffff; line-height: 1.6; white-space: pre-line; font-size: 15px;">
                  ${message}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #111827; color: #999999; font-size: 12px; text-align: center; padding: 12px 20px; border-top: 1px solid #444;">
            This message was sent from the contact form on your website.
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
