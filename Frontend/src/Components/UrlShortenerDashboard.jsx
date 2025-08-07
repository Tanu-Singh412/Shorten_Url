import { useState } from "react";
import { api } from "../api";
import { AlertCircle, Scissors } from "lucide-react";
import Tabs from "./Tabs";
import ShortenUrlCard from "./ShortenUrlCard";
import StatsCard from "./StatsCard";
import ResultCard from "./ResultCard";


const UrlShortenerDashboard = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [code, setCode] = useState("");
  const [clicks, setClicks] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("shorten");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShorten = async () => {
    if (!longUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/shorten", { longUrl });
      setShortUrl(res.data.shortUrl);
      setCode(res.data.code);
      setClicks(res.data.clicks);
      setActiveTab("result");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleStats = async () => {
    if (!code.trim()) {
      setError("Please enter a valid code");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/stats/${code}`);
      setStats(res.data);
      setClicks(res.data.clicks);
    } catch {
      setError("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  const handleVisit = async () => {
    if (!code) {
      setError("No code found");
      return;
    }
    try {
      const res = await api.get(`/${code}`);
      if (res.data?.originalUrl) {
        setClicks((prev) => (prev !== null ? prev + 1 : res.data.clicks));
        window.open(res.data.originalUrl, "_blank");
      }
    } catch {
      setError("Failed to open original URL");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Scissors className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              URL Shortener
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform long URLs into short, shareable links and track their
            performance with detailed analytics.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Content */}
        <div className="grid gap-8">
          {activeTab === "shorten" && (
            <ShortenUrlCard
              longUrl={longUrl}
              setLongUrl={setLongUrl}
              handleShorten={handleShorten}
              loading={loading}
            />
          )}
          {activeTab === "stats" && (
            <StatsCard
              code={code}
              setCode={setCode}
              stats={stats}
              clicks={clicks}
              handleStats={handleStats}
              handleVisit={handleVisit}
              loading={loading}
            />
          )}
          {activeTab === "result" && shortUrl && (
            <ResultCard
              shortUrl={shortUrl}
              code={code}
              clicks={clicks}
              copyToClipboard={copyToClipboard}
              copied={copied}
              handleVisit={handleVisit}
              handleStats={handleStats}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlShortenerDashboard;
