import { CheckCircle, Copy, BarChart3, ExternalLink } from "lucide-react";

const ResultCard = ({ shortUrl, code, clicks, copyToClipboard, copied, handleVisit, handleStats, setActiveTab }) => (
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
    <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        <CheckCircle size={24} /> Success! Your URL is Ready
      </h2>
      <p className="text-green-100 mt-2">Your shortened URL is ready to share</p>
    </div>
    <div className="p-8 space-y-6">
      <div className="bg-gray-50 p-6 rounded-xl">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Your shortened URL
        </label>
        <div className="flex gap-3">
          <div className="flex-1 bg-white border-2 border-gray-200 rounded-lg p-4">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium break-all">
              {shortUrl}
            </a>
          </div>
          <button
            onClick={() => copyToClipboard(shortUrl)}
            className={`px-4 py-4 rounded-lg font-semibold flex items-center gap-2 ${
              copied
                ? "bg-green-100 text-green-700 border-2 border-green-200"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            }`}
          >
            {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-xl">
          <label className="text-sm font-semibold text-blue-600 uppercase">Short Code</label>
          <p className="text-xl font-bold text-blue-700 mt-1">{code}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl">
          <label className="text-sm font-semibold text-purple-600 uppercase">Click Count</label>
          <p className="text-xl font-bold text-purple-700 mt-1">{clicks ?? "0"}</p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={handleVisit}
          disabled={!code}
          className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg"
        >
          <ExternalLink size={18} /> Visit Original
        </button>
        <button
          onClick={() => {
            setActiveTab("stats");
            if (code) handleStats();
          }}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg"
        >
          <BarChart3 size={18} /> View Analytics
        </button>
      </div>
    </div>
  </div>
);

export default ResultCard;
