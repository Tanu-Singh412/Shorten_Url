import { Loader2, Scissors, Globe } from "lucide-react";

const ShortenUrlCard = ({ longUrl, setLongUrl, handleShorten, loading }) => (
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        <Scissors size={24} />
        Shorten Your URL
      </h2>
      <p className="text-blue-100 mt-2">
        Paste your long URL below and get a shortened version instantly
      </p>
    </div>
    <div className="p-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Enter your long URL
        </label>
        <div className="relative">
          <Globe
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="url"
            placeholder="https://example.com/very-long-url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            onKeyPress={(e) => e.key === "Enter" && handleShorten()}
          />
        </div>
      </div>
      <button
        onClick={handleShorten}
        disabled={loading || !longUrl.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Processing...
          </>
        ) : (
          <>
            <Scissors size={20} /> Shorten URL
          </>
        )}
      </button>
    </div>
  </div>
);

export default ShortenUrlCard;
