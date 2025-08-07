import { Link, BarChart3, CheckCircle } from "lucide-react";

const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    }`}
  >
    <Icon size={20} />
    {label}
  </button>
);

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <TabButton
        id="shorten"
        label="Shorten URL"
        icon={Link}
        isActive={activeTab === "shorten"}
        onClick={setActiveTab}
      />
      <TabButton
        id="stats"
        label="Analytics"
        icon={BarChart3}
        isActive={activeTab === "stats"}
        onClick={setActiveTab}
      />
      <TabButton
        id="result"
        label="Results"
        icon={CheckCircle}
        isActive={activeTab === "result"}
        onClick={setActiveTab}
      />
    </div>
  );
};

export default Tabs;
