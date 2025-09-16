/* eslint-disable react/prop-types */
import React from "react";
import { useState, useEffect, useMemo } from "react";
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

export default function SellerGrowth() {
  const currentYear = new Date().getFullYear();
  const [chartHeight, setChartHeight] = useState(300);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  // Use skip to prevent unnecessary API calls and add caching
  const {
    data: dashboardData,
    isLoading,
    isFetching,
  } = useGetAllDashboardQuery(
    { year: selectedYear },
    {
      skip: false,
      refetchOnMountOrArgChange: 300, // Cache for 5 minutes
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

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

  // Memoize resize handler to prevent unnecessary re-renders
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

  // Memoize data processing to prevent unnecessary recalculations
  const chartData = useMemo(() => {
    const sellerGrowthData =
      dashboardData?.data?.sellerGrowth?.monthlyData || [];
    const currentYearData =
      dashboardData?.data?.sellerGrowth?.year === selectedYear
        ? sellerGrowthData
        : [];

    return currentYearData.map((item) => ({
      month: item.month,
      vendors: item.cumulative || 0,
      count: item.count || 0,
    }));
  }, [dashboardData, selectedYear]);

  // Enhanced loading state with skeleton
  if (isLoading || isFetching) {
    return (
      <div className="animate-pulse">
        <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#B5ED90] rounded-full animate-bounce"></div>
            <div
              className="w-4 h-4 bg-[#FF62BD] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#B5ED90] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <span className="ml-2 text-gray-600">
              Loading seller growth data...
            </span>
          </div>
        </div>
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
            data={chartData}
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
}
