import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { fetchGDPData, countryMeta } from "../api/fetchData";

export default function Dashboard() {
  const [country, setCountry] = useState("India");
  const [gdpData, setGdpData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const meta = countryMeta[country];

  // 🔥 DATA LOAD
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      let result = [];

      try {
        result = await fetchGDPData(meta.code);
      } catch {
        result = [];
      }

      // fallback data (guaranteed change)
      if (!result || result.length === 0) {
        const fallback = {
          IN: [7, 8, 6, -7, 9, 7],
          US: [2, 1, 2, -3, 5, 2],
          CN: [6, 6, 5, 2, 8, 5],
          DE: [1, 2, 1, -4, 3, 1],
          GB: [1, 1, 2, -5, 4, 1],
          JP: [0, 1, 0, -4, 2, 1],
        };

        const arr = fallback[meta.code] || fallback["IN"];

        result = arr.map((v, i) => ({
          year: 2018 + i,
          gdp: v,
        }));
      }

      setGdpData([...result]);
      setLoading(false);
    };

    loadData();
  }, [country]);

  // 🔥 AI INSIGHT
  const generateInsight = () => {
    if (gdpData.length < 2) return;

    const latest = gdpData[gdpData.length - 1].gdp;
    const prev = gdpData[gdpData.length - 2].gdp;

    let text = "";

    text += latest > prev
      ? "📈 GDP is increasing, indicating economic growth.\n"
      : "📉 GDP is declining, indicating slowdown.\n";

    if (Math.min(...gdpData.map((d) => d.gdp)) < 0) {
      text += "🦠 Economic disruption detected (likely global crisis).\n";
    }

    if (latest > 5) {
      text += "🚀 Strong recovery trend observed.\n";
    }

    text += meta.inflation > 6
      ? "🔥 High inflation may reduce purchasing power.\n"
      : "💰 Inflation remains stable.\n";

    text += `\n📊 Conclusion: ${country}'s economy shows a ${meta.growth} trend influenced by global events and policy changes.`;

    setAiResponse(text);
  };

  return (
    <div>
      {/* 🌍 COUNTRY SELECT */}
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setAiResponse("");
          }}
        >
          <option value="India">🇮🇳 India</option>
          <option value="USA">🇺🇸 USA</option>
          <option value="China">🇨🇳 China</option>
          <option value="Germany">🇩🇪 Germany</option>
          <option value="UK">🇬🇧 UK</option>
          <option value="Japan">🇯🇵 Japan</option>
        </select>
      </div>

      <h2 className="text-2xl font-bold mb-4">Sarvatra Dashboard</h2>

      {/* 📊 KPI CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p>GDP Growth</p>
          <h3 className="text-xl font-bold">
            {gdpData.length
              ? gdpData[gdpData.length - 1].gdp.toFixed(2)
              : "..."}%
          </h3>

          {/* Trend Indicator */}
          <p className="text-sm text-gray-500">
            {gdpData.length > 1 &&
              (gdpData[gdpData.length - 1].gdp >
              gdpData[gdpData.length - 2].gdp
                ? "↑ Increasing"
                : "↓ Decreasing")}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Inflation</p>
          <h3 className="text-xl font-bold">{meta.inflation}%</h3>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Status</p>
          <h3 className="text-xl font-bold">{meta.growth}</h3>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Year</p>
          <h3 className="text-xl font-bold">{meta.year}</h3>
        </div>
      </div>

      {/* 📈 GRAPH */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-bold mb-2">GDP Trend</h3>

        {loading ? (
          <p className="animate-pulse text-blue-600">
            Loading data...
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart key={country} data={gdpData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line dataKey="gdp" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 🌍 EVENTS */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-bold mb-2">Key Global Events</h3>
        <ul>
          <li>2020 — COVID-19 Pandemic</li>
          <li>2022 — Russia-Ukraine War</li>
        </ul>
      </div>

      {/* 🤖 AI */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">AI Insights</h3>

        <button
          onClick={generateInsight}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate AI Insight
        </button>

        {aiResponse && (
          <pre className="mt-3 whitespace-pre-line">
            {aiResponse}
          </pre>
        )}
      </div>
    </div>
  );
}