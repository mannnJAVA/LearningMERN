export default function Page() {
  async function submitForm(formData) {
    "use server";
    const formFields = {
      email: formData.get("email"),
      message: formData.get("message"),
    };
    console.log("formFields", formFields);
    console.log("TODO: Send these form field values to a backend");
    return formFields;
  }
  return (
    <main className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Contact Us!
      </h1>

      <form className="space-y-4" action={submitForm}>
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
