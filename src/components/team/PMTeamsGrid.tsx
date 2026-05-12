"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Users, LayoutDashboard, Calendar } from "lucide-react";

export function PMTeamsGrid() {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/team-members/${id}`);
  };

  return (
    <div className="w-full">
      <main className="w-full mx-auto pb-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <h1 className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
              Manage and organize your teams. You can view team details, edit information, or remove teams as needed.
            </h1>
          </div>
          <div>
            <button className="bg-brand-navy hover:bg-brand-navy-dark text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors duration-200">
              Add New Team
            </button>
          </div>
        </header>

        {/* Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full-Stack Team */}
          <article 
            className="bg-white border border-border/40 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCardClick("full-stack-team")}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="font-semibold text-slate-700 text-lg">Full-Stack Team</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 text-muted-foreground hover:text-brand-blue transition-colors" 
                  title="Edit Team"
                  onClick={(e) => { e.stopPropagation(); /* edit logic */ }}
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button 
                  className="p-2 text-red-400 hover:text-red-600 transition-colors" 
                  title="Delete Team"
                  onClick={(e) => { e.stopPropagation(); /* delete logic */ }}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Total Members</span>
                </div>
                <span className="text-sm font-medium text-slate-600">8</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="text-sm">Department</span>
                </div>
                <span className="text-sm font-medium text-slate-600">IT & Development</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Created</span>
                </div>
                <span className="text-sm font-medium text-slate-600">12 Jan 2024</span>
              </div>
            </div>
          </article>

          {/* UIUX Team */}
          <article 
            className="bg-white border border-border/40 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCardClick("uiux-team")}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="font-semibold text-slate-700 text-lg">UIUX Team</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 text-muted-foreground hover:text-brand-blue transition-colors" 
                  title="Edit Team"
                  onClick={(e) => { e.stopPropagation(); /* edit logic */ }}
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button 
                  className="p-2 text-red-400 hover:text-red-600 transition-colors" 
                  title="Delete Team"
                  onClick={(e) => { e.stopPropagation(); /* delete logic */ }}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Total Members</span>
                </div>
                <span className="text-sm font-medium text-slate-600">4</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="text-sm">Department</span>
                </div>
                <span className="text-sm font-medium text-slate-600">IT & Development</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Created</span>
                </div>
                <span className="text-sm font-medium text-slate-600">12 Jan 2024</span>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
