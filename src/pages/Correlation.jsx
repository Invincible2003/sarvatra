import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { fetchGDPData, countryMeta } from "../api/fetchData";

export default function Correlation() {
  const [country, setCountry] = useState("India");
  const [data, setData] = useState([]);
  const [correlation, setCorrelation] = useState(0);
  const [insight, setInsight] = useState("");

  const meta = countryMeta[country];

  useEffect(() => {
    const load = async () => {
      let gdp = await fetchGDPData(meta.code);

      // fallback if API fails
      if (!gdp || gdp.length === 0) {
        const fallback = {
          IN: [7, 8, 6, -7, 9, 7],
          US: [2, 1, 2, -3, 5, 2],
          CN: [6, 6, 5, 2, 8, 5],
        };

        const arr = fallback[meta.code] || fallback["IN"];

        gdp = arr.map((v, i) => ({
          year: 2018 + i,
          gdp: v,
        }));
      }

      // simulate inflation variation per year
      const combined = gdp.map((d) => ({
        gdp: d.gdp,
        inflation: meta.inflation + (Math.random() * 2 - 1), // variation
      }));

      setData(combined);

      // 🔥 CALCULATE CORRELATION
      const corr = calculateCorrelation(combined);
      setCorrelation(corr);
    };

    load();
  }, [country]);

  // 📊 Pearson Correlation Formula
  const calculateCorrelation = (arr) => {
    const n = arr.length;

    const sumX = arr.reduce((s, d) => s + d.gdp, 0);
    const sumY = arr.reduce((s, d) => s + d.inflation, 0);

    const sumXY = arr.reduce((s, d) => s + d.gdp * d.inflation, 0);
    const sumX2 = arr.reduce((s, d) => s + d.gdp ** 2, 0);
    const sumY2 = arr.reduce((s, d) => s + d.inflation ** 2, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2)
    );

    return denominator === 0 ? 0 : numerator / denominator;
  };

  // 🤖 AI INTERPRETATION
  const generateInsight = () => {
    let text = "";

    if (correlation > 0.5) {
      text = "📈 Strong positive correlation: GDP and inflation rise together.";
    } else if (correlation < -0.5) {
      text = "📉 Strong negative correlation: GDP rises when inflation falls.";
    } else {
      text = "⚖️ Weak correlation: No strong relationship observed.";
    }

    text += `\n\n📊 Value: ${correlation.toFixed(2)}`;

    setInsight(text);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Correlation Analysis</h2>

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

      {/* SCATTER GRAPH */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="font-bold mb-2">GDP vs Inflation</h3>

        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <XAxis dataKey="gdp" name="GDP" />
            <YAxis dataKey="inflation" name="Inflation" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />

            <Scatter data={data} fill="#3b82f6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* CORRELATION VALUE */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="font-bold mb-2">Correlation Coefficient</h3>
        <p className="text-xl font-bold">
          {correlation.toFixed(2)}
        </p>
      </div>

      {/* AI INSIGHT */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold mb-3">AI Correlation Insight</h3>

        <button
          onClick={generateInsight}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Analyze Correlation
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