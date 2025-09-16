/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAllDashboardQuery } from "../../redux/api/dashboardApi";

const SellerGrowth = () => {
  const currentYear = new Date().getFullYear();
  const [chartHeight, setChartHeight] = useState(300);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const { data: dashboardData, isLoading } = useGetAllDashboardQuery({
    year: selectedYear,
  });
  console.log("dashboardData from seller growth", dashboardData);

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

  const sellerGrowthData = dashboardData?.data?.sellerGrowth?.monthlyData || [];
  const currentYearData =
    dashboardData?.data?.sellerGrowth?.year === selectedYear
      ? sellerGrowthData
      : [];
  const data = currentYearData.map((item) => ({
    month: item.month,
    vendors: item.cumulative || 0,
    count: item.count || 0,
  }));
  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="text-gray-500">Loading seller growth data...</div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#202020] text-white p-3 rounded-lg shadow-lg border border-[#B5ED90]">
          <p className="font-medium">{`Month: ${label}`}</p>
          <p className="font-medium text-[#FF62BD]">{`Total Sellers: ${payload[0].value}`}</p>
          <p className="font-medium text-[#B5ED90]">{`New This Month: ${data.count}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
        <div>
          <h1 className="text-xl font-semibold">Seller Growth</h1>
        </div>

        <div className="relative w-full md:w-32">
          {/* Selected Year Display */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md flex justify-between items-center bg-white transition"
          >
            <span className="text-[#0B704E]">{selectedYear}</span>
            <FaChevronDown className="text-[#0B704E] w-5 h-5 ml-5" />
          </button>

          {/* Dropdown List */}
          {isOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
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
        <ResponsiveContainer width="100%" height={chartHeight}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="vendorGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF62BD" stopOpacity={1} />
                <stop offset="95%" stopColor="#B5ED90" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fill: "#666" }}
              tickLine={{ stroke: "#666" }}
            />
            <YAxis tick={{ fill: "#666" }} tickLine={{ stroke: "#666" }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="vendors"
              stroke="#FF62BD"
              strokeWidth={3}
              fill="url(#vendorGrowth)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SellerGrowth;
