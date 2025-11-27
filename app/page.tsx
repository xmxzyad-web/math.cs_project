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
    <div className="min-h-screen bg-gray-50 p-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      </header>

      <nav className="flex justify-center gap-4 mb-10">
        {tabs.map(([id, label, Icon], index) => (
          <button
            key={index} // index كـ key لتجنب مشاكل TypeScript
            onClick={() => setActiveTab(id)}
            className={`px-6 py-3 flex items-center gap-2 rounded-xl font-bold transition-all duration-200 ${
              activeTab === id ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {Icon && <Icon className="w-5 h-5" />}
            {label}
          </button>
        ))}
      </nav>

      <main className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        {activeTab === "home" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Home</h2>
            <p>Welcome to your dashboard! Here you can see a summary of your activities.</p>
          </section>
        )}

        {activeTab === "profile" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <p>Manage your personal information and update your profile settings here.</p>
          </section>
        )}

        {activeTab === "settings" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p>Adjust your application preferences, privacy settings, and notifications.</p>
          </section>
        )}
      </main>

      <footer className="mt-10 text-center text-gray-500">
        &copy; {new Date().getFullYear()} My Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
