import React, { useState } from "react";
import { Wallet, History, Plus, QrCode, Camera } from "lucide-react";

// Custom Button Component stays the same
const CustomButton = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-cyan-500 hover:to-cyan-700 text-white focus:ring-cyan-500",
    secondary:
      "bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:from-cyan-600 hover:via-cyan-700 hover:to-cyan-800 text-white focus:ring-cyan-500",
    outline:
      "border-2 border-gray-200 hover:border-cyan-500 hover:bg-cyan-50 focus:ring-cyan-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const WalletPage = () => {
  const [balance, setBalance] = useState(500.0);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("transactions");

  const transactions = [
    {
      id: 1,
      date: "2025-02-01",
      location: "Central Canteen",
      amount: -120,
      items: "Lunch Combo",
    },
    {
      id: 2,
      date: "2025-02-01",
      location: "College Mess",
      amount: -80,
      items: "Breakfast",
    },
    {
      id: 3,
      date: "2025-01-31",
      location: "Recharge",
      amount: 500,
      items: "UPI Payment",
    },
    {
      id: 4,
      date: "2025-01-31",
      location: "Coffee Shop",
      amount: -40,
      items: "Cold Coffee",
    },
  ];

  // Content components for each tab
  const TransactionsContent = () => (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 transition-colors shadow-sm"
        >
          <div>
            <p className="font-medium">{transaction.location}</p>
            <p className="text-sm text-gray-500">{transaction.items}</p>
            <p className="text-xs text-gray-400">{transaction.date}</p>
          </div>
          <div
            className={`text-lg font-semibold ${
              transaction.amount > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount)}
          </div>
        </div>
      ))}
    </div>
  );

  const RechargeContent = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[100, 200, 500, 1000].map((amount) => (
          <CustomButton key={amount} variant="outline" className="w-full py-6">
            ₹{amount}
          </CustomButton>
        ))}
      </div>
      <CustomButton className="w-full py-6 text-lg">
        Pay with Paytm
      </CustomButton>
      <CustomButton className="w-full py-6 text-lg" variant="secondary">
        Pay with UPI
      </CustomButton>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-cyan-100 to-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Balance Card */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700 text-white shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-6 h-6" />
            <h2 className="text-2xl font-bold">My Wallet</h2>
          </div>
          <p className="text-cyan-100 mb-6">
            Manage your college wallet balance and transactions
          </p>
          <div className="text-4xl font-bold text-center py-6 bg-gradient-to-r from-white/10 to-white/5 rounded-xl backdrop-blur-sm">
            ₹{balance.toFixed(2)}
          </div>
        </div>

        {/* Scanner Card */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-cyan-100 via-cyan-50 to-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <QrCode className="w-5 h-5" />
            <h2 className="text-xl font-bold">Quick Pay</h2>
          </div>
          <p className="text-gray-600 mb-4">Scan QR code to make payment</p>
          <div className="flex flex-col items-center">
            {isScanning ? (
              <div className="w-full aspect-square max-w-sm bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-cyan-400 rounded-lg relative animate-pulse">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
                  </div>
                </div>
              </div>
            ) : (
              <CustomButton
                className="w-full py-8 text-lg"
                onClick={() => setIsScanning(true)}
              >
                <Camera className="w-6 h-6 mr-2 inline" />
                Start Scanning
              </CustomButton>
            )}
          </div>
        </div>

        {/* Transactions Section */}
        <div className="rounded-2xl bg-gradient-to-br from-white via-cyan-50 to-cyan-100 shadow-lg overflow-hidden">
          <div className="grid grid-cols-2 border-b">
            <button
              className={`py-4 px-6 flex items-center justify-center gap-2 transition-colors ${
                activeTab === "transactions"
                  ? "bg-gradient-to-r from-cyan-100 to-cyan-50 font-medium"
                  : "hover:from-cyan-50 hover:to-cyan-100"
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              <History className="w-4 h-4" />
              Transactions
            </button>
            <button
              className={`py-4 px-6 flex items-center justify-center gap-2 transition-colors ${
                activeTab === "recharge"
                  ? "bg-gradient-to-r from-cyan-100 to-cyan-50 font-medium"
                  : "hover:from-cyan-50 hover:to-cyan-100"
              }`}
              onClick={() => setActiveTab("recharge")}
            >
              <Plus className="w-4 h-4" />
              Recharge
            </button>
          </div>

          <div className="p-6">
            {activeTab === "transactions" ? (
              <TransactionsContent />
            ) : (
              <RechargeContent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
