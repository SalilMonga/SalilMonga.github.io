import nodemailer from "nodemailer";

export default async function ContactAPI(req, res) {
  const { name, email, message } = req.body;
  const user = process.env.user
  //TODO: Add validation
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: process.env.pass,
    },
  })

  try {
    // const mail = await transporter.sendMail({
    //   from: user,
    //   to: ["salil.monga23@gmail.com", email],
    //   replyTo: email,
    //   subject: `Thank you for contacting me ${name}!`,
    //   html: `
    //   <h1>Thank you for contacting me ${name}!</h1>
    //   <p>I will get back to you as soon as possible!</p>
    //   <p> Here's what I received:</p>
    //   <p>Name: ${name}</p>
    //   <p>Email: ${email}</p>
    //   <p>Message: ${message}</p>
    //   `,
    // });
    // console.log("Email sent: ", mail.messageId);
    // return res.status(200).json({ message: "Email sent successfully!" });
    throw new Error("This is a test error")
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Email not sent! Please try again later." });
  }
}