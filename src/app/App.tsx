import { useState, type ReactNode } from "react";
import { MapPin, Clock, Utensils, Car, Fish, TreePine, Flame, ChevronDown, ChevronUp, ExternalLink, Users, Banknote } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// Verified Unsplash photo IDs
const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1650893737226-bdbf84b4c57e?w=1400&h=800&fit=crop&auto=format",
  day1: "https://images.unsplash.com/photo-1625426818317-95001074dc78?w=800&h=400&fit=crop&auto=format",
  day2: "https://images.unsplash.com/photo-1665138322353-10027b2190fa?w=800&h=400&fit=crop&auto=format",
  day3: "https://images.unsplash.com/photo-1597957729111-848ad99de4b5?w=800&h=400&fit=crop&auto=format",
  house: "https://images.unsplash.com/photo-1739281498278-00e47a49f0eb?w=800&h=360&fit=crop&auto=format",
  food: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&h=300&fit=crop&auto=format",
};

const DAY1 = [
  { time: "09:30–10:00", icon: <Car size={15} />, title: "Выезд Москва → Тула", desc: "189 км · бензин 2 000 ₽/машину", type: "travel" },
  {
    time: "13:00–14:30", icon: <span>🥨</span>, title: "Тульский пряник своими руками",
    desc: "Пряничный музей: МК, история, чаепитие со сладостями. 4 800 ₽ за 3 участников.",
    links: [
      { label: "Дом купчихи Жамкиной", url: "https://yandex.ru/maps/org/dom_kupchikhi_zhamkinoy/104063736848/" },
      { label: "mpryanika.com", url: "https://mpryanika.com/" },
    ], type: "activity",
  },
  {
    time: "15:00–16:00", icon: <Utensils size={15} />, title: "Обед (dog friendly)",
    desc: "Bary Бари или Bottega Italiana",
    links: [
      { label: "Bary Бари", url: "https://yandex.ru/maps/org/bary_bari/129940711185/" },
      { label: "Bottega Italiana", url: "https://yandex.ru/maps/-/CTEZEFM0" },
    ], type: "food",
  },
  {
    time: "16:00–17:00", icon: <MapPin size={15} />, title: "Прогулка (опционально)",
    desc: "Тульский кремль и набережная",
    links: [
      { label: "Тульский кремль", url: "https://yandex.ru/maps/org/tulskiy_kreml/184797932729/" },
      { label: "Набережная", url: "https://yandex.ru/maps/-/CTEVf-04" },
    ], type: "activity",
  },
  { time: "17:00–19:00", icon: <Car size={15} />, title: "Выезд Тула → Мценск", desc: "138 км · бензин 1 000 ₽/машину", type: "travel" },
  { time: "19:00–19:30", icon: <Utensils size={15} />, title: "Размещение & Ужин", desc: "Вареники с сыром, томатом и базиликом · соус сметана · Лимонад Натахтари · Белое вино", type: "food" },
  { time: "20:00–21:30", icon: <Fish size={15} />, title: "Вечерняя рыбалка", desc: "Река Зуша · хищник", type: "activity" },
  { time: "21:30–23:00", icon: <span>🎬</span>, title: "Кино со снеками / настольные игры", desc: "Лес, Кодовые имена, Манчкин · (опционально: уха на костре)", type: "evening" },
  { time: "23:00", icon: <span>🌙</span>, title: "Отбой", desc: "", type: "evening" },
];

