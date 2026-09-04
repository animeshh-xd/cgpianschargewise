import { useCallback, useEffect, useState } from "react";

export type ChargeWiseSession = {
  currentLocation: string;
  destination: string;
  battery: number;
  vehicle: string;
  connector: string;
  target: number;
  selectedStationId: string;
  reservationDate: string;
  reservationTime: string;
  reservationConfirmed: boolean;
  chargingComplete: boolean;
};

export const defaultSession: ChargeWiseSession = {
  currentLocation: "New Delhi, India",
  destination: "Connaught Place, New Delhi",
  battery: 23,
  vehicle: "Tata Nexon EV",
  connector: "CCS2",
  target: 80,
  selectedStationId: "tata-power-rajouri-garden",
  reservationDate: "Today",
  reservationTime: "7:30 PM",
  reservationConfirmed: false,
  chargingComplete: false,
};

const STORAGE_KEY = "chargewise:session";
const EVENT = "chargewise:session-change";

export function readSession(): ChargeWiseSession {
  if (typeof window === "undefined") return defaultSession;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSession;
    return { ...defaultSession, ...(JSON.parse(raw) as Partial<ChargeWiseSession>) };
  } catch {
    return defaultSession;
  }
}

export function writeSession(patch: Partial<ChargeWiseSession>) {
  if (typeof window === "undefined") return;
  const next = { ...readSession(), ...patch };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — prototype continues with in-memory state */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Reads the prototype session after hydration so SSR output stays stable. */
export function useSession() {
  const [session, setSession] = useState<ChargeWiseSession>(defaultSession);

  useEffect(() => {
    const sync = () => setSession(readSession());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((patch: Partial<ChargeWiseSession>) => {
    writeSession(patch);
  }, []);

  return [session, update] as const;
}
