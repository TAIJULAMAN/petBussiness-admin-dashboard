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
  // console.log(dashboardData);
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

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-3 lg:grid-cols-4 gap-2">
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-sm max-w-md">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Users
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img
                src={user}
                alt="User Stats Icon"
                className="w-[64px] h-[64px]"
              />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">{totalUsers}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-sm max-w-md">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Income
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img
                src={medal}
                alt="User Stats Icon"
                className="w-[64px] h-[64px]"
              />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">${totalIncome}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-sm max-w-md">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Seller
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img
                src={profit}
                alt="User Stats Icon"
                className="w-[64px] h-[64px]"
              />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">{totalSellers}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-sm max-w-md">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Subscribers
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img
                src={seller}
                alt="User Stats Icon"
                className="w-[64px] h-[64px]"
              />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">{totalSubscribers}</p>
        </div>
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
