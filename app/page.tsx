// app/page.tsx
"use client";

import React, { useState } from "react";
import { LucideProps, Home, User, Settings } from "lucide-react";

type Tab = [string, string, React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>];

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const tabs: Tab[] = [
    ["home", "Home", Home],
    ["profile", "Profile", User],
    ["settings", "Settings", Settings],
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <div className="flex gap-4">
        {tabs.map(([id, label, Icon], index) => (
          <button
            key={index} // index بديل للـ key لتجنب مشاكل TypeScript
            onClick={() => setActiveTab(id)}
            className={`px-5 py-3 flex items-center gap-2 rounded-xl font-bold transition ${
              activeTab === id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            {Icon && <Icon className="w-5 h-5" />}
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === "home" && <p>Welcome to the Home tab!</p>}
        {activeTab === "profile" && <p>Here is your Profile information.</p>}
        {activeTab === "settings" && <p>Adjust your Settings here.</p>}
      </div>
    </div>
  );
}
