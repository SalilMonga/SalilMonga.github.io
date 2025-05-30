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
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setLoading(false);
    setError(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 pb-16">
      <h3 className="text-2xl font-extrabold mb-8 text-neutral-900 dark:text-white text-left">
        Contact me for my <span className="text-purple-400">resume</span> or other collaboration opportunities!
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div>
          <label htmlFor="name" className="block text-base font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            minLength={3}
            maxLength={150}
            onBlur={handleInputChange}
            autoComplete="off"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#28293d] px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-base"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-base font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            minLength={5}
            maxLength={150}
            onBlur={handleInputChange}
            autoComplete="off"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#28293d] px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-base"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-base font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Message
          </label>
          <textarea
            rows={4}
            required
            minLength={10}
            maxLength={500}
            onBlur={handleInputChange}
            id="message"
            placeholder="Enter your message"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#28293d] px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-base resize-none"
          />
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
            <label htmlFor="message" className="text-sm">
              Sorry, there was an error sending your message. Please try again.
            </label>
          </div>
        )}
        <button
          type="submit"
          className={`w-full py-3 rounded-full font-bold text-lg shadow bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${error || loading ? 'bg-gradient-to-r from-gray-300 to-gray-500' : ''}`}
          disabled={error || loading}
        >
          {loading ? (
            <svg
              className="h-5 w-5 animate-spin"
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