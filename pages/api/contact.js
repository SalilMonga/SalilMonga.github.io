import nodemailer from "nodemailer";

export default async function ContactAPI(req, res) {
  const { name, email, message } = req.body;
  console.log('reqbody:', req.body)

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
  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailData = {
    from: user,
    to: ["salil.monga23@gmail.com", email],
    replyTo: email,
    subject: `Thank you for contacting me ${name}!`,
    html: `
      <h1>Thank you for contacting me ${name}!</h1>
      <p>I will get back to you as soon as possible!</p>
      <p> Here's what I received:</p>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
      `,
  };
  console.log('mailData:', mailData)

  try {
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
    console.log("Email sent: ", mailData.messageId);
    // Added wait so that I can look at the spinner longer. LOL
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Email not sent! Please try again later." });
  }
}