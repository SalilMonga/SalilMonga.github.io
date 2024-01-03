"use client";
import { useState } from "react";
import { Contact } from "../page";
import "./contactPage.scss";

interface ContactPageProps {
  contact?: Contact;
}

export const ContactPage = () => {
  // const [formData, setFormData] = useState<Contact>({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // setFormData({
    //   name: String(event.target.name.value),
    //   email: String(event.target.email.value),
    //   message: String(event.target.message.value),
    // });
    const data = {
      name: String(event.target.name.value),
      email: String(event.target.email.value),
      message: String(event.target.message.value),
    };
    console.log("data:", data);
  };
  return (
    <div className="mx-auto max-w-2xl px-2 my-10">
      <h3 className="text-2xl py-1 dark:text-white">Contact Me</h3>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col py-2 my-4 ">
          <label htmlFor="name" className="text-l  dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            minLength={3}
            maxLength={150}
            autoComplete="off"
            className="bg-gray-50 border border-gray-100 dark:bg-blue-100"
          />
        </div>
        <div className="w-full flex flex-col py-2 my-4">
          <label htmlFor="email" className="text-l dark:text-white">
            Email
          </label>
          <input
            type="text"
            id="email"
            required
            minLength={5}
            maxLength={150}
            autoComplete="off"
            className="bg-gray-50 border border-gray-100 dark:bg-blue-100"
          />
        </div>
        <div className="w-full flex flex-col py-2 my-4">
          <label htmlFor="message" className="text-l dark:text-white">
            Message
          </label>
          <textarea
            rows={4}
            required
            minLength={10}
            maxLength={500}
            id="message"
            placeholder="How can I help you?"
            className="w-full py-1 bg-gray-50 border border-gray-100 dark:bg-blue-100"
          />
        </div>
        <button type="submit" className="messageButton">
          Send Message
        </button>
      </form>
    </div>
  );
};