const DAY2 = [
  { time: "09:00–10:00", icon: <span>🏃</span>, title: "Зарядка (опционально)", desc: "", type: "activity" },
  { time: "10:00–11:00", icon: <Utensils size={15} />, title: "Завтрак", desc: "Коломенские йогурты · Венские вафли с форелью, яйцом и творожным сыром · Чай/кофе · Тульский пряник", type: "food" },
  { time: "11:00–11:30", icon: <Car size={15} />, title: "Мценск → Николо-Вяземское", desc: "29 км · бензин 500 ₽/машину", type: "travel" },
  { time: "11:30–13:00", icon: <TreePine size={15} />, title: "Тихая охота", desc: "Сбор белых грибов и лисичек", type: "activity" },
  { time: "13:00–14:00", icon: <Utensils size={15} />, title: "Обед на природе", desc: "Шашлык курица/свинина · Печёный картофель с грибами", type: "food" },
  { time: "14:00–16:00", icon: <span>🏊</span>, title: "Отдых у воды", desc: "Река Чернь · купание · бадминтон · волейбол · фрисби", type: "activity" },
  {
    time: "16:00–17:00", icon: <MapPin size={15} />, title: "Экскурсия: Усадьба Толстых",
    desc: "Персональная экскурсия — Родовое имение семьи Толстых",
    links: [{ label: "Николо-Вяземское", url: "https://ypmuseum.ru/filials/nikolsko-vyasemskoe" }], type: "activity",
  },
  { time: "17:00–17:30", icon: <span>☕</span>, title: "Чай с плюшками", desc: "", type: "food" },
  { time: "17:30–18:00", icon: <Car size={15} />, title: "Возврат на базу", desc: "", type: "travel" },
  { time: "18:00–19:00", icon: <span>🌿</span>, title: "Свободное время", desc: "", type: "evening" },
  { time: "19:00–20:00", icon: <Utensils size={15} />, title: "Ужин", desc: "Уха / шашлыки с картофелем / Макароны по-флотски · Натахтари · Белое/красное вино", type: "food" },
  { time: "20:00–21:30", icon: <Fish size={15} />, title: "Вечерняя рыбалка", desc: "Река Зуша · хищник", type: "activity" },
  { time: "21:30–00:00", icon: <Flame size={15} />, title: "Банный чан / банька", desc: "4 000 ₽ · отдых у костра с чаем или напитками", type: "evening" },
  { time: "00:00", icon: <span>🌙</span>, title: "Отбой", desc: "", type: "evening" },
];

const DAY3 = [
  { time: "07:00–10:00", icon: <Fish size={15} />, title: "Рыбалка (опционально)", desc: "Выбор водоёма", type: "activity" },
  { time: "10:00–11:00", icon: <Utensils size={15} />, title: "Завтрак", desc: "Сырники · Бутерброды · Яйца · Чай/кофе", type: "food" },
  { time: "11:00–16:00", icon: <Car size={15} />, title: "Выезд в Москву", desc: "320 км · 4–5 часов · бензин 3 000 ₽/машину", type: "travel" },
];

const TYPE_ICON_BG: Record<string, string> = {
  travel:  "bg-[#4A2E0A] text-[#F5C878]",
  activity:"bg-[#0F3015] text-[#7ACD7A]",
  food:    "bg-[#4A1F08] text-[#FFAA55]",
  evening: "bg-[#1C1240] text-[#B8A0F0]",
};
const TYPE_DOT: Record<string, string> = {
  travel:  "bg-[#D4823C]",
  activity:"bg-[#4A7A4C]",
  food:    "bg-[#E09040]",
  evening: "bg-[#7A58C0]",
};

type Item = { time: string; icon: ReactNode; title: string; desc: string; type: string; links?: { label: string; url: string }[] };

