import { useMemo } from "react";
import BottomNav from "./components/BottomNav";
import CafeLogTab from "./components/CafeLogTab";
import ChecklistTab from "./components/ChecklistTab";
import ExpenseTab from "./components/ExpenseTab";
import ItineraryTab from "./components/ItineraryTab";
import { CHECKLIST, DEFAULT_BUDGET_JPY, DEFAULT_RATE, ITINERARY, normalizeExpense } from "./data";
import { useExchangeRate } from "./hooks/useExchangeRate";
import { useLocalStorage } from "./hooks/useLocalStorage";

function emptyChecklist() {
  const next = {};
  CHECKLIST.forEach((group) => {
    group.items.forEach((item) => {
      next[item.id] = false;
    });
  });
  return next;
}

function normalizeRate(saved) {
  if (saved && typeof saved === "object" && typeof saved.hkdPerJpy === "number") {
    return saved;
  }
  if (typeof saved === "number" && saved > 0) {
    return { hkdPerJpy: saved, source: "fallback", lastUpdated: null };
  }
  return { hkdPerJpy: DEFAULT_RATE, source: "fallback", lastUpdated: null };
}

function useNormalizedExpenses() {
  const [raw, setRaw] = useLocalStorage("tokyo-companion:expenses-v2", []);
  const expenses = Array.isArray(raw)
    ? raw.map((e) => normalizeExpense(e, DEFAULT_RATE))
    : [];
  function setExpenses(updater) {
    setRaw((prev) => {
      const base = Array.isArray(prev) ? prev.map((e) => normalizeExpense(e, DEFAULT_RATE)) : [];
      const next = typeof updater === "function" ? updater(base) : updater;
      return (Array.isArray(next) ? next : []).map((e) => normalizeExpense(e, DEFAULT_RATE));
    });
  }
  return [expenses, setExpenses];
}

export default function App() {
  const [tab, setTab] = useLocalStorage("tokyo-companion:tab", "itinerary");
  const [week, setWeek] = useLocalStorage("tokyo-companion:week", 1);
  const [dayId, setDayId] = useLocalStorage("tokyo-companion:day", ITINERARY[0].id);
  const [checked, setChecked] = useLocalStorage("tokyo-companion:checklist-v2", emptyChecklist);
  const [cafes, setCafes] = useLocalStorage("tokyo-companion:cafes-v2", []);
  const [expenses, setExpenses] = useNormalizedExpenses();
  const [rateState, setRateState] = useLocalStorage(
    "tokyo-companion:rate-v2",
    normalizeRate(null)
  );
  const [budget, setBudget] = useLocalStorage("tokyo-companion:budget", DEFAULT_BUDGET_JPY);

  const { status: fxStatus, refresh, applyManual } = useExchangeRate(rateState, setRateState);

  const panel = useMemo(() => {
    switch (tab) {
      case "checklist":
        return <ChecklistTab checked={checked} setChecked={setChecked} />;
      case "cafelog":
        return <CafeLogTab cafes={cafes} setCafes={setCafes} />;
      case "expense":
        return (
          <ExpenseTab
            expenses={expenses}
            setExpenses={setExpenses}
            rateState={rateState}
            budget={budget}
            setBudget={setBudget}
            fxStatus={fxStatus}
            onRefreshRate={refresh}
            onApplyManualRate={applyManual}
          />
        );
      default:
        return (
          <ItineraryTab dayId={dayId} setDayId={setDayId} week={week} setWeek={setWeek} />
        );
    }
  }, [
    tab,
    checked,
    cafes,
    expenses,
    rateState,
    budget,
    dayId,
    week,
    fxStatus,
    setChecked,
    setCafes,
    setExpenses,
    setBudget,
    setDayId,
    setWeek,
    refresh,
    applyManual,
  ]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-travel" />
      <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-rose-soft/80 blur-3xl" />
      <div className="pointer-events-none absolute top-48 -left-20 h-56 w-56 rounded-full bg-teal-soft/70 blur-3xl" />

      <header className="safe-top px-5 pt-5 pb-3">
        <div className="mx-auto max-w-lg">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-brand">
            Tokyo Companion
          </p>
          <h1 className="mt-1 font-display text-[1.85rem] font-extrabold leading-tight text-ink">
            東京旅行助手
          </h1>
          <p className="mt-1 text-sm text-ink-soft">原宿 · 澀谷 · 8/7 – 9/6 長住</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-[calc(6.75rem+env(safe-area-inset-bottom))]">
        {panel}
      </main>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}
