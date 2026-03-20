import { useEffect, useState } from "react";

interface CurrentWeather {
  temperature: number;
  weathercode: number;
}

const JOHNSTON_LAT = 41.824;
const JOHNSTON_LON = -71.516;
const REFRESH_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

const weatherDescriptions: Record<number, string> = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  56: "Freezing Drizzle",
  57: "Freezing Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  66: "Freezing Rain",
  67: "Freezing Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Light Showers",
  81: "Showers",
  82: "Heavy Showers",
  85: "Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

function getWeatherDescription(code: number): string {
  return weatherDescriptions[code] ?? "Unknown";
}

function WeatherDisplay() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${JOHNSTON_LAT}&longitude=${JOHNSTON_LON}&current_weather=true&temperature_unit=fahrenheit`,
          { signal: controller.signal },
        );
        if (!res.ok) return;
        const data = await res.json();
        setWeather(data.current_weather);
      } catch {
        // Silently ignore fetch errors — weather is non-essential
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, REFRESH_INTERVAL_MS);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  if (!weather) return null;

  const description = getWeatherDescription(weather.weathercode);

  return (
    <p
      role="status"
      aria-label={`Current weather in Johnston: ${Math.round(weather.temperature)} degrees Fahrenheit, ${description}`}
      className="flex items-center gap-1.5 text-sm text-gray-600"
    >
      <span className="font-medium text-gray-700">
        {Math.round(weather.temperature)}°F
      </span>
      <span className="hidden sm:inline">{description}</span>
    </p>
  );
}

export default WeatherDisplay;