function TimelineItem({ item, last }: { item: Item; last?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] ${TYPE_ICON_BG[item.type]}`}>
          {item.icon}
        </div>
        {!last && <div className="w-px flex-1 mt-1.5 bg-white/8" />}
      </div>
      <div className="pb-5 min-w-0">
        <p className="text-[10px] font-mono tracking-widest text-[#907050] uppercase mb-0.5 leading-none">{item.time}</p>
        <p className="text-[#F0E4CC] text-sm font-semibold leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</p>
        {item.desc && <p className="text-[#907868] text-xs mt-1 leading-relaxed">{item.desc}</p>}
        {item.links && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#7ACD7A] border border-[#4A7A4C]/50 rounded px-2 py-0.5 hover:bg-[#4A7A4C]/30 transition-colors">
                {l.label} <ExternalLink size={9} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DaySection({ day, title, date, items, photo }: { day: number; title: string; date: string; items: Item[]; photo: string }) {
  const [open, setOpen] = useState(day === 1);
  return (
    <div className="mb-6">
      <button onClick={() => setOpen(!open)} className="w-full text-left group">
        <div className="relative rounded-xl overflow-hidden bg-[#2A160A]" style={{ height: 160 }}>
          <ImageWithFallback src={photo} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0600]/90 via-[#0E0600]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-[#D4823C] uppercase mb-0.5">{date}</p>
            <h3 className="text-xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              День {day} — {title}
            </h3>
          </div>
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </div>
      </button>

      {open && (
        <div className="mt-2 bg-[#1E1008] rounded-xl p-4 border border-white/[0.07]">
          {items.map((item, i) => (
            <TimelineItem key={i} item={item} last={i === items.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [cars, setCars] = useState<1 | 2>(1);

  const accommodation = 16000;
  const food = 10000;
  const pryanik = 4800;
  const banya = 4000;
  const gasTotal = 6500 * cars;
  const total = accommodation + food + pryanik + banya + gasTotal;
  const perPerson = Math.ceil(total / 4);

  const costItems = [
    { label: "Проживание (дом, 2 ночи)", amount: accommodation, note: "4 участника · г. Мценск" },
    { label: "Питание (завтраки, обеды, ужины)", amount: food, note: "≈833 ₽/чел на приём пищи" },
    { label: "МК Тульский пряник", amount: pryanik, note: "3 участника (1 с собакой)" },
    { label: "Банный чан / банька", amount: banya, note: "вечер 14 июля" },
    { label: `Бензин · ${cars === 1 ? "1 машина" : "2 машины"}`, amount: gasTotal, note: "Москва → Тула → Мценск → Москва" },
  ];

  return (
    <div className="min-h-screen bg-[#130C05]" style={{ fontFamily: "'Lora', serif" }}>

      {/* ── HERO ── */}
      <div className="relative" style={{ minHeight: 500 }}>
        <ImageWithFallback src={PHOTOS.hero} alt="Русская деревня" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-[#130C05]" />

        <div className="relative z-10 max-w-2xl mx-auto px-5 pt-14 pb-16">
          <p className="text-[11px] tracking-[0.28em] text-[#D4823C] uppercase font-mono mb-4">
            Нарышкин и Ко · Путёвка «Орлы»
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.05] mb-4"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 3px 24px rgba(0,0,0,0.5)" }}>
            Тула. Мценск.<br /><em className="text-[#F5C878] not-italic italic">Природа.</em>
          </h1>
          <p className="text-white/75 text-base leading-relaxed max-w-md mb-6">
            Три дня среди древних городов, дремучих лесов и тихих рек Центральной России — 13–15 июля 2026.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: <Users size={12} />, label: "4 участника" },
              { icon: <Clock size={12} />, label: "13–15 июля 2026" },
              { icon: <MapPin size={12} />, label: "Тула · Мценск · Николо-Вяземское" },
            ].map((t) => (
              <span key={t.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs border border-white/15 font-mono">
                {t.icon} {t.label}
              </span>
            ))}
          </div>

          {/* City route pills */}
          <div className="flex gap-2 mt-8 overflow-x-auto pb-1">
            {[
              { city: "ТУЛА", sub: "Пряники · Кремль · Набережная", km: "189 км" },
              { city: "МЦЕНСК", sub: "Ночлег · Рыбалка · Баня", km: "+138 км" },
              { city: "НИКОЛО-ВЯЗЕМСКОЕ", sub: "Грибы · Усадьба Толстых · Чернь", km: "+29 км" },
            ].map((c) => (
              <div key={c.city}
                className="shrink-0 rounded-lg border border-[#D4823C]/40 bg-[#1E1008]/80 backdrop-blur-sm px-3.5 py-2.5">
                <p className="text-[9px] font-mono tracking-[0.2em] text-[#D4823C]">{c.km}</p>
                <p className="text-xs font-bold text-[#F0E4CC] leading-tight mt-0.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}>{c.city}</p>
                <p className="text-[10px] text-[#907868] mt-0.5">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-2xl mx-auto px-4 md:px-5 pb-12">

        {/* ACCOMMODATION */}
        <div className="rounded-2xl overflow-hidden border border-white/[0.09] bg-[#1E1008] mb-8 shadow-xl">
          <div className="relative overflow-hidden bg-[#2A160A]" style={{ height: 200 }}>
            <ImageWithFallback src={PHOTOS.house} alt="Деревенский дом" className="absolute inset-0 w-full h-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1008] via-[#1E1008]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[10px] font-mono tracking-widest text-[#F5C878] uppercase mb-1">Место проживания</p>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                4-комнатный дом · 60 м²
              </h2>
              <p className="text-white/60 text-sm mt-0.5">г. Мценск · 2 ночи</p>
            </div>
          </div>
          <div className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-[#907868] text-sm leading-relaxed">
              Уютный деревенский дом на берегу реки Зуша. Идеально для рыбалки, костра и баньки.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <p className="text-2xl font-bold text-[#F0E4CC]" style={{ fontFamily: "'Playfair Display', serif" }}>16 000 ₽</p>
                <p className="text-[11px] text-[#907868] font-mono">2 ночи · 4 чел.</p>
              </div>
              <a href="https://www.avito.ru/mtsensk/doma_dachi_kottedzhi/4-k._dom_60_m_4563192326"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#4A7A4C] text-[#F0E4CC] text-xs px-3.5 py-2 rounded-lg hover:bg-[#3A6A3C] transition-colors font-mono whitespace-nowrap">
                Avito <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>

        {/* PROGRAM */}
        <h2 className="text-2xl font-bold text-[#F0E4CC] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Программа тура
        </h2>

        <DaySection day={1} title="Тула — Мценск" date="13 июля 2026, понедельник" items={DAY1} photo={PHOTOS.day1} />
        <DaySection day={2} title="Николо-Вяземское — Усадьба Толстых" date="14 июля 2026, вторник" items={DAY2} photo={PHOTOS.day2} />
        <DaySection day={3} title="Возвращение в Москву" date="15 июля 2026, среда" items={DAY3} photo={PHOTOS.day3} />

        {/* COST CALCULATOR */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-white/[0.09] shadow-xl">

          {/* Header with photo */}
          <div className="relative bg-[#0A0500]" style={{ height: 140 }}>
            <ImageWithFallback src={PHOTOS.food} alt="Стол с едой" className="absolute inset-0 w-full h-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0500]/90" />
            <div className="relative z-10 h-full flex flex-col justify-end px-5 pb-4">
              <p className="text-[10px] font-mono tracking-widest text-[#D4823C] uppercase mb-0.5">Финансовый расчёт</p>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Итоговая стоимость
              </h2>
              <p className="text-white/50 text-xs font-mono mt-0.5">4 участника · 13–15 июля 2026</p>
            </div>
          </div>

          <div className="bg-[#120800] p-5">
            {/* Cars toggle */}
            <div className="mb-5">
              <p className="text-[10px] font-mono tracking-widest text-[#907050] uppercase mb-2">Количество машин</p>
              <div className="flex gap-2">
                {([1, 2] as const).map((n) => (
                  <button key={n} onClick={() => setCars(n)}
                    className={`flex-1 py-2 rounded-lg text-sm font-mono border transition-all duration-200 ${
                      cars === n
                        ? "bg-[#D4823C] border-[#D4823C] text-white"
                        : "bg-transparent border-[#3A2510] text-[#907050] hover:border-[#D4823C]/50"
                    }`}>
                    {n} {n === 1 ? "машина" : "машины"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost rows */}
            <div className="rounded-xl border border-white/[0.07] overflow-hidden mb-4">
              {costItems.map((item, i) => (
                <div key={i}
                  className={`flex items-center justify-between px-4 py-3 ${i < costItems.length - 1 ? "border-b border-white/[0.06]" : ""} ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                  <div className="min-w-0 mr-3">
                    <p className="text-[#D8C8A8] text-sm leading-snug">{item.label}</p>
                    <p className="text-[#706050] text-[11px] font-mono mt-0.5">{item.note}</p>
                  </div>
                  <p className="text-[#F5C878] font-mono font-semibold text-sm whitespace-nowrap">
                    {item.amount.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
              ))}
            </div>

            {/* Total box */}
            <div className="rounded-xl bg-[#D4823C]/10 border border-[#D4823C]/30 p-5">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-[#907050] uppercase">Итого на группу</p>
                  <p className="text-4xl font-black text-white mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {total.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono tracking-widest text-[#907050] uppercase">На человека</p>
                  <p className="text-2xl font-bold text-[#F5C878] mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ~{perPerson.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-3 border-t border-[#D4823C]/20">
                <Banknote size={13} className="text-[#D4823C] mt-0.5 shrink-0" />
                <p className="text-[#907868] text-xs leading-relaxed">
                  Питание 10 000 ₽ уже включено · бензин зависит от числа машин · МК пряника 4 800 ₽ на 3 участников
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LEGEND */}
        <div className="mt-4 bg-[#1A0E06] rounded-xl border border-white/[0.07] p-4">
          <p className="text-[10px] font-mono tracking-widest text-[#706050] uppercase mb-3">Обозначения</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { type: "travel", label: "Переезды" },
              { type: "activity", label: "Активности" },
              { type: "food", label: "Питание" },
              { type: "evening", label: "Вечер" },
            ].map((l) => (
              <div key={l.type} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${TYPE_DOT[l.type]}`} />
                <p className="text-sm text-[#907868]">{l.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 text-center">
          <div className="inline-block border border-[#D4823C]/30 rounded-2xl px-8 py-6">
            <p className="text-[10px] font-mono tracking-[0.28em] text-[#706050] uppercase mb-1">Организатор</p>
            <p className="text-xl font-bold text-[#F0E4CC]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Нарышкин и Ко
            </p>
            <p className="text-sm text-[#706050] mt-2 font-mono">Путёвка «Орлы» · 13–15 июля 2026</p>
            <div className="mt-4 w-12 h-px bg-[#D4823C]/30 mx-auto" />
            <p className="text-[11px] text-[#504030] mt-3 font-mono italic">Орлы умеют летать над рекой</p>
          </div>
        </div>
      </div>
    </div>
  );
}
