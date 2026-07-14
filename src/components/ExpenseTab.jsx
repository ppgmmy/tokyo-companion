import { useMemo, useState } from "react";
import { BarChart, DoughnutChart } from "./Charts";
import { EXPENSE_CATEGORIES, TRIP_DAYS } from "../data";

function formatJpy(n) {
  return `¥ ${Math.round(n).toLocaleString("ja-JP")}`;
}

function formatHkd(n) {
  return `HK$ ${n.toLocaleString("en-HK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ExpenseTab({
  expenses,
  setExpenses,
  rate,
  setRate,
  budget,
  setBudget,
}) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [rateInput, setRateInput] = useState(String(rate * 100));
  const [budgetInput, setBudgetInput] = useState(String(budget));
  const [filterCat, setFilterCat] = useState("all");

  const totalJpy = expenses.reduce((s, e) => s + e.jpy, 0);
  const totalHkd = totalJpy * rate;
  const avgDaily = totalJpy / TRIP_DAYS;
  const remaining = budget - totalJpy;

  const catTotals = useMemo(() => {
    const map = Object.fromEntries(EXPENSE_CATEGORIES.map((c) => [c.id, 0]));
    expenses.forEach((e) => {
      map[e.categoryId || "other"] = (map[e.categoryId || "other"] || 0) + e.jpy;
    });
    return map;
  }, [expenses]);

  const topCat = EXPENSE_CATEGORIES.map((c) => ({ ...c, total: catTotals[c.id] || 0 })).sort(
    (a, b) => b.total - a.total
  )[0];

  const doughnut = EXPENSE_CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    color: c.color,
    value: catTotals[c.id] || 0,
  }));

  const dayBars = useMemo(() => {
    const bars = Array.from({ length: TRIP_DAYS }, (_, i) => ({
      id: `d${i + 1}`,
      label: `D${i + 1}`,
      value: 0,
    }));
    expenses.forEach((e) => {
      const dayIndex = Math.min(TRIP_DAYS - 1, Math.max(0, (e.dayIndex || 1) - 1));
      bars[dayIndex].value += e.jpy;
    });
    return bars;
  }, [expenses]);

  const filtered = expenses.filter(
    (e) => filterCat === "all" || e.categoryId === filterCat
  );

  function selectCat(id) {
    setCategoryId(id);
    const cat = EXPENSE_CATEGORIES.find((c) => c.id === id);
    if (cat) setNote(cat.note);
  }

  function addExpense(e) {
    e.preventDefault();
    const jpy = Number(amount);
    if (!Number.isFinite(jpy) || jpy <= 0) return;
    setExpenses((prev) => [
      {
        id: crypto.randomUUID(),
        jpy,
        hkd: jpy * rate,
        note: note.trim() || "未命名",
        categoryId: categoryId || "other",
        dayIndex: Math.min(TRIP_DAYS, Math.max(1, new Date().getDay() || 1)),
        createdAt: Date.now(),
      },
      ...prev,
    ]);
    setAmount("");
    setNote("");
    setCategoryId(null);
  }

  function applyRate() {
    const per100 = Number(rateInput);
    if (!Number.isFinite(per100) || per100 <= 0) {
      alert("請輸入有效匯率（100 JPY = ? HKD）");
      return;
    }
    setRate(per100 / 100);
  }

  function applyBudget() {
    const value = Number(budgetInput);
    if (!Number.isFinite(value) || value < 0) {
      alert("請輸入有效預算");
      return;
    }
    setBudget(value);
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold text-ink">開支儀表板</h2>
        <p className="text-sm text-ink-soft">JPY → HKD · 興趣獵寶也算進去</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/85 p-3 shadow-[var(--shadow-soft)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">總支出 JPY</p>
          <p className="mt-1 font-display text-lg font-bold">{formatJpy(totalJpy)}</p>
          <p className="text-xs text-ink-soft">{formatHkd(totalHkd)}</p>
        </div>
        <div className="rounded-2xl bg-white/85 p-3 shadow-[var(--shadow-soft)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">剩餘預算</p>
          <p className={`mt-1 font-display text-lg font-bold ${remaining < 0 ? "text-rose-brand" : "text-teal"}`}>
            {formatJpy(remaining)}
          </p>
        </div>
        <div className="rounded-2xl bg-white/85 p-3 shadow-[var(--shadow-soft)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">日均</p>
          <p className="mt-1 font-display text-lg font-bold">{formatJpy(avgDaily)}</p>
          <p className="text-xs text-ink-soft">{formatHkd(avgDaily * rate)}</p>
        </div>
        <div className="rounded-2xl bg-white/85 p-3 shadow-[var(--shadow-soft)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">最高分類</p>
          <p className="mt-1 font-display text-lg font-bold">{topCat?.total ? topCat.label : "—"}</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white/85 p-4 shadow-[var(--shadow-soft)]">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">本趟預算（JPY）</span>
          <div className="flex gap-2">
            <input
              type="number"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              className="w-full min-h-12 rounded-2xl border border-rose-soft bg-mist px-4 outline-none ring-rose-brand focus:ring-2"
            />
            <button type="button" onClick={applyBudget} className="min-h-12 rounded-2xl bg-teal px-4 text-sm font-bold text-white">
              套用
            </button>
          </div>
        </label>
        <label className="mt-3 block">
          <span className="mb-1.5 block text-sm font-semibold">匯率（100 JPY = ? HKD）</span>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              value={rateInput}
              onChange={(e) => setRateInput(e.target.value)}
              className="w-full min-h-12 rounded-2xl border border-rose-soft bg-mist px-4 outline-none ring-rose-brand focus:ring-2"
            />
            <button type="button" onClick={applyRate} className="min-h-12 rounded-2xl bg-rose-brand px-4 text-sm font-bold text-white">
              套用
            </button>
          </div>
          <p className="mt-1 text-xs text-ink-faint">目前 1 JPY = {rate.toFixed(4)} HKD</p>
        </label>
      </div>

      <div className="rounded-3xl bg-white/85 p-4 shadow-[var(--shadow-soft)]">
        <h3 className="mb-3 font-display text-sm font-bold">分類佔比</h3>
        <DoughnutChart segments={doughnut} />
      </div>

      <div className="rounded-3xl bg-white/85 p-4 shadow-[var(--shadow-soft)]">
        <h3 className="mb-3 font-display text-sm font-bold">每日開支比較</h3>
        <BarChart bars={dayBars} />
      </div>

      <form onSubmit={addExpense} className="space-y-3 rounded-3xl bg-white/85 p-4 shadow-[var(--shadow-soft)]">
        <div>
          <p className="mb-1.5 text-sm font-semibold">快速分類</p>
          <div className="flex flex-wrap gap-2">
            {EXPENSE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCat(cat.id)}
                className={`cat-btn min-h-10 rounded-2xl border border-rose-soft bg-mist px-3 text-xs font-bold text-ink-soft ${categoryId === cat.id ? "is-active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">金額（JPY）</span>
          <input
            required
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="例如 1280"
            className="w-full min-h-12 rounded-2xl border border-rose-soft bg-mist px-4 outline-none ring-rose-brand focus:ring-2"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">項目／備註</span>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={60}
            placeholder="點分類或自行輸入"
            className="w-full min-h-12 rounded-2xl border border-rose-soft bg-mist px-4 outline-none ring-rose-brand focus:ring-2"
          />
        </label>
        <p className="rounded-2xl bg-rose-soft px-4 py-3 text-sm text-ink-soft">
          換算預覽：
          {Number(amount) > 0 ? `${formatJpy(Number(amount))} ≈ ${formatHkd(Number(amount) * rate)}` : "—"}
        </p>
        <button type="submit" className="flex w-full min-h-12 items-center justify-center rounded-2xl bg-rose-brand text-base font-bold text-white active:scale-[0.98]">
          加入開支
        </button>
      </form>

      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">依分類篩選</p>
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            className={`filter-chip border ${filterCat === "all" ? "is-active" : ""}`}
            onClick={() => setFilterCat("all")}
          >
            全部
          </button>
          {EXPENSE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`filter-chip border ${filterCat === c.id ? "is-active" : ""}`}
              onClick={() => setFilterCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-ink-soft">{filtered.length} 筆</p>
          <button
            type="button"
            className="min-h-10 rounded-2xl border border-rose-soft px-3 text-xs font-semibold text-ink-soft"
            onClick={() => {
              if (expenses.length && confirm("清空所有開支？")) setExpenses([]);
            }}
          >
            清空
          </button>
        </div>
        <ul className="space-y-2">
          {!filtered.length && (
            <li className="rounded-2xl border border-dashed border-rose-soft px-4 py-8 text-center text-sm text-ink-faint">
              還沒有紀錄，從第一杯咖啡或 PARCO 開始吧。
            </li>
          )}
          {filtered.map((entry) => (
            <li key={entry.id} className="flex items-center gap-3 rounded-2xl bg-white/85 px-4 py-3 shadow-[var(--shadow-soft)]">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">{entry.note}</p>
                <p className="text-xs text-ink-faint">
                  {EXPENSE_CATEGORIES.find((c) => c.id === entry.categoryId)?.label || "其他"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-rose-brand">{formatHkd(entry.jpy * rate)}</p>
                <p className="text-xs text-ink-soft">{formatJpy(entry.jpy)}</p>
              </div>
              <button
                type="button"
                className="min-h-10 min-w-10 text-ink-faint"
                onClick={() => setExpenses((prev) => prev.filter((x) => x.id !== entry.id))}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

