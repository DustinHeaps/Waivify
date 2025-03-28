


export default function LegalIndexPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Legal & Policies</h1>
      <p className="text-gray-600 mb-8">
        Learn how Waivify handles your data, rights, and responsibilities across the platform.
      </p>

      <ul className="space-y-4">
        <li className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <a href="/terms" className="flex items-center space-x-3 text-blue-600 hover:underline">
            <span>📄</span>
            <span className="text-lg font-medium">Terms of Service</span>
          </a>
        </li>
        <li className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <a href="/privacy" className="flex items-center space-x-3 text-blue-600 hover:underline">
            <span>🔐</span>
            <span className="text-lg font-medium">Privacy Policy</span>
          </a>
        </li>
        <li className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <a href="/policy" className="flex items-center space-x-3 text-blue-600 hover:underline">
            <span>✍️</span>
            <span className="text-lg font-medium">Digital Signature Policy</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
