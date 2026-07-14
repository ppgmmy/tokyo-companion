import { useState } from "react";
import { ITINERARY, PLACES, mapsLink } from "../data";

function MapButton({ query }) {
  if (!query) return null;
  return (
    <a
      href={mapsLink(query)}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-teal-soft px-3 text-xs font-bold text-teal active:scale-95 transition"
    >
      在地圖查看
    </a>
  );
}

export default function ItineraryTab({ dayId, setDayId }) {
  const [placeFilter, setPlaceFilter] = useState("near");
  const day = ITINERARY.find((d) => d.id === dayId) || ITINERARY[0];

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#9f1239] via-rose-brand to-[#fb7185] p-5 text-white shadow-[var(--shadow-soft)]">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-white/75">Base area</p>
            <p className="font-display text-2xl font-extrabold tracking-tight">原宿 · 澀谷</p>
            <p className="mt-1 text-sm text-white/80">Tokyo · 步行圈為主</p>
          </div>
          <div className="rounded-2xl bg-white/15 px-3 py-2 text-right backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-wider text-white/70">Days</p>
            <p className="font-display text-lg font-bold">07</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-2xl bg-white/12 px-3 py-2">
            <p className="font-bold">95% 步行可達</p>
            <p className="mt-0.5 text-white/75">原宿／澀谷核心</p>
          </div>
          <div className="rounded-2xl bg-white/12 px-3 py-2">
            <p className="font-bold">5% 遠征</p>
            <p className="mt-0.5 text-white/75">地鐵一日遊</p>
          </div>
        </div>
      </div>

      <section>
        <h2 className="font-display text-lg font-bold text-ink">附近推薦</h2>
        <p className="mb-3 text-xs text-ink-soft">以澀谷／原宿為圓心</p>
        <div className="mb-3 grid grid-cols-2 gap-1 rounded-2xl bg-white/80 p-1 shadow-[var(--shadow-soft)]">
          <button
            type="button"
            className={`place-filter min-h-11 rounded-xl text-xs font-bold transition ${placeFilter === "near" ? "is-active" : "text-ink-faint"}`}
            onClick={() => setPlaceFilter("near")}
          >
            步行圈 · 95%
          </button>
          <button
            type="button"
            className={`place-filter min-h-11 rounded-xl text-xs font-bold transition ${placeFilter === "expedition" ? "is-active" : "text-ink-faint"}`}
            onClick={() => setPlaceFilter("expedition")}
          >
            遠征 · 5%
          </button>
        </div>
        <div className="space-y-2">
          {PLACES.filter((p) => p.zone === placeFilter).map((place) => (
            <article key={place.id} className="rounded-2xl bg-white/85 px-4 py-3 shadow-[var(--shadow-soft)]">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${place.zone === "near" ? "zone-near" : "zone-expedition"}`}>
                  {place.category}
                </span>
                <span className="text-[10px] font-semibold text-ink-faint">{place.transit}</span>
              </div>
              <h3 className="font-display text-[15px] font-bold text-ink">{place.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{place.detail}</p>
              <MapButton query={place.mapsQuery} />
            </article>
          ))}
        </div>
      </section>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-ink">選擇日期</span>
        <select
          value={day.id}
          onChange={(e) => setDayId(e.target.value)}
          className="w-full min-h-12 appearance-none rounded-2xl border border-rose-soft bg-white/90 px-4 text-base font-medium outline-none ring-rose-brand focus:ring-2"
        >
          {ITINERARY.map((d) => (
            <option key={d.id} value={d.id}>
              Day {d.day} · {d.mode === "expedition" ? "遠征 · " : ""}
              {d.title}
            </option>
          ))}
        </select>
      </label>

      <div>
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-brand font-display text-sm font-bold text-white shadow-[var(--shadow-soft)]">
            D{day.day}
          </div>
          <div>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${day.mode === "near" ? "zone-near" : "zone-expedition"}`}>
              {day.mode === "near" ? "步行圈" : "遠征 5%"}
            </span>
            <h3 className="mt-1 font-display text-lg font-bold text-ink">{day.title}</h3>
            <p className="text-sm text-ink-soft">{day.vibe}</p>
          </div>
        </div>
        <ol className="relative ml-5 space-y-4 border-l-2 border-rose-soft pl-6">
          {day.items.map((entry, i) => (
            <li key={`${day.id}-${i}`} className="relative">
              <span
                className={`absolute -left-[1.95rem] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-white shadow-sm ${
                  entry.zone === "expedition" ? "bg-rose-brand" : "bg-teal"
                }`}
              />
              <div className="rounded-2xl bg-white/85 p-4 shadow-[var(--shadow-soft)]">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <time className="text-xs font-bold tracking-wide text-teal">{entry.time}</time>
                  <span className="rounded-full bg-rose-soft px-2.5 py-0.5 text-[10px] font-semibold text-rose-deep">
                    {entry.tag}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-ink">{entry.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{entry.detail}</p>
                <MapButton query={entry.mapsQuery} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
