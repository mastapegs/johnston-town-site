import { useEffect, useState } from "react";

const STORAGE_KEY = "user-location";

interface UserLocation {
  lat: number;
  lng: number;
}

function loadCached(): UserLocation | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.lat === "number" && typeof parsed.lng === "number") {
      return parsed as UserLocation;
    }
  } catch {
    // Ignore corrupt data
  }
  return null;
}

export function useUserLocation(): UserLocation | null {
  const [location, setLocation] = useState<UserLocation | null>(loadCached);

  useEffect(() => {
    if (location) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setLocation(loc);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
        } catch {
          // Storage full or unavailable — ignore
        }
      },
      () => {
        // Permission denied or error — continue without user marker
      },
    );
  }, [location]);

  return location;
}
