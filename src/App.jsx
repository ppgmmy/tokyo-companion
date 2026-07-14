import { useMemo, useState } from "react";
import BottomNav from "./components/BottomNav";
import CafeLogTab from "./components/CafeLogTab";
import ChecklistTab from "./components/ChecklistTab";
import ExpenseTab from "./components/ExpenseTab";
import ItineraryTab from "./components/ItineraryTab";
import { CHECKLIST, DEFAULT_BUDGET_JPY, DEFAULT_RATE, ITINERARY } from "./data";
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

export default function App() {
  const [tab, setTab] = useLocalStorage("tokyo-companion:tab", "itinerary");
  const [dayId, setDayId] = useLocalStorage("tokyo-companion:day", ITINERARY[0].id);
  const [checked, setChecked] = useLocalStorage("tokyo-companion:checklist", emptyChecklist);
  const [cafes, setCafes] = useLocalStorage("tokyo-companion:cafes", []);
  const [expenses, setExpenses] = useLocalStorage("tokyo-companion:expenses", []);
  const [rate, setRate] = useLocalStorage("tokyo-companion:rate", DEFAULT_RATE);
  const [budget, setBudget] = useLocalStorage("tokyo-companion:budget", DEFAULT_BUDGET_JPY);

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
            rate={rate}
            setRate={setRate}
            budget={budget}
            setBudget={setBudget}
          />
        );
      default:
        return <ItineraryTab dayId={dayId} setDayId={setDayId} />;
    }
  }, [tab, checked, cafes, expenses, rate, budget, dayId, setChecked, setCafes, setExpenses, setRate, setBudget, setDayId]);

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
          <p className="mt-1 text-sm text-ink-soft">原宿 · 澀谷 · 7 日步行節奏</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-[calc(6.75rem+env(safe-area-inset-bottom))]">
        {panel}
      </main>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}
