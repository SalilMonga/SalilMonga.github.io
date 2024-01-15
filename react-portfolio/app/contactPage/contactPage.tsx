import { ChangeEvent, useState } from "react";
import "./contactPage.scss";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: String(""),
    email: String(""),
    message: String(""),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setFormData({
      name: String(event.target.name.value),
      email: String(event.target.email.value),
      message: String(event.target.message.value),
    });
    console.log("data:", formData);
    setLoading(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log("Message sent successfully");
    } else {
      setError(true);
      console.log("Message failed to send");
    }
    setLoading(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setLoading(false);
    setError(false);
  };

  return (
    <div className="my-10 mr-8 max-w-screen-sm">
      <h3 className="py-1 text-2xl dark:text-white">Contact Me</h3>
      <form onSubmit={handleSubmit}>
        <div className="div-format ">
          <label htmlFor="name" className="text-l  dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            minLength={3}
            maxLength={150}
            onChange={handleInputChange}
            autoComplete="off"
            className="input-borders"
          />
        </div>
        <div className="div-format">
          <label htmlFor="email" className="text-l dark:text-white">
            Email
          </label>
          <input
            type="text"
            id="email"
            required
            minLength={5}
            maxLength={150}
            onChange={handleInputChange}
            autoComplete="off"
            className="input-borders"
          />
        </div>
        <div className="div-format">
          <label htmlFor="message" className="text-l dark:text-white">
            Message
          </label>
          <textarea
            rows={4}
            required
            minLength={10}
            maxLength={500}
            onChange={handleInputChange}
            id="message"
            placeholder="How can I help you?"
            className="input-borders w-full py-1"
          />
        </div>
        {error && (
          <div className="div-format alert-label">
            <label htmlFor="message" className="text-l text-red-500">
              Sorry, there was an error sending your message. Please try again.
            </label>
          </div>
        )}
        <button
          type="submit"
          className={`messageButton ${
            error || loading ? "messageErrorGradient" : ""
          }`}
          disabled={error || loading}
        >
          {loading ? (
            <svg
              className="mx-10 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};
