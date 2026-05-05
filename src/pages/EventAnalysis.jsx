import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

import { fetchGDPData, countryMeta } from "../api/fetchData";

// Global events mapped to year
const events = [
  { year: "2020", label: "COVID-19", impact: "Negative" },
  { year: "2022", label: "Russia-Ukraine War", impact: "Inflation Spike" },
];

export default function EventAnalysis() {
  const [country, setCountry] = useState("India");
  const [data, setData] = useState([]);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const meta = countryMeta[country];

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      let res = await fetchGDPData(meta.code);

      // fallback if API fails
      if (!res || res.length === 0) {
        const fallback = {
          IN: [7, 8, 6, -7, 9, 7],
          US: [2, 1, 2, -3, 5, 2],
          CN: [6, 6, 5, 2, 8, 5],
        };

        const arr = fallback[meta.code] || fallback["IN"];

        res = arr.map((v, i) => ({
          year: (2018 + i).toString(),
          gdp: v,
        }));
      }

      setData(res);
      setLoading(false);
    };

    load();
  }, [country]);

  // 🔥 AI EVENT ANALYSIS
  const generateInsight = () => {
    if (data.length === 0) return;

    let text = "";

    const covidYear = data.find((d) => d.year === "2020");
    if (covidYear && covidYear.gdp < 0) {
      text += "🦠 COVID caused sharp GDP contraction.\n";
    }

    const recovery = data[data.length - 1].gdp;
    if (recovery > 5) {
      text += "🚀 Strong recovery observed after crisis.\n";
    }

    text += "🌍 Global events significantly impacted economic stability.";

    setInsight(text);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Event Analysis</h2>

      {/* COUNTRY SELECT */}
      <select
        className="p-2 border mb-4"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setInsight("");
        }}
      >
        {Object.keys(countryMeta).map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* GRAPH */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="font-bold mb-2">GDP vs Global Events</h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />

              <Line dataKey="gdp" stroke="#3b82f6" />

              {/* 🔥 EVENT MARKERS */}
              {events.map((event, i) => (
                <ReferenceDot
                  key={i}
                  x={event.year}
                  y={
                    data.find((d) => d.year === event.year)?.gdp || 0
                  }
                  r={6}
                  fill="red"
                  label={event.label}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* EVENTS LIST */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="font-bold mb-2">Key Events</h3>
        <ul>
          {events.map((e, i) => (
            <li key={i}>
              {e.year} — {e.label} ({e.impact})
            </li>
          ))}
        </ul>
      </div>

      {/* AI INSIGHT */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold mb-3">AI Event Insight</h3>

        <button
          onClick={generateInsight}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Analyze Impact
        </button>

        {insight && (
          <pre className="mt-3 whitespace-pre-line">
            {insight}
          </pre>
        )}
      </div>
    </div>
  );
}