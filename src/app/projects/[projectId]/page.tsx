"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout";

export default function ProjectDetailsPage() {
  const router = useRouter();

  return (
    <MainLayout pageTitle="Project Details">
      {/* We use w-full and px/py for responsiveness instead of max-w constraints, as requested */}
      <div className="w-full pb-8">
        <main className="bg-white w-full rounded-lg shadow-sm overflow-hidden relative p-6 sm:p-8 border border-border/40">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">View Project Details</h1>
            <button
              onClick={() => router.back()}
              aria-label="Close"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          {/* Metadata Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Project Name</p>
                <p className="text-sm text-gray-400">FB Management System</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Order ID</p>
                <p className="text-sm text-gray-400">FO11BB26RE987</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Start Date</p>
                <p className="text-sm text-gray-400">08 May, 2026</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-600 mt-1">In Progress</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Client Name</p>
                <p className="text-sm text-gray-400">FB International BD</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Name</p>
                <p className="text-sm text-gray-400">Code_BD</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">End Date</p>
                <p className="text-sm text-gray-400">20 May, 2026</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Priority</p>
                <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-600 mt-1">High</span>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Project Description</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              This project involves a comprehensive overhaul of the enterprise resource planning system, focusing on modular integration and data security enhancements.
            </p>
          </section>

          {/* Progress Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-slate-800">Project Progress</h2>
              <span className="text-sm font-bold text-brand-navy">65%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div className="bg-brand-navy h-2.5 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </section>

          {/* Breakdown Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Project Breakdown</h2>
            <div className="overflow-x-auto border border-border/40 rounded-lg">
              <table className="min-w-full divide-y divide-border/40">
                <thead className="bg-muted/30">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">PHASE NAME</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">TEAM MEMBER</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">START DATE</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">END DATE</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border/40">
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">1</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">Frontend</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Ishrat Rintu</td>
                    <td className="px-4 py-3 text-sm text-gray-500">08 May, 2026</td>
                    <td className="px-4 py-3 text-sm text-gray-500">20 May, 2026</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">2</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">UIUX</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Marina Afroj</td>
                    <td className="px-4 py-3 text-sm text-gray-500">08 May, 2026</td>
                    <td className="px-4 py-3 text-sm text-gray-500">20 May, 2026</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">3</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">Backend</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Rakib</td>
                    <td className="px-4 py-3 text-sm text-gray-500">08 May, 2026</td>
                    <td className="px-4 py-3 text-sm text-gray-500">20 May, 2026</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">4</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">Flutter</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Rabbi</td>
                    <td className="px-4 py-3 text-sm text-gray-500">08 May, 2026</td>
                    <td className="px-4 py-3 text-sm text-gray-500">20 May, 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Additional Information Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Additional Information</h2>
            <div className="bg-muted/30 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Created By: <span className="text-gray-600 font-medium">John Doe</span></p>
                <p className="text-xs text-gray-400">Created On: <span className="text-gray-600 font-medium">10 May, 2026 10:20 AM</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Last Updated By: <span className="text-gray-600 font-medium">Sarah Jenkins</span></p>
                <p className="text-xs text-gray-400">Last Updated On: <span className="text-gray-600 font-medium">10 May, 2026 12:20 AM</span></p>
              </div>
            </div>
          </section>

          {/* Actions Footer */}
          <footer className="flex justify-end mt-4">
            <button className="bg-brand-navy text-white px-6 py-2.5 rounded-md text-sm font-semibold shadow-sm hover:bg-brand-navy-dark transition-colors">
              Project Breakdown
            </button>
          </footer>
        </main>
      </div>
    </MainLayout>
  );
}
