import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultSiteData, type SiteData } from "@/data/site-data";

const STORAGE_KEY = "skki:site-data:v1";

type SiteStore = {
  data: SiteData;
  update: (patch: Partial<SiteData>) => void;
  reset: () => void;
};

const SiteContext = createContext<SiteStore | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...defaultSiteData, ...(JSON.parse(raw) as SiteData) });
    } catch {
      /* ignore corrupt local data */
    }
  }, []);

  const update = useCallback((patch: Partial<SiteData>) => {
    setData((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    setData(defaultSiteData);
  }, []);

  const value = useMemo(() => ({ data, update, reset }), [data, update, reset]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}