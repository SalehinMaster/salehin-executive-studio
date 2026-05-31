"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CalendlyContextValue = {
  isCalendlyOpen: boolean;
  openCalendly: () => void;
  closeCalendly: () => void;
};

const CalendlyContext = createContext<CalendlyContextValue | null>(null);

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const openCalendly = useCallback(() => {
    setIsCalendlyOpen(true);
  }, []);

  const closeCalendly = useCallback(() => {
    setIsCalendlyOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isCalendlyOpen,
      openCalendly,
      closeCalendly,
    }),
    [isCalendlyOpen, openCalendly, closeCalendly],
  );

  return (
    <CalendlyContext.Provider value={value}>{children}</CalendlyContext.Provider>
  );
}

export function useCalendly() {
  const context = useContext(CalendlyContext);
  if (!context) {
    throw new Error("useCalendly must be used within CalendlyProvider");
  }
  return context;
}
