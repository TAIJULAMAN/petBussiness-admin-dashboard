/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetAllDashboardQuery } from "../../redux/api/dashboardApi";

const UserGrowth = () => {
  const currentYear = new Date().getFullYear();
  const [chartHeight, setChartHeight] = useState(300);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: dashboardData,
    isLoading,
    error,
  } = useGetAllDashboardQuery({ year: selectedYear });
  // console.log("dashboardData from seller growth", dashboardData);

  const startYear = 2023;
  const endYear = currentYear + 1;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(250);
      } else {
        setChartHeight(300);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userGrowthData = dashboardData?.data?.userGrowth?.monthlyData || [];
  const currentYearData =
    dashboardData?.data?.userGrowth?.year === selectedYear
      ? userGrowthData
      : [];

  const userData = currentYearData.map((item) => ({
    month: item?.month,
    totalUsers: item.cumulative || 0,
    newUsers: item.count || 0,
  }));

  // Loading and error states
  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="flex flex-row gap-2">
          <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#202020] text-white p-3 rounded-lg shadow-lg border border-[#B5ED90]">
          <p className="font-medium">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="font-medium"
              style={{ color: entry.color }}
            >
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
        <div>
          <h1 className="text-xl font-semibold">User Growth</h1>
        </div>
        <div className="relative w-full md:w-32">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md flex justify-between items-center bg-white transition"
          >
            <span className="text-[#0B704E]">{selectedYear}</span>
            <FaChevronDown className="text-[#0B704E] w-5 h-5 ml-5" />
          </button>

          {/* Dropdown List */}
          {isOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg text-lg">
              {years.map((year) => (
                <div
                  key={year}
                  onClick={() => handleSelect(year)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 transition ${
                    year === selectedYear ? "bg-gray-200" : ""
                  }`}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={userData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            barGap={100}
            barCategoryGap={40}
          >
            <XAxis tickLine={false} dataKey="month" />
            <YAxis tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="totalUsers"
              fill="#FF62BD"
              barSize={30}
              radius={[5, 5, 0, 0]}
              name="Total Users"
            />
            <Bar
              dataKey="newUsers"
              fill="#B5ED90"
              barSize={30}
              radius={[5, 5, 0, 0]}
              name="New Users"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default UserGrowth;
