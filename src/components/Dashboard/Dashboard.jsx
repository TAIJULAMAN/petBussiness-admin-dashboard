import user from "../../assets/user.svg";
import medal from "../../assets/medal.svg";
import profit from "../../assets/profit.svg";
import seller from "../../assets/seller.svg";
import SubscriptionGrowth from "./SubscriptionGrowth";
import SellerGrowth from "./SellerGrowth";
import RecentSellerRequests from "./RecentSellerRequests";
import { useGetAllDashboardQuery } from "../../redux/api/dashboardApi";

function DashboardPage() {
  const { data: dashboardData, isLoading } = useGetAllDashboardQuery();
  console.log("dashboardData ", dashboardData);
  const totalUsers = dashboardData?.data?.totalUsers;
  const totalIncome = dashboardData?.data?.totalIncome;
  const totalSellers = dashboardData?.data?.totalSellers;
  const totalSubscribers = dashboardData?.data?.totalSubscribers;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
          </div>
        </div>{" "}
      </div>
    );
  }

  const cardData = [
    {
      title: "Total Users",
      value: totalUsers || "0",
      icon: user,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Total Income",
      value: totalIncome ? `$${totalIncome.toLocaleString()}` : "$0",
      icon: profit,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      change: "+8.5%",
      changeType: "increase",
    },
    {
      title: "Total Sellers",
      value: totalSellers || "0",
      icon: seller,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      change: "+15%",
      changeType: "increase",
    },
    {
      title: "Total Subscribers",
      value: totalSubscribers || "0",
      icon: medal,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      change: "+23%",
      changeType: "increase",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            ></div>

            {/* Card Content */}
            <div className="relative p-6">
              {/* Icon Section */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 ${card.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <img
                  src={card.icon}
                  alt={`${card.title} Icon`}
                  className={`w-8 h-8 ${card.iconColor}`}
                />
              </div>

              {/* Title */}
              <h3 className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide">
                {card.title}
              </h3>

              {/* Value and Change */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {card.value}
                  </p>
                </div>
              </div>

              {/* Decorative Element */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-full`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* .............. */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md">
          <SubscriptionGrowth />
        </div>

        <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md">
          <SellerGrowth />
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-5">Business owners Requests</h1>
        <RecentSellerRequests />
      </div>
    </div>
  );
}

export default DashboardPage;
