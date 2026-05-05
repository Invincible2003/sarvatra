// Always return NEW array and ensure enough records
export const fetchGDPData = async (countryCode) => {
  try {
    const res = await fetch(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=60`
    );

    const json = await res.json();

    if (!json || !json[1]) return [];

    const cleaned = json[1]
      .filter((d) => d.value !== null)
      .slice(0, 10)
      .map((d) => ({
        year: d.date,
        gdp: Number(d.value.toFixed(2)),
      }))
      .reverse();

    return [...cleaned]; // force new reference
  } catch (err) {
    console.error("API ERROR:", err);
    return [];
  }
};

// IMPORTANT: use correct ISO country codes
export const countryMeta = {
  India: { code: "IN", inflation: 6.7, growth: "Growth", year: 2022 },
  USA: { code: "US", inflation: 8.0, growth: "Stable", year: 2022 },
  China: { code: "CN", inflation: 2.0, growth: "Moderate", year: 2022 },
  Germany: { code: "DE", inflation: 7.5, growth: "Stable", year: 2022 },
  UK: { code: "GB", inflation: 9.0, growth: "Slow", year: 2022 },
  Japan: { code: "JP", inflation: 3.0, growth: "Low", year: 2022 },
  Brazil: { code: "BR", inflation: 8.5, growth: "Volatile", year: 2022 },
  Canada: { code: "CA", inflation: 6.8, growth: "Stable", year: 2022 },
};