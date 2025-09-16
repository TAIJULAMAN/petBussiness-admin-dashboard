/* eslint-disable react/prop-types */
import { ConfigProvider, Table, Spin } from "antd";
import { useGetAllDashboardQuery } from "../../redux/api/dashboardApi";
import { useMemo } from "react";

const RecentSellerRequests = () => {
  const { data: dashboardData, isLoading } = useGetAllDashboardQuery();
  // console.log("dashboardData ", dashboardData);

  // Process API data for table
  const dataSource = useMemo(() => {
    if (!dashboardData?.data?.businessOwners) {
      return [];
    }

    return dashboardData?.data?.businessOwners
      .slice(0, 5)
      .map((seller, index) => ({
        key: seller?.id || `seller-${index}`,
        no: index + 1,
        shopownerName: seller?.shopOwnerName || "N/A",
        shopName: seller?.shopName || "N/A",
        Date: seller?.date || "N/A",
        shopAddress: seller?.location || "N/A",
        status: seller?.status || "pending",
        email: seller?.email || "N/A",
        phone: seller?.phone || "N/A",
      }));
  }, [dashboardData]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 60,
      align: "center",
    },
    {
      title: "Shop Owner Name",
      key: "shopownerName",
      dataIndex: "shopownerName",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      key: "shopName",
      width: 150,
    },
    {
      title: "Request Date",
      dataIndex: "Date",
      key: "Date",
      width: 120,
    },
    {
      title: "Location",
      dataIndex: "shopAddress",
      key: "shopAddress",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

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
  if (!dataSource || dataSource.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">
          No recent seller requests
        </div>
        <div className="text-gray-400 text-sm">
          New requests will appear here when submitted
        </div>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            activeBorderColor: "#14803c",
          },

          Table: {
            headerBg: "#14803c",
            headerColor: "rgb(255,255,255)",
            cellFontSize: 16,
            headerSplitColor: "#14803c",
            rowHoverBg: "#f0f9ff",
          },
        },
      }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="shadow-sm border border-gray-200 rounded-lg overflow-hidden [&_.ant-table-thead_.ant-table-cell]:whitespace-nowrap"
      />
    </ConfigProvider>
  );
};

export default RecentSellerRequests;
