"use client";

import React from "react";
import { MainLayout } from "../../components/layout";
import { Calendar, CheckCircle, LogIn, PowerCircle } from "lucide-react";

type AttendanceStatus = "Present" | "Late" | "Absent" | "Leave" | "Exchange";

interface AttendanceRecord {
  id: number;
  date: string;
  day: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
}

const attendanceData: AttendanceRecord[] = [
  {
    id: 1,
    date: "Jan 25, 2026",
    day: "Saturday",
    checkIn: "09:30 AM",
    checkOut: "06:00 PM",
    status: "Late",
  },
  {
    id: 2,
    date: "Jan 25, 2026",
    day: "Sunday",
    checkIn: "09:05 AM",
    checkOut: "06:00 PM",
    status: "Present",
  },
  {
    id: 3,
    date: "Jan 25, 2026",
    day: "Monday",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
  },
  {
    id: 4,
    date: "Jan 25, 2026",
    day: "Tuesday",
    checkIn: "09:05 AM",
    checkOut: "06:00 PM",
    status: "Present",
  },
  {
    id: 5,
    date: "Jan 25, 2026",
    day: "Wednesday",
    checkIn: "09:05 AM",
    checkOut: "06:00 PM",
    status: "Present",
  },
  {
    id: 6,
    date: "Jan 25, 2026",
    day: "Thursday",
    checkIn: "-",
    checkOut: "-",
    status: "Leave",
  },
  {
    id: 7,
    date: "Jan 25, 2026",
    day: "Friday",
    checkIn: "-",
    checkOut: "-",
    status: "Exchange",
  },
];

const getStatusColor = (status: AttendanceStatus) => {
  switch (status) {
    case "Present":
      return "bg-green-100 text-green-600";
    case "Late":
      return "bg-red-100 text-red-600";
    case "Absent":
      return "bg-orange-100 text-orange-600";
    case "Leave":
      return "bg-blue-100 text-blue-600";
    case "Exchange":
      return "bg-purple-100 text-purple-600";
    default:
      return "";
  }
};

export default function AttendancePage() {
  return (
    <MainLayout pageTitle="Attendance">
      <div className="p-6 bg-gray-50">
        {/* Title */}
        <h2 className="text-2xl font-light text-gray-500 mb-6">
          Check In and Check Out your daily attendance. Track your attendance records and view your daily attendance history conveniently.
        </h2>

        {/* Today Info */}
        <div className="flex flex-wrap items-center justify-between bg-white p-4  mb-6">
          <div className="text-sm text-gray-600 flex text-lg">
            <span className="font-medium text-gray-600 flex items-center gap-1">
                <Calendar size={24} color="#044192" />
                Today : Jan 27, 2026 (Tuesday)
            </span>
            <span className="ml-6">
              Checked in at : <span className="font-medium">09:30 AM</span>
            </span>
          </div>

          <div className="flex gap-3 mt-3 sm:mt-0">
            <button className="px-4 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 flex items-center gap-1">
              <CheckCircle size={16} />
              Check In
            </button>
            <button className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 flex items-center gap-1">
                <PowerCircle size={16} className="" />
                Check Out
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg ">
          <table className="w-full text-sm table-auto text-gray-600">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 text-black">#</th>
                <th className="p-3">Date</th>
                <th className="p-3">Day</th>
                <th className="p-3">Check - In</th>
                <th className="p-3">Check - Out</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-black">{index + 1}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.day}</td>
                  <td className="p-3">{item.checkIn}</td>
                  <td className="p-3">{item.checkOut}</td>
                  <td className="p-3 w">
                    <span
                      className={`inline-block w-24 text-center rounded-[5px] text-xs font-medium px-2 py-2 ${getStatusColor(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>

          {/* Footer */}
          <div className="flex justify-between items-center p-4 text-sm text-gray-600 border-t bg-gray-50">
            <div>
              Total :
              <span className="text-green-600 font-medium ml-1">
                12 Present
              </span>
              ,
              <span className="text-orange-600 font-medium ml-1">2 Absent</span>
              ,
              <span className="text-purple-600 font-medium ml-1">
                1 Exchange
              </span>
              ,<span className="text-red-600 font-medium ml-1">1 Late</span>,
              <span className="text-blue-600 font-medium ml-1">2 Leave</span>
              <span className="ml-4 text-blue-600 font-medium">
                Work Days : 18
              </span>
            </div>

            <div>1-10 of 10</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
