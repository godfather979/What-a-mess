import React from "react";
import RevenueGraph from "./RevenueGraph";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

const Stats = () => {
  const chartSetting = {
    xAxis: [
      {
        label: "Customer Count",
      },
    ],
    width: 500,
    height: 400,
  };

  const data = [
    { hour: "8 AM", customers: 15 },
    { hour: "9 AM", customers: 25 },
    { hour: "10 AM", customers: 30 },
    { hour: "11 AM", customers: 40 },
    { hour: "12 PM", customers: 60 },
    { hour: "1 PM", customers: 75 },
    { hour: "2 PM", customers: 80 },
    { hour: "3 PM", customers: 90 },
    { hour: "4 PM", customers: 85 },
    { hour: "5 PM", customers: 70 },
    { hour: "6 PM", customers: 50 },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 w-full z-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Analytics Overview
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Revenue Trend
              </h3>
              <select className="px-3 py-1 border rounded text-sm">
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>
            <div className="h-64 rounded-lg flex items-center justify-center">
              {/* <div className="h-64 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg flex items-center justify-center"> */}

              <LineChart
                xAxis={[
                  {
                    data: [
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                      18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                    ],
                  },
                ]}
                series={[
                  {
                    data: [
                      12543, 14732, 11321, 13245, 14123, 12356, 13984, 11236,
                      13005, 14567, 11823, 14156, 13922, 12749, 14930, 11456,
                      13467, 14321, 12987, 11634, 14892, 12145, 13756, 13802,
                      14500, 12278, 13123, 14456, 14289, 13342,
                    ],
                  },
                ]}
                width={500}
                height={300}
                animation={{
                  transitionDuration: 3000, // Transition duration in milliseconds
                }}
              />
              {/* <span className="text-gray-400">Revenue Chart Placeholder</span> */}
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Total Revenue: $123,456</span>
              <span>-12.5% from last period</span>
            </div>
          </div>

          {/* Popular Items Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Most Popular Items
              </h3>
              <select className="px-3 py-1 border rounded text-sm">
                <option>This month</option>
                <option>Last 3 months</option>
                <option>This year</option>
              </select>
            </div>
            <div className="h-64  rounded-lg flex items-center justify-center">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 240, label: "Vada pav" },
                      { id: 1, value: 120, label: "Paneer Biryani" },
                      { id: 2, value: 140, label: "Maggi" },
                      { id: 3, value: 40, label: "Cheese Sandwich" },
                      { id: 4, value: 160, label: "Coffee" },
                    ],
                    innerRadius: 15,
                    outerRadius: 80,
                    paddingAngle: 1.5,
                    cornerRadius: 3,
                    startAngle: -39,
                    cx: 40,
                    cy: 80,
                  },
                ]}
                width={400}
                height={200}
                animation={{
                  transitionDuration: 3000, // Transition duration in milliseconds
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 rounded-lg bg-purple-50">
                <div className="font-semibold text-purple-600">Vada Pav</div>
                <div className="text-gray-600">32%</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-blue-50">
                <div className="font-semibold text-blue-600">
                  Paneer Biryani
                </div>
                <div className="text-gray-600">24%</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-green-50">
                <div className="font-semibold text-green-600">Coffee</div>
                <div className="text-gray-600">20%</div>
              </div>
            </div>
          </div>

          {/* Peak Hours Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Peak Hours
              </h3>
              <select className="px-3 py-1 border rounded text-sm">
                <option>Today</option>
                <option>This week</option>
                <option>This month</option>
              </select>
            </div>
            <div className="h-64 rounded-lg flex items-center justify-center">
              <BarChart
                xAxis={[{ scaleType: "band", data: data.map((d) => d.hour) }]}
                series={[
                  { data: data.map((d) => d.customers), label: "Customers" },
                ]}
                width={600}
                height={300}
                // layout="horizontal"
              />
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <div>
                Busiest time: <span className="font-semibold">3 PM - 4 PM</span>
              </div>
              <div>
                Avg. orders/hour: <span className="font-semibold">45</span>
              </div>
            </div>
          </div>

          {/* Suggested Offers Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Suggested Offers
              </h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                New Offer
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-blue-900">
                      Happy Hour Special
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      20% off on all drinks (4 PM - 7 PM)
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                    Active
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-green-900">
                      Lunch Combo
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      Free drink with any main course
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                    New
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-purple-900">
                      Weekend Bundle
                    </h4>
                    <p className="text-sm text-purple-700 mt-1">
                      15% off on family packages
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded">
                    Weekend
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
