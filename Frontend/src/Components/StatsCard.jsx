import { Loader2, BarChart3, TrendingUp, Calendar, ExternalLink } from "lucide-react";

const StatsCard = ({ code, setCode, stats, clicks, handleStats, handleVisit, loading }) => (
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        <BarChart3 size={24} />
        Analytics & Statistics
      </h2>
      <p className="text-purple-100 mt-2">
        View detailed analytics for your shortened URLs
      </p>
    </div>
    <div className="p-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Enter URL code
        </label>
        <input
          type="text"
          placeholder="Enter code (e.g., abc123)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
          onKeyPress={(e) => e.key === "Enter" && handleStats()}
        />
      </div>
      <button
        onClick={handleStats}
        disabled={loading || !code.trim()}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Loading...
          </>
        ) : (
          <>
            <TrendingUp size={20} /> Get Analytics
          </>
        )}
      </button>

      {stats && (
        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-500 uppercase">
                Original URL
              </label>
              <p className="text-gray-700 break-all bg-gray-50 p-3 rounded-lg mt-1">
                {stats.longUrl}
              </p>
            </div>
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl">
              <div>
                <label className="text-sm font-semibold text-blue-600 uppercase">
                  Total Clicks
                </label>
                <p className="text-2xl font-bold text-blue-700">{clicks}</p>
              </div>
              <BarChart3 className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-green-600" size={16} />
                <label className="text-sm font-semibold text-green-600 uppercase">
                  Created At
                </label>
              </div>
              <p className="text-green-700 font-medium">
                {new Date(stats.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleVisit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              <ExternalLink size={18} /> Visit Original URL
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default StatsCard;
