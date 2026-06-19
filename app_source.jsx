const { useState, useCallback, useMemo, useEffect } = React;
const MP_LOGO_B64 =
  'data:image/png;base64,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mpra2loAUKlUGIYJhUKJRCISiQQCga+v78iRI1u1alRmw/iupJyKw+H4+jakromNjR02jFr+Ra1W//rrrwqFQi6XK5VKrVb7888/G3fJZLJt27bZuM++ffu2bGm1NO93331XWVkJAHV1dZRwKblcjuP4q6++au3/6wQIN2IwGEQiEWbG8OHDaVsuX74ca8zNmzdpW6pUqsWLF3M4HMw6HA5n/vz51dXVlod//PHHfJsIhcJFixZpNBrzowoLCymXiIiIKC0tpb3DvLw8SuOysjLjrmvXrvmbERwcbDAYjLuWLVsmbEznzp3r6+tpL7Fnzx7zlmPGjLFsc/PmzU6dOnFtEhYWtnfvXtpLWOObb74R2yM8PPzAgQPmR61YsYJjj9GjR1dVVZkfVVZWFmZGREQEjuPGXbdu3eLZRCAQTJs2zdr/KC0tDbHJd99959DX4hBunRMWFBRoNI0Ka508ebK6mlqLlyTJv/76i7IxLy8PLKitre3bt++qVatsB3uSJPnrr7/279+/tNThiisEQfz888/Tpk0z72MtS5FVVlbOmzeP9jb4fGrsD/EwcoXSPjAwEEVRShsT2dnZH374Ie1NqtWN0mNa3saZM2cGDBhw44adGgG1tbXPPPPMxo0bbTdzFKVSOWPGjEuXLpm2mD6mDQ4ePPjUU09RPpo5BEEYRy4AoNPZSU9IEMS2bds6dux48GBTMtZUVVU14SiGuFWEOTk5lC0Gg2HPnj2UjRkZGffvU9O8WopQqVSOHj362jVGGYEB4M6dO0OGDCkra0rmvL17965Zs8b0J209wEOHDv3444+W2y1H0TjeEENMUYtxjEppY86PP/64f/9+y+22RZiXl/fMM8/IZIzCbQmCWLhw4b59+5g0BsalETUazdy5c02aYXhUZmamcVZiDdMHtytCI1KpdNKkSTt37mTS2BzTONkVuFWEllMRANi1axdly59//mnZzFKWy5YtM3+5MiE3N3fBggW220RGRrZt29byKfnqq69MD7e1F/mSJUuysrIoG230hBTML0orQpIkX3rppfLycsp208NteX6CIObOnSuVUktHpKSkLFu2bPr06aGh1OSFOI7PnTuX4ajB8ovq1q2bvz9NadeCggLTAMfyCwwODk5OTsYwahK3devW6fUNgcKWPbxK1VA0ivIN2ECv18+bN8/y32SbiIgIh9o7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';
const CATALOG = window.CATALOG;
const parsePrice = (p) => {
  if (!p || p === 'TBD') return null;
  const n = parseFloat(p.replace(/[$,]/g, ''));
  return isNaN(n) ? null : n;
};
const fmtMoney = (n) => {
  if (n == null) return 'TBD';
  const sign = n < 0 ? '-' : '';
  return (
    sign +
    '$' +
    Math.abs(n)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
};
// Pant items from the V4 catalog carry a separate price per materials grade
// (priceStd / pricePrm) instead of a single price string. This resolves the
// correct one for the currently-selected grade, falling back to whichever is
// available if that specific row doesn't have a price for the active grade.
// Items without these fields (coat, suspenders, PFP-native) fall through to
// the original single price string unchanged, so this is a safe drop-in
// replacement for parsePrice(item.price) everywhere pricing is summed/shown.
const resolveItemPrice = (item, grade) => {
  if (item.priceStd != null || item.pricePrm != null) {
    if (grade === 'prm') return item.pricePrm != null ? item.pricePrm : item.priceStd;
    return item.priceStd != null ? item.priceStd : item.pricePrm;
  }
  return parsePrice(item.price);
};
// Many cleaned-catalog items share an identical display SKU (a single "New
// Kit #" can cover several color/material variants, or simply wasn't
// re-coded item-by-item) while the original "Legacy Kit #" stays unique per
// row. Appending it in parentheses whenever it differs from the SKU is what
// lets someone tell two otherwise-identical-looking rows apart.
const skuLabel = (item) => {
  const sku = item.sku || '';
  if (item.legacySku && item.legacySku !== item.sku) {
    return sku ? sku + ' (' + item.legacySku + ')' : item.legacySku;
  }
  return sku;
};
const MATCH_CATS = new Set(['Outershell Material', 'Moisture Barrier', 'Thermal Liner']);

// ─── PFP/LTO Pant Merge ───────────────────────────────────────────────────────
// LTO pant categories that have no exact-name equivalent in PFP. When PFP is
// selected, these still show (as a fallback) so nothing available under LTO
// becomes unreachable just because PFP was picked as the pant type.
const LTO_ONLY_PANT_CATEGORIES = (() => {
  const pfpSet = new Set(CATALOG.pfp.categories);
  return new Set(CATALOG.lto.categories.filter((c) => !pfpSet.has(c)));
})();

// Builds the combined list of selected+priced pant items for totals/Overview/PDF:
// the pant type's own selected items, plus (when PFP is active) any selected
// items from the LTO-only fallback categories. Each item gets a `.grade`
// ('std' | 'prm') attached from the per-item grades map, since pricing is now
// chosen per item rather than from one global toggle.
function getCombinedPantItems(pantType, sels, qtys, grades = {}) {
  const own = ((CATALOG[pantType] && CATALOG[pantType].items) || []).flatMap((item, i) => {
    const key = 'pant||' + item.category + '||' + i;
    return sels[key] ? [{ ...item, qty: qtys[key] ?? 1, grade: grades[key] ? 'prm' : 'std' }] : [];
  });
  const extra =
    pantType === 'pfp'
      ? CATALOG.lto.items.flatMap((item, i) => {
          if (!LTO_ONLY_PANT_CATEGORIES.has(item.category)) return [];
          const key = 'pant||' + item.category + '||' + i;
          return sels[key]
            ? [{ ...item, qty: qtys[key] ?? 1, grade: grades[key] ? 'prm' : 'std' }]
            : [];
        })
      : [];
  return [...own, ...extra];
}

// ─── Diagram Lookup: SKU → Technical Manual Page(s) ──────────────────────────
const MANUAL_PDF_URL =
  'https://www.dropbox.com/scl/fi/lshb68c7h1sugwwuxfn10/HFR-product-Tech-Pak.pdf?rlkey=zealc0lu3uof2yv4na6xtnhpn&raw=1';
const MANUAL_PAGE_IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/SteveHTG/MP_GEAR_BUILDER/main/page_';
const SKU_PAGE_MAP_URL =
  'https://raw.githubusercontent.com/SteveHTG/Tails_Builder/main/sku_page_map.json';
const CROSS_REFERENCE_URL =
  'https://raw.githubusercontent.com/SteveHTG/Tails_Builder/main/cross_reference.json';
const normalizeSku = (s) => (s == null ? '' : String(s).trim().toUpperCase());
function buildNormalizedMap(raw) {
  const out = {};
  Object.keys(raw || {}).forEach((k) => {
    out[normalizeSku(k)] = raw[k];
  });
  return out;
}
const DiagramContext = React.createContext(null);

// ─── Category ordering & nesting config ──────────────────────────────────────
// For coat: OS → TL → MB first, then rest alphabetical
// Layer order: Outershell Material, Thermal Liner, Moisture Barrier
const COAT_PRIORITY = ['Outershell Material', 'Thermal Liner', 'Moisture Barrier'];

// Coat pocket sub-categories (nested under "Pockets" parent)
const COAT_POCKET_SUBS = new Set([
  'Pockets',
  'Tool Divider Opts',
  'Handwarmer w Bellows Option',
  'Liner Pkt In Bellows Opts',
  'Tool Pouch',
  'EZ Grip Flap',
  "Lining/Reinf Mat'l",
  'Velcro Add Ons Bellows',
  'Custom Snap Opts',
  'Handwarmer Pockets',
  'Patch Pockets',
  'Radio Pockets',
  'Radio Pocket Options',
  'Internal Cell Pocket',
  'Flashlight Pocket',
  'Airmask Pocket Options',
  'Misc Pockets and Options',
  'Undershield Pockets',
  'Bandolero Pocket',
  'Escape Canister',
  'Tool Holders',
  'Flat Tool Pocket',
  'Knife Pouch',
  'Cutting Tool Holder',
  'Notebook Pocket',
  'Shield Pocket Options',
]);

// DRD sub-categories
const DRD_SUBS = new Set([
  'DRD Garage',
  'DRD Ropes Installed in New Coat',
  'Drag Rescue Devices - Shipped Loose',
  'DRD Handle Opts',
]);

// Chinstrap sub-categories
const CHINSTRAP_SUBS = new Set(['Chinstrap Velcro Add On Opts']);

// Coat: categories to suppress from top-level (they live under a parent)
const COAT_SUPPRESS = new Set([
  ...COAT_POCKET_SUBS,
  ...DRD_SUBS,
  ...CHINSTRAP_SUBS,
  'Chinstraps',
  // rendered as parent via __CHINSTRAPS__ synthetic key
  'Belt Loops', // moved to pants
]);

// Build ordered coat categories: priority first, then alphabetical minus suppressed
function getCoatCategories(rawCats) {
  const prioritySet = new Set(COAT_PRIORITY);
  // Rest = all non-priority, non-suppressed categories, sorted alphabetically
  const rest = rawCats.filter((c) => !prioritySet.has(c) && !COAT_SUPPRESS.has(c)).sort();
  const result = [...COAT_PRIORITY];
  let chinInjected = false,
    drdInjected = false,
    pocketsInjected = false;
  for (const c of rest) {
    // Inject __CHINSTRAPS__ before the first category that sorts after 'Ch'
    // 'Chinstraps' itself is suppressed so we key off the next alphabetical item
    if (!chinInjected && c >= 'Cl') {
      result.push('__CHINSTRAPS__');
      chinInjected = true;
    }
    // Inject __DRD__ before first category starting with E or later (D-words suppressed)
    if (!drdInjected && c >= 'E') {
      result.push('__DRD__');
      drdInjected = true;
    }
    // Inject __POCKETS__ before first category starting with Q or later (P-words suppressed)
    if (!pocketsInjected && c >= 'Q') {
      result.push('__POCKETS__');
      pocketsInjected = true;
    }
    result.push(c);
  }
  if (!chinInjected) result.push('__CHINSTRAPS__');
  if (!drdInjected) result.push('__DRD__');
  if (!pocketsInjected) result.push('__POCKETS__');
  return result;
}

// Pant categories (LTO + PFP) are grouped purely from the data itself: a
// category string like "Knees: 3D Biflex knee" means "3D Biflex knee" is a
// sub-accordion under a "Knees" parent. A category with no colon renders as
// its own flat accordion. This replaces the old approach of hand-maintained
// JS sets enumerating which category names belong under which synthetic
// parent group -- the new catalog data already encodes that directly, so
// adding/renaming a sub-option is just a CSV edit, no code change needed.
const PANT_PRIORITY = ['Outershell', 'Thermal liner', 'Moisture barrier'];
function buildPantCategoryTree(rawCats) {
  const prioritySet = new Set(PANT_PRIORITY);
  const byTop = {};
  const topOrder = [];
  rawCats.forEach((full) => {
    const idx = full.indexOf(':');
    const top = (idx === -1 ? full : full.slice(0, idx)).trim();
    const sub = idx === -1 ? null : full.slice(idx + 1).trim();
    if (!(top in byTop)) {
      byTop[top] = [];
      topOrder.push(top);
    }
    if (sub != null) byTop[top].push(sub);
  });
  const restTops = topOrder.filter((t) => !prioritySet.has(t)).sort();
  const orderedTops = [...PANT_PRIORITY.filter((t) => t in byTop), ...restTops];
  const tree = orderedTops.map((top) => ({
    top,
    subs: byTop[top].length ? [...new Set(byTop[top])].sort() : null,
  }));
  tree.push({ top: '__SUSPENDERS__', subs: null });
  return tree;
}

// ─── QtySelector ──────────────────────────────────────────────────────────────────────────────
function QtySelector({ itemKey, qty, checked, onToggle, onQtyChange }) {
  const step = (delta) => {
    const newQty = Math.max(0, qty + delta);
    if (newQty === 0 && checked) onToggle(itemKey);
    if (newQty > 0 && !checked) onToggle(itemKey);
    onQtyChange(itemKey, newQty);
  };
  const handleInput = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 0) return;
    if (val === 0 && checked) onToggle(itemKey);
    if (val > 0 && !checked) onToggle(itemKey);
    onQtyChange(itemKey, val);
  };
  return (
    <div className="flex items-center" onClick={(e) => e.preventDefault()}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          step(-1);
        }}
        className="w-6 h-6 flex items-center justify-center bg-slate-700 hover:bg-red-900 text-slate-300 rounded-l text-sm font-bold border border-slate-600 transition-colors select-none"
      >
        −
      </button>
      <input
        type="number"
        min="0"
        value={qty}
        onChange={handleInput}
        onClick={(e) => e.preventDefault()}
        className="w-10 h-6 text-center text-xs bg-slate-900 border-y border-slate-600 text-slate-100 focus:outline-none"
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          step(1);
        }}
        className="w-6 h-6 flex items-center justify-center bg-slate-700 hover:bg-emerald-900 text-slate-300 rounded-r text-sm font-bold border border-slate-600 transition-colors select-none"
      >
        +
      </button>
    </div>
  );
}

// ─── ItemRow ────────────────────────────────────────────────────────────────────────────────────
function ItemRow({
  item,
  itemKey,
  checked,
  qty,
  onToggle,
  onQtyChange,
  showCategory,
  isPremium = false,
  onGradeToggle = () => {},
}) {
  const isGraded = item.priceStd != null && item.pricePrm != null;
  const price = resolveItemPrice(item, isGraded && isPremium ? 'prm' : 'std');
  const isTBD = price == null;
  const desc = item.description && item.description !== '-' ? item.description : '';
  const diagramCtx = React.useContext(DiagramContext);
  const diagramMatch = item.sku && diagramCtx ? diagramCtx.lookupDiagram(item.sku) : null;
  const handleCheckbox = () => {
    if (checked) {
      onQtyChange(itemKey, 0);
      onToggle(itemKey);
    } else {
      onQtyChange(itemKey, 1);
      onToggle(itemKey);
    }
  };
  return (
    <div
      className={
        'flex items-center gap-2 px-4 py-2.5 transition-colors hover:bg-slate-800 ' +
        (checked ? 'bg-slate-800/70' : '')
      }
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckbox}
        className="w-4 h-4 accent-red-500 flex-shrink-0 cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        {showCategory && <div className="text-xs text-slate-500 mb-0.5">{item.category}</div>}
        <div className="flex items-center gap-1 flex-wrap">
          {item.sku &&
            (diagramMatch ? (
              <button
                type="button"
                onClick={() => diagramCtx.openDiagram(item.sku)}
                title={
                  'View diagram — manual page ' +
                  diagramMatch.pages[0] +
                  (diagramMatch.pages.length > 1
                    ? ' (+' + (diagramMatch.pages.length - 1) + ' more)'
                    : '')
                }
                className="text-xs font-mono font-bold text-blue-300 hover:text-blue-200 cursor-pointer"
              >
                {skuLabel(item)}
              </button>
            ) : (
              <span className="text-xs font-mono text-blue-300">{skuLabel(item)}</span>
            ))}
          {desc && <span className="text-sm text-slate-200">{desc}</span>}
        </div>
        {isGraded && (
          <label className="flex items-center gap-1.5 mt-1 text-xs text-purple-300 cursor-pointer select-none w-fit">
            <input
              type="checkbox"
              checked={isPremium}
              onChange={() => onGradeToggle(itemKey)}
              className="w-3.5 h-3.5 accent-purple-500 cursor-pointer"
            />
            Use Premium Material
          </label>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <QtySelector
          itemKey={itemKey}
          qty={qty}
          checked={checked}
          onToggle={onToggle}
          onQtyChange={onQtyChange}
        />
        <span
          className={
            'text-xs font-mono font-semibold w-24 text-right px-1.5 py-0.5 rounded ' +
            (isTBD
              ? 'bg-amber-900/50 text-amber-300 border border-amber-600/40'
              : price === 0
                ? 'text-slate-500'
                : 'text-emerald-300')
          }
        >
          {isTBD
            ? 'TBD'
            : qty > 1 && price != null
              ? qty + '\u00d7' + fmtMoney(price)
              : fmtMoney(price)}
        </span>
      </div>
    </div>
  );
}

// ─── CategoryAccordion ──────────────────────────────────────────────────────────────────────────────
function CategoryAccordion({
  catName,
  items,
  selections,
  quantities,
  onToggle,
  onQtyChange,
  prefix,
  autoCollapseOnSelect,
  grades = {},
  onGradeToggle = () => {},
}) {
  const [open, setOpen] = React.useState(false);
  const gradeFor = (it, k) =>
    (it.priceStd != null && it.pricePrm != null) && grades[k] ? 'prm' : 'std';
  const selItems = items.filter((item) => selections[prefix + '||' + catName + '||' + item._gi]);
  const selCount = selItems.length;
  const catTotal = selItems.reduce((s, it) => {
    const k = prefix + '||' + catName + '||' + it._gi;
    return s + (resolveItemPrice(it, gradeFor(it, k)) ?? 0) * (quantities[k] ?? 1);
  }, 0);
  const hasTBD = selItems.some((it) => {
    const k = prefix + '||' + catName + '||' + it._gi;
    return resolveItemPrice(it, gradeFor(it, k)) == null;
  });
  const prevCountRef = React.useRef(0);
  React.useEffect(() => {
    if (autoCollapseOnSelect && selCount > 0 && prevCountRef.current === 0 && open) setOpen(false);
    prevCountRef.current = selCount;
  }, [selCount, open, autoCollapseOnSelect]);
  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden mb-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className={
          'w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-800 ' +
          (open ? 'bg-blue-950/80' : 'bg-slate-800')
        }
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-100">{catName}</span>
          {selCount > 0 && (
            <span className="text-xs bg-red-600 text-white rounded-full px-2 py-0.5 font-bold">
              {selCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {selCount > 0 && (
            <span
              className={
                'text-xs font-mono font-semibold ' +
                (hasTBD ? 'text-amber-400' : 'text-emerald-400')
              }
            >
              {fmtMoney(catTotal)}
              {hasTBD ? ' +TBD' : ''}
            </span>
          )}
          <svg
            className={'w-4 h-4 text-slate-400 transition-transform ' + (open ? 'rotate-180' : '')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="bg-slate-900 divide-y divide-slate-800">
          {items.map((item) => {
            const key = prefix + '||' + catName + '||' + item._gi;
            return (
              <ItemRow
                key={key}
                item={item}
                itemKey={key}
                checked={!!selections[key]}
                qty={quantities[key] ?? 0}
                onToggle={onToggle}
                onQtyChange={onQtyChange}
                showCategory={false}
                isPremium={!!grades[key]}
                onGradeToggle={onGradeToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── SearchResultsPanel ────────────────────────────────────────────────────────────────────────────────────
function SearchResultsPanel({
  items,
  selections,
  quantities,
  onToggle,
  onQtyChange,
  prefix,
  grades = {},
  onGradeToggle = () => {},
}) {
  if (!items.length)
    return <p className="text-slate-500 text-sm text-center py-8">No options match your search.</p>;
  return (
    <div className="space-y-1">
      {items.map((item) => {
        const key = prefix + '||' + item.category + '||' + item._gi;
        return (
          <ItemRow
            key={key}
            item={item}
            itemKey={key}
            checked={!!selections[key]}
            qty={quantities[key] ?? 0}
            onToggle={onToggle}
            onQtyChange={onQtyChange}
            showCategory={true}
            isPremium={!!grades[key]}
            onGradeToggle={onGradeToggle}
          />
        );
      })}
    </div>
  );
}

// ─── ParentAccordion ────────────────────────────────────────────────────────────────────────────────────
function ParentAccordion({
  title,
  subCats,
  byCategory,
  selections,
  quantities,
  onToggle,
  onQtyChange,
  prefix,
  search,
  grades = {},
  onGradeToggle = () => {},
}) {
  const [open, setOpen] = React.useState(false);
  const gradeFor = (it, k) =>
    (it.priceStd != null && it.pricePrm != null) && grades[k] ? 'prm' : 'std';
  const totalSel = subCats.reduce(
    (s, cat) =>
      s +
      (byCategory[cat] || []).filter((it) => selections[prefix + '||' + cat + '||' + it._gi])
        .length,
    0,
  );
  const totalAmt = subCats.reduce(
    (s, cat) =>
      s +
      (byCategory[cat] || [])
        .filter((it) => selections[prefix + '||' + cat + '||' + it._gi])
        .reduce((a, it) => {
          const k = prefix + '||' + cat + '||' + it._gi;
          return a + (resolveItemPrice(it, gradeFor(it, k)) ?? 0) * (quantities[k] ?? 1);
        }, 0),
    0,
  );
  const hasTBD = subCats.some((cat) =>
    (byCategory[cat] || []).some((it) => {
      const k = prefix + '||' + cat + '||' + it._gi;
      return selections[k] && resolveItemPrice(it, gradeFor(it, k)) == null;
    }),
  );
  const visibleSubs = subCats.filter((cat) => {
    const items = byCategory[cat] || [];
    if (!items.length) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return items.some(
      (it) =>
        (it.sku || '').toLowerCase().includes(q) ||
        (it.legacySku || '').toLowerCase().includes(q) ||
        (it.description || '').toLowerCase().includes(q),
    );
  });
  if (!visibleSubs.length) return null;
  return (
    <div className="border-2 border-slate-600 rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-700 bg-slate-700/60"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-yellow-300 uppercase tracking-wide">{title}</span>
          {totalSel > 0 && (
            <span className="text-xs bg-red-600 text-white rounded-full px-2 py-0.5 font-bold">
              {totalSel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {totalSel > 0 && (
            <span
              className={
                'text-xs font-mono font-semibold ' +
                (hasTBD ? 'text-amber-400' : 'text-emerald-400')
              }
            >
              {fmtMoney(totalAmt)}
              {hasTBD ? ' +TBD' : ''}
            </span>
          )}
          <svg
            className={'w-4 h-4 text-slate-400 transition-transform ' + (open ? 'rotate-180' : '')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="bg-slate-900/80 p-3 space-y-1">
          {visibleSubs.map((cat) => (
            <CategoryAccordion
              key={cat}
              catName={cat}
              items={byCategory[cat] || []}
              selections={selections}
              quantities={quantities}
              onToggle={onToggle}
              onQtyChange={onQtyChange}
              prefix={prefix}
              autoCollapseOnSelect={false}
              grades={grades}
              onGradeToggle={onGradeToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CoatPanel ────────────────────────────────────────────────────────────────────────────────────
function CoatPanel({ selections, quantities, onToggle, onQtyChange, search }) {
  const data = CATALOG.coat;
  if (!data) return null;
  const { items, categories } = data;
  const byCategory = React.useMemo(() => {
    const map = {};
    items.forEach((item, gi) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push({
        ...item,
        _gi: gi,
      });
    });
    return map;
  }, [items]);
  const orderedCats = React.useMemo(() => getCoatCategories(categories), [categories]);
  const q = search.toLowerCase();
  if (search) {
    const matched = items
      .map((item, gi) => ({
        ...item,
        _gi: gi,
      }))
      .filter(
        (item) =>
          (item.sku || '').toLowerCase().includes(q) ||
          (item.legacySku || '').toLowerCase().includes(q) ||
          (item.description || '').toLowerCase().includes(q) ||
          (item.category || '').toLowerCase().includes(q),
      );
    return (
      <SearchResultsPanel
        items={matched}
        selections={selections}
        quantities={quantities}
        onToggle={onToggle}
        onQtyChange={onQtyChange}
        prefix="coat"
      />
    );
  }
  return (
    <div className="space-y-1">
      {orderedCats.map((cat) => {
        if (cat === '__CHINSTRAPS__')
          return (
            <ParentAccordion
              key="__CHINSTRAPS__"
              title="Chinstraps"
              subCats={['Chinstraps', ...CHINSTRAP_SUBS]}
              byCategory={byCategory}
              selections={selections}
              quantities={quantities}
              onToggle={onToggle}
              onQtyChange={onQtyChange}
              prefix="coat"
              search={search}
            />
          );
        if (cat === '__DRD__')
          return (
            <ParentAccordion
              key="__DRD__"
              title="DRD \u2014 Drag Rescue Device"
              subCats={[...DRD_SUBS]}
              byCategory={byCategory}
              selections={selections}
              quantities={quantities}
              onToggle={onToggle}
              onQtyChange={onQtyChange}
              prefix="coat"
              search={search}
            />
          );
        if (cat === '__POCKETS__')
          return (
            <ParentAccordion
              key="__POCKETS__"
              title="Pockets & Accessories"
              subCats={[...COAT_POCKET_SUBS]}
              byCategory={byCategory}
              selections={selections}
              quantities={quantities}
              onToggle={onToggle}
              onQtyChange={onQtyChange}
              prefix="coat"
              search={search}
            />
          );
        const catItems = byCategory[cat] || [];
        if (!catItems.length) return null;
        return (
          <CategoryAccordion
            key={cat}
            catName={cat}
            items={catItems}
            selections={selections}
            quantities={quantities}
            onToggle={onToggle}
            onQtyChange={onQtyChange}
            prefix="coat"
            autoCollapseOnSelect={COAT_PRIORITY.includes(cat)}
          />
        );
      })}
    </div>
  );
}

// ─── PantPanel ────────────────────────────────────────────────────────────────────────────────────
function PantPanel({
  pantType,
  selections,
  quantities,
  onToggle,
  onQtyChange,
  search,
  suspSels,
  suspQtys,
  onSuspToggle,
  onSuspQtyChange,
  suspEnabled,
  grades,
  onGradeToggle,
}) {
  const data = CATALOG[pantType];
  if (!data) return null;
  const { items, categories } = data;
  // In PFP mode, the displayed item list is PFP's own items plus LTO's items
  // for any category PFP has no equivalent for -- one unified list, so the
  // whole pants view reads as a single accordion regardless of which pant
  // type is active, just with PFP's own items substituted in wherever PFP
  // has them.
  const displayItems = React.useMemo(() => {
    if (pantType !== 'pfp') return items.map((item, gi) => ({ ...item, _gi: gi }));
    const ownItems = CATALOG.pfp.items.map((item, gi) => ({ ...item, _gi: gi }));
    const fallbackItems = [];
    CATALOG.lto.items.forEach((item, gi) => {
      if (LTO_ONLY_PANT_CATEGORIES.has(item.category)) {
        fallbackItems.push({ ...item, _gi: gi });
      }
    });
    return [...ownItems, ...fallbackItems];
  }, [pantType, items]);
  const byCategory = React.useMemo(() => {
    const map = {};
    displayItems.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [displayItems]);
  const suspData = CATALOG.suspenders;
  const suspByCategory = React.useMemo(() => {
    if (!suspData) return {};
    const map = {};
    suspData.items.forEach((item, gi) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push({
        ...item,
        _gi: gi,
      });
    });
    return map;
  }, [suspData]);
  // PFP mode: build the tree from the union of LTO + PFP category names, so
  // PFP's own categories slot into the exact same alphabetical/grouped
  // structure as LTO's, rather than appearing as a separate section.
  const catTree = React.useMemo(() => {
    const rawCats =
      pantType === 'lto'
        ? categories
        : [...new Set([...CATALOG.lto.categories, ...CATALOG.pfp.categories])];
    return buildPantCategoryTree(rawCats);
  }, [categories, pantType]);
  const q = search.toLowerCase();
  if (search) {
    const matched = displayItems.filter(
      (item) =>
        (item.sku || '').toLowerCase().includes(q) ||
        (item.legacySku || '').toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q),
    );
    return (
      <SearchResultsPanel
        items={matched}
        selections={selections}
        quantities={quantities}
        onToggle={onToggle}
        onQtyChange={onQtyChange}
        prefix="pant"
        grades={grades}
        onGradeToggle={onGradeToggle}
      />
    );
  }
  return (
    <div className="space-y-1">
      {catTree.map(({ top, subs }) => {
        if (top === '__SUSPENDERS__') {
          if (!suspData) return null;
          return (
            <div key="__SUSPENDERS__" className="mt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px flex-1 bg-slate-700" />
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                  Suspenders
                </span>
                <div className="h-px flex-1 bg-slate-700" />
              </div>
              <div className="mb-3 flex gap-3">
                {[
                  {
                    val: true,
                    label: 'Yes \u2014 Add Suspenders',
                    active: 'text-emerald-300 border-emerald-500 bg-emerald-900/60',
                  },
                  {
                    val: false,
                    label: 'No Suspenders',
                    active: 'text-red-300 border-red-700 bg-red-900/30',
                  },
                ].map((opt) => (
                  <button
                    key={String(opt.val)}
                    onClick={() => {
                      window.__setSuspEnabled && window.__setSuspEnabled(opt.val);
                    }}
                    className={
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ' +
                      (suspEnabled === opt.val
                        ? opt.active + ' shadow-lg scale-105'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500')
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {suspEnabled && (
                <GarmentPanelSimple
                  source="suspenders"
                  prefix="susp"
                  selections={suspSels}
                  quantities={suspQtys}
                  onToggle={onSuspToggle}
                  onQtyChange={onSuspQtyChange}
                  byCategory={suspByCategory}
                  categories={suspData.categories}
                />
              )}
            </div>
          );
        }
        if (subs) {
          return (
            <ParentAccordion
              key={top}
              title={top}
              subCats={subs.map((s) => top + ': ' + s)}
              byCategory={byCategory}
              selections={selections}
              quantities={quantities}
              onToggle={onToggle}
              onQtyChange={onQtyChange}
              prefix="pant"
              search={search}
              grades={grades}
              onGradeToggle={onGradeToggle}
            />
          );
        }
        const catItems = byCategory[top] || [];
        if (!catItems.length) return null;
        return (
          <CategoryAccordion
            key={top}
            catName={top}
            items={catItems}
            selections={selections}
            quantities={quantities}
            onToggle={onToggle}
            onQtyChange={onQtyChange}
            prefix="pant"
            autoCollapseOnSelect={false}
            grades={grades}
            onGradeToggle={onGradeToggle}
          />
        );
      })}
    </div>
  );
}
function GarmentPanelSimple({
  source,
  prefix,
  selections,
  quantities,
  onToggle,
  onQtyChange,
  byCategory,
  categories,
}) {
  return (
    <div className="space-y-1">
      {categories.map((cat) => {
        const items = byCategory[cat] || [];
        if (!items.length) return null;
        return (
          <CategoryAccordion
            key={cat}
            catName={cat}
            items={items}
            selections={selections}
            quantities={quantities}
            onToggle={onToggle}
            onQtyChange={onQtyChange}
            prefix={prefix}
            autoCollapseOnSelect={false}
          />
        );
      })}
    </div>
  );
}

// ─── Mismatch Banner ──────────────────────────────────────────────────────────
function MismatchBanner({ cats }) {
  if (!cats.length) return null;
  return (
    <div className="mb-4 flex items-start gap-3 bg-red-900/40 border border-red-600/60 rounded-xl px-4 py-3">
      <svg
        className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.193 2.5 1.732 2.5z"
        />
      </svg>
      <div>
        <div className="text-red-300 font-bold text-sm">Different Pant Composite Chosen</div>
        <div className="text-red-400/80 text-xs mt-0.5">
          {cats.join(', ')} {cats.length === 1 ? 'differs' : 'differ'} from the coat selection. The
          pant composite has been manually overridden.
        </div>
      </div>
    </div>
  );
}

// ─── Overview Panel ────────────────────────────────────────────────────────────────────────────────────
function OverviewPanel({
  coatSels,
  coatQtys,
  pantSels,
  pantQtys,
  pantGrades,
  pantType,
  suspSels,
  suspQtys,
  suspEnabled,
  onGeneratePDF,
  onReset,
  discountPct,
  setDiscountPct,
}) {
  const getItems = (source, prefix, sels, qtys) => {
    const data = CATALOG[source];
    if (!data) return [];
    return data.items.flatMap((item, i) => {
      const key = prefix + '||' + item.category + '||' + i;
      return sels[key]
        ? [
            {
              ...item,
              qty: qtys[key] ?? 1,
            },
          ]
        : [];
    });
  };
  const coatItems = getItems('coat', 'coat', coatSels, coatQtys);
  const pantItems = getCombinedPantItems(pantType, pantSels, pantQtys, pantGrades);
  const suspItems = suspEnabled ? getItems('suspenders', 'susp', suspSels, suspQtys) : [];
  const coatTotal = coatItems.reduce(
    (s, i) => s + (resolveItemPrice(i, i.grade || 'std') ?? 0) * i.qty,
    0,
  );
  const pantTotal = pantItems.reduce(
    (s, i) => s + (resolveItemPrice(i, i.grade || 'std') ?? 0) * i.qty,
    0,
  );
  const suspTotal = suspItems.reduce(
    (s, i) => s + (resolveItemPrice(i, i.grade || 'std') ?? 0) * i.qty,
    0,
  );
  const grandTotal = coatTotal + pantTotal + suspTotal;
  const allTBD = [...coatItems, ...pantItems, ...suspItems].filter(
    (i) => resolveItemPrice(i, i.grade || 'std') == null,
  );
  const discountAmt = grandTotal * (discountPct / 100);
  const discountedTotal = grandTotal - discountAmt;
  const combinedPantItems = [...pantItems, ...suspItems];
  const combinedPantTotal = pantTotal + suspTotal;
  const renderTable = (items, label, total, extra) => (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
      <div className="px-4 py-3 bg-gradient-to-r from-blue-900 to-slate-800 border-b border-slate-700">
        <h3 className="font-bold text-white text-sm tracking-widest uppercase">{label}</h3>
        {extra && <div className="text-xs text-slate-400 mt-0.5">{extra}</div>}
      </div>
      {!items.length ? (
        <p className="text-slate-500 text-sm text-center py-6">No options selected.</p>
      ) : (
        <div className="divide-y divide-slate-700">
          {items.map((item, idx) => {
            const isGraded = item.priceStd != null && item.pricePrm != null;
            const unitPrice = resolveItemPrice(item, item.grade || 'std');
            const isTBD = unitPrice == null;
            const extPrice = unitPrice != null ? unitPrice * item.qty : null;
            return (
              <div key={idx} className="flex items-center justify-between px-4 py-2 text-xs">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="text-slate-400">{item.category}</div>
                  <div className="text-slate-100 font-medium truncate">
                    {item.description || item.sku}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.sku && <div className="text-blue-400 font-mono">{skuLabel(item)}</div>}
                    {isGraded && (
                      <span
                        className={
                          'text-[10px] font-bold uppercase tracking-wide ' +
                          (item.grade === 'prm' ? 'text-purple-400' : 'text-slate-500')
                        }
                      >
                        {item.grade === 'prm' ? 'Premium' : 'Standard'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.qty > 1 && (
                    <span className="text-slate-500 font-mono">{'x' + item.qty}</span>
                  )}
                  <span
                    className={
                      'font-mono font-semibold px-1.5 py-0.5 rounded text-xs ' +
                      (isTBD
                        ? 'bg-amber-900/50 text-amber-300 border border-amber-600/40'
                        : 'text-emerald-300')
                    }
                  >
                    {isTBD ? 'TBD' : fmtMoney(extPrice)}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between items-center px-4 py-3 bg-slate-900/60">
            <span className="text-sm font-bold text-slate-300">Subtotal</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">
              {fmtMoney(total)}
              {items.some((i) => resolveItemPrice(i, i.grade || 'std') == null) ? ' +TBD' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {renderTable(coatItems, 'Coat Options', coatTotal)}
        {renderTable(
          combinedPantItems,
          'Pant Options',
          combinedPantTotal,
          pantType === 'lto' ? 'LTO Pant' : 'PFP Pant',
        )}
      </div>
      <div className="bg-gradient-to-r from-blue-900 via-slate-800 to-red-900/40 rounded-xl p-5 border border-blue-700/40">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">
              Grand Total — Full Suit
            </div>
            <div className="text-3xl font-black text-white font-mono mt-1">
              {fmtMoney(grandTotal)}
            </div>
            {allTBD.length > 0 && (
              <div className="text-xs text-amber-400 mt-1">
                + {allTBD.length} item(s) pending pricing
              </div>
            )}
            {discountPct > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-600">
                <div className="text-xs text-slate-400">
                  Discount: {discountPct}
                  {'%  (-'}
                  {fmtMoney(discountAmt)})
                </div>
                <div className="text-xl font-black text-emerald-400 font-mono">
                  {fmtMoney(discountedTotal)}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGeneratePDF}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Generate Quote PDF
            </button>
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3 px-6 rounded-lg transition-colors border border-slate-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset / New Quote
            </button>
          </div>
        </div>
      </div>
      {allTBD.length > 0 && (
        <div className="bg-amber-900/20 border border-amber-600/30 rounded-xl p-4">
          <h4 className="text-amber-300 font-bold text-sm mb-2">Pricing Pending — TBD Items</h4>
          {allTBD.map((item, idx) => (
            <div key={idx} className="text-xs text-amber-200 flex gap-2">
              <span className="font-mono text-amber-400">{item.sku}</span>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PDF ────────────────────────────────────────────────────────────────────────────────────
function generatePDF(
  coatItems,
  pantItems,
  pantType,
  suspItems,
  coatTotal,
  pantTotal,
  suspTotal,
  grandTotal,
  quoteInfo,
  discountPct,
  coatNotes,
  pantNotes,
) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  });
  const NAVY = [13, 37, 78],
    RED = [185, 28, 28],
    GOLD = [180, 130, 20],
    WHITE = [255, 255, 255],
    AMBER = [160, 90, 0];
  const W = 215.9,
    H = 279.4,
    M = 14;
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  function hdr(pg) {
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, W, 40, 'F');
    doc.setFillColor(...RED);
    doc.rect(0, 40, W, 2.5, 'F');
    try {
      doc.addImage(MP_LOGO_B64, 'PNG', M, 5, 30, 30);
    } catch (e) {}
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(...WHITE);
    doc.text('TURNOUT GEAR QUOTE', W / 2, 16, {
      align: 'center',
    });
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 200, 230);
    doc.text(
      'Horizon Turnout Gear  |  Morning Pride Authorized Distributor  |  ' + today,
      W / 2,
      24,
      {
        align: 'center',
      },
    );
    doc.setFontSize(7);
    doc.text('Page ' + pg, W - M, 24, {
      align: 'right',
    });
  }
  function ftr() {
    doc.setFillColor(...NAVY);
    doc.rect(0, H - 20, W, 20, 'F');
    doc.setFontSize(6);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(180, 200, 230);
    doc.text(
      'ESTIMATE ONLY \u2014 This document is not a final or binding quote. Prices are subject to change based on final specifications,',
      M,
      H - 14,
    );
    doc.text(
      'material availability, and formal order confirmation. Contact your Horizon Turnout Gear representative for a binding quotation.',
      M,
      H - 10,
    );
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...GOLD);
    doc.text('Steve Smith | 407-232-4493 | steve@horizonturnout.com', M, H - 5.5);
    doc.setTextColor(150, 170, 200);
    doc.setFont('helvetica', 'normal');
    doc.text('John Grivalsky | 973-703-0888 | john@horizonturnout.com', W / 2 + 10, H - 5.5);
  }
  function quoteBlock(y) {
    doc.setFillColor(240, 244, 250);
    doc.roundedRect(M, y, W - M * 2, 38, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...NAVY);
    doc.text('QUOTE INFORMATION', M + 4, y + 7);
    const half = (W - M * 2 - 8) / 2;
    [
      ['Dealer / Distributor:', quoteInfo.dealer || ''],
      ['Salesman:', quoteInfo.salesman || ''],
      ['Department / Organization:', quoteInfo.department || ''],
      ['Date:', quoteInfo.date || today],
    ].forEach(([label, val], idx) => {
      const col = idx % 2,
        row = Math.floor(idx / 2),
        x = M + 4 + col * half,
        fy = y + 14 + row * 9;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(...NAVY);
      doc.text(label, x, fy);
      doc.setDrawColor(150, 160, 180);
      doc.setLineWidth(0.3);
      doc.line(x, fy + 4, x + half - 6, fy + 4);
      if (val) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 60, 100);
        doc.text(val, x, fy + 3.2);
      }
    });
    return y + 42;
  }
  function notesBlock(notes, y) {
    if (!notes || !notes.trim()) return y;
    if (y > H - 55) {
      doc.addPage();
      hdr(doc.internal.getCurrentPageInfo().pageNumber);
      ftr();
      y = 46;
    }
    const lines = doc.splitTextToSize(notes, W - M * 2 - 8);
    const blockH = 10 + lines.length * 5;
    doc.setFillColor(230, 236, 248);
    doc.roundedRect(M, y, W - M * 2, blockH, 2, 2, 'F');
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.4);
    doc.roundedRect(M, y, W - M * 2, blockH, 2, 2, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...NAVY);
    doc.text('CUSTOMIZATION NOTES', M + 4, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 50, 90);
    doc.text(lines, M + 4, y + 12);
    return y + blockH + 6;
  }
  function table(items, title, subtotal, startY) {
    if (!items.length) return startY;
    let y = startY;
    if (y > H - 55) {
      doc.addPage();
      hdr(doc.internal.getCurrentPageInfo().pageNumber);
      ftr();
      y = 46;
    }
    doc.setFillColor(...NAVY);
    doc.roundedRect(M, y, W - M * 2, 8, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.text(title, M + 4, y + 5.5);
    y += 10;
    doc.setFillColor(...RED);
    doc.rect(M, y, W - M * 2, 6.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...WHITE);
    const cC = M + 2,
      cS = M + 30,
      cD = M + 70,
      cQ = W - M - 28,
      cP = W - M - 2;
    doc.text('CATEGORY', cC, y + 4.5);
    doc.text('SKU', cS, y + 4.5);
    doc.text('DESCRIPTION', cD, y + 4.5);
    doc.text('QTY', cQ, y + 4.5, {
      align: 'center',
    });
    doc.text('PRICE', cP, y + 4.5, {
      align: 'right',
    });
    y += 7;
    items.forEach((item, idx) => {
      if (y > H - 42) {
        doc.addPage();
        hdr(doc.internal.getCurrentPageInfo().pageNumber);
        ftr();
        y = 46;
      }
      doc.setFillColor(...(idx % 2 === 0 ? [248, 250, 252] : [255, 255, 255]));
      doc.rect(M, y, W - M * 2, 5.5, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(60, 80, 100);
      doc.text((item.category || '').substring(0, 18), cC, y + 3.8);
      doc.setFont('courier', 'normal');
      doc.setTextColor(30, 60, 120);
      doc.text(skuLabel(item).substring(0, 26), cS, y + 3.8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 50, 70);
      doc.text((item.description || item.sku || '').substring(0, 44), cD, y + 3.8);
      const qty = item.qty ?? 1;
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 50, 70);
      doc.text(String(qty), cQ, y + 3.8, {
        align: 'center',
      });
      const unitPrice = resolveItemPrice(item, item.grade || 'std');
      const isTBD = unitPrice == null;
      const extPrice = unitPrice != null ? unitPrice * qty : null;
      const isGraded = item.priceStd != null && item.pricePrm != null;
      const gradeTag = isGraded ? (item.grade === 'prm' ? ' (Prm)' : ' (Std)') : '';
      if (isTBD) {
        doc.setTextColor(...AMBER);
        doc.text('TBD' + gradeTag, cP, y + 3.8, {
          align: 'right',
        });
      } else {
        doc.setTextColor(20, 120, 60);
        doc.text(fmtMoney(extPrice) + gradeTag, cP, y + 3.8, {
          align: 'right',
        });
      }
      y += 5.5;
    });
    const tbdN = items.filter((i) => resolveItemPrice(i, i.grade || 'std') == null).length;
    doc.setFillColor(...NAVY);
    doc.rect(M, y, W - M * 2, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...WHITE);
    doc.text('SUBTOTAL', cC, y + 5);
    doc.setTextColor(100, 220, 150);
    doc.text(fmtMoney(subtotal) + (tbdN > 0 ? ' + ' + tbdN + ' TBD' : ''), cP, y + 5, {
      align: 'right',
    });
    return y + 12;
  }
  hdr(1);
  ftr();
  let y = 46;
  y = quoteBlock(y);
  y = table(coatItems, 'COAT OPTIONS \u2014 LTO', coatTotal, y);
  y = notesBlock(coatNotes, y);
  doc.addPage();
  hdr(2);
  ftr();
  y = 46;
  const allPantItems = [...pantItems, ...suspItems],
    allPantTotal = pantTotal + suspTotal;
  y = table(
    allPantItems,
    'PANT OPTIONS \u2014 ' + (pantType === 'lto' ? 'LTO' : 'PFP'),
    allPantTotal,
    y,
  );
  y = notesBlock(pantNotes, y);

  // Grand total box — dynamic height
  if (y > H - 70) {
    doc.addPage();
    hdr(doc.internal.getCurrentPageInfo().pageNumber);
    ftr();
    y = 46;
  }
  y += 4;
  const allTBD = [...coatItems, ...pantItems, ...suspItems].filter(
    (i) => resolveItemPrice(i, i.grade || 'std') == null,
  );
  const hasGraded = pantItems.some((it) => it.priceStd != null && it.pricePrm != null);
  let boxH = 20;
  if (discountPct > 0) boxH += 10;
  if (allTBD.length) boxH += 8;
  if (hasGraded) boxH += 6;
  boxH += 8; // validity note
  doc.setFillColor(...NAVY);
  doc.roundedRect(M, y, W - M * 2, boxH, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...GOLD);
  doc.text('GRAND TOTAL \u2014 FULL SUIT', M + 4, y + 10);
  doc.setFontSize(18);
  doc.setTextColor(...WHITE);
  doc.text(fmtMoney(grandTotal), W - M - 4, y + 10, {
    align: 'right',
  });
  let noteY = y + 18;
  if (hasGraded) {
    doc.setFontSize(8);
    doc.setTextColor(180, 200, 230);
    doc.setFont('helvetica', 'italic');
    doc.text(
      '(Std) / (Prm) next to a pant price reflects that item\u2019s selected materials grade.',
      M + 4,
      noteY,
    );
    noteY += 6;
  }
  if (discountPct > 0) {
    const discAmt = grandTotal * (discountPct / 100),
      discTotal = grandTotal - discAmt;
    doc.setFontSize(9);
    doc.setTextColor(180, 200, 230);
    doc.setFont('helvetica', 'normal');
    doc.text('Discount: ' + discountPct + '%  (-' + fmtMoney(discAmt) + ')', M + 4, noteY);
    doc.setFontSize(14);
    doc.setTextColor(80, 220, 140);
    doc.setFont('helvetica', 'bold');
    doc.text(fmtMoney(discTotal), W - M - 4, noteY, {
      align: 'right',
    });
    noteY += 10;
  }
  if (allTBD.length) {
    doc.setFontSize(7.5);
    doc.setTextColor(...AMBER);
    doc.setFont('helvetica', 'italic');
    doc.text('* ' + allTBD.length + ' item(s) with TBD pricing not included above.', M + 4, noteY);
    noteY += 8;
  }
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(160, 180, 220);
  doc.text(
    'This estimate is valid for 30 days pending manufacturer pricing confirmation.',
    M + 4,
    noteY,
  );
  doc.save('Morning_Pride_Quote.pdf');
}

// ─── Main App ────────────────────────────────────────────────────────────────────────────────────
// ─── DiagramModal ─────────────────────────────────────────────────────────────
function DiagramModal({ modal, onClose, onSelectPage }) {
  const [loadedSrc, setLoadedSrc] = React.useState(null);
  const [errorSrc, setErrorSrc] = React.useState(null);
  if (!modal.open) return null;
  const { sku, pages, activeIdx } = modal;
  const activePage = pages[activeIdx];
  const imgUrl = MANUAL_PAGE_IMAGE_BASE_URL + activePage + '.png';
  const isLoaded = loadedSrc === imgUrl;
  const hasError = errorSrc === imgUrl;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 border border-slate-600 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-700">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Technical Manual</div>
            <div className="text-sm font-bold text-blue-300 font-mono">{sku}</div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none px-2"
          >
            ×
          </button>
        </div>
        {pages.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 px-5 py-3 bg-slate-900/60 border-b border-slate-700 max-h-32 overflow-y-auto">
            <span className="text-xs text-slate-400 mr-1">
              {'Appears on ' + pages.length + ' pages:'}
            </span>
            {pages.map((pg, idx) => (
              <button
                key={pg}
                onClick={() => onSelectPage(idx)}
                className={
                  'text-xs font-mono px-2 py-1 rounded border ' +
                  (idx === activeIdx
                    ? 'bg-blue-700 border-blue-500 text-white font-bold'
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-400')
                }
              >
                {pg}
              </button>
            ))}
          </div>
        )}
        <div className="flex-1 min-h-[300px] bg-slate-950 flex items-center justify-center overflow-auto p-3">
          {hasError ? (
            <div className="text-center px-6">
              <p className="text-slate-400 text-sm mb-3">
                This page's diagram image couldn't be loaded.
              </p>
              <a
                href={MANUAL_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 underline"
              >
                Open full manual (PDF) ↗
              </a>
            </div>
          ) : (
            <React.Fragment>
              {!isLoaded && <div className="text-slate-500 text-sm">Loading diagram…</div>}
              <img
                key={imgUrl}
                src={imgUrl}
                alt={'Manual page ' + activePage}
                onLoad={() => setLoadedSrc(imgUrl)}
                onError={() => setErrorSrc(imgUrl)}
                className={
                  'max-w-full max-h-full object-contain rounded shadow-lg ' +
                  (isLoaded ? '' : 'hidden')
                }
              />
            </React.Fragment>
          )}
        </div>
        <div className="px-5 py-2.5 bg-slate-900 border-t border-slate-700 text-center">
          <a
            href={MANUAL_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 underline"
          >
            Open full manual (PDF) ↗
          </a>
        </div>
      </div>
    </div>
  );
}
function App() {
  const [tab, setTab] = React.useState('coat');
  const [pantType, setPantType] = React.useState('');
  const [suspEnabled, setSuspEnabled] = React.useState(false);
  const [coatSels, setCoatSels] = React.useState({});
  const [pantSelsLTO, setPantSelsLTO] = React.useState({});
  const [pantSelsPFP, setPantSelsPFP] = React.useState({});
  const [pantSelsShared, setPantSelsShared] = React.useState({});
  const [suspSels, setSuspSels] = React.useState({});
  const [coatQtys, setCoatQtys] = React.useState({});
  const [pantQtysLTO, setPantQtysLTO] = React.useState({});
  const [pantQtysPFP, setPantQtysPFP] = React.useState({});
  const [pantQtysShared, setPantQtysShared] = React.useState({});
  const [suspQtys, setSuspQtys] = React.useState({});
  // Per-item materials grade for graded LTO/PFP pant items ('std' is the
  // default/missing state; `true` in these maps means "use Premium"). Mirrors
  // the LTO/PFP/shared split used for pantSels/pantQtys above, since a graded
  // item's key lives in exactly one of those three pools depending on whether
  // its category is mode-specific or an LTO-only fallback.
  const [itemGradesLTO, setItemGradesLTO] = React.useState({});
  const [itemGradesPFP, setItemGradesPFP] = React.useState({});
  const [itemGradesShared, setItemGradesShared] = React.useState({});
  const [search, setSearch] = React.useState('');
  const [showReset, setShowReset] = React.useState(false);
  const [quoteInfo, setQuoteInfo] = React.useState({
    dealer: '',
    salesman: '',
    department: '',
    date: '',
  });
  const [discountPct, setDiscountPct] = React.useState(0);
  const [coatNotes, setCoatNotes] = React.useState('');
  const [pantNotes, setPantNotes] = React.useState('');
  const [manualOverrides, setManualOverrides] = React.useState({
    lto: new Set(),
    pfp: new Set(),
  });
  const [diagramData, setDiagramData] = React.useState({
    ready: false,
    pageMap: {},
    xrefMap: {},
  });
  const [diagramModal, setDiagramModal] = React.useState({
    open: false,
    sku: '',
    pages: [],
    activeIdx: 0,
  });
  React.useEffect(() => {
    let cancelled = false;
    Promise.all([fetch(SKU_PAGE_MAP_URL), fetch(CROSS_REFERENCE_URL)])
      .then(([pmRes, xrRes]) => {
        if (!pmRes.ok || !xrRes.ok)
          throw new Error('Manual reference fetch failed: ' + pmRes.status + '/' + xrRes.status);
        return Promise.all([pmRes.json(), xrRes.json()]);
      })
      .then(([pmRaw, xrRaw]) => {
        if (cancelled) return;
        setDiagramData({
          ready: true,
          pageMap: buildNormalizedMap(pmRaw),
          xrefMap: buildNormalizedMap(xrRaw),
        });
      })
      .catch((err) => {
        console.warn('[DiagramLookup] Could not load manual reference data:', err);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const lookupDiagram = React.useCallback(
    (sku) => {
      if (!diagramData.ready) return null;
      const norm = normalizeSku(sku);
      if (!norm) return null;
      let pages = diagramData.pageMap[norm];
      let resolvedSku = norm;
      if (!pages) {
        const translated = diagramData.xrefMap[norm];
        if (translated) {
          const tnorm = normalizeSku(translated);
          pages = diagramData.pageMap[tnorm];
          if (pages) resolvedSku = tnorm;
        }
      }
      if (!pages || !pages.length) return null;
      return {
        sku: resolvedSku,
        pages,
      };
    },
    [diagramData],
  );
  const openDiagram = React.useCallback(
    (sku) => {
      const match = lookupDiagram(sku);
      if (!match) return;
      setDiagramModal({
        open: true,
        sku: match.sku,
        pages: match.pages,
        activeIdx: 0,
      });
    },
    [lookupDiagram],
  );
  const closeDiagram = React.useCallback(
    () =>
      setDiagramModal((m) => ({
        ...m,
        open: false,
      })),
    [],
  );
  const selectDiagramPage = React.useCallback(
    (idx) =>
      setDiagramModal((m) => ({
        ...m,
        activeIdx: idx,
      })),
    [],
  );
  const diagramCtxValue = React.useMemo(
    () => ({
      lookupDiagram,
      openDiagram,
    }),
    [lookupDiagram, openDiagram],
  );
  React.useEffect(() => {
    window.__setSuspEnabled = setSuspEnabled;
    return () => {
      delete window.__setSuspEnabled;
    };
  }, []);
  const currentPantSels = pantType === 'lto' ? pantSelsLTO : pantSelsPFP;
  const setCurrentPantSels = pantType === 'lto' ? setPantSelsLTO : setPantSelsPFP;
  const currentPantQtys = pantType === 'lto' ? pantQtysLTO : pantQtysPFP;
  const setCurrentPantQtys = pantType === 'lto' ? setPantQtysLTO : setPantQtysPFP;
  const currentItemGrades = pantType === 'lto' ? itemGradesLTO : itemGradesPFP;
  const setCurrentItemGrades = pantType === 'lto' ? setItemGradesLTO : setItemGradesPFP;
  // Merged view used for rendering/totals: the shared LTO-only-fallback pool
  // (same regardless of LTO/PFP) plus whichever per-mode pool is active.
  // Key namespaces never collide -- a category lives in exactly one of the two.
  const mergedPantSels = React.useMemo(
    () => ({ ...pantSelsShared, ...currentPantSels }),
    [pantSelsShared, currentPantSels],
  );
  const mergedPantQtys = React.useMemo(
    () => ({ ...pantQtysShared, ...currentPantQtys }),
    [pantQtysShared, currentPantQtys],
  );
  const mergedItemGrades = React.useMemo(
    () => ({ ...itemGradesShared, ...currentItemGrades }),
    [itemGradesShared, currentItemGrades],
  );
  React.useEffect(() => {
    if (!pantType) return;
    const matchIdx = pantType === 'lto' ? CATALOG.coatToLto : CATALOG.coatToPfp;
    const pantSource = CATALOG[pantType];
    if (!pantSource) return;
    setCurrentPantSels((prev) => {
      const next = {
        ...prev,
      };
      let changed = false;
      CATALOG.coat.items.forEach((coatItem, ci) => {
        if (!MATCH_CATS.has(coatItem.category)) return;
        const coatKey = 'coat||' + coatItem.category + '||' + ci;
        const isCoatSelected = !!coatSels[coatKey];
        const pantIdx = matchIdx[String(ci)];
        if (pantIdx == null) return;
        const pantItem = pantSource.items[pantIdx];
        if (!pantItem) return;
        const pantKey = 'pant||' + pantItem.category + '||' + pantIdx;
        const overrides = manualOverrides[pantType] || new Set();
        if (overrides.has(pantItem.category)) return;
        if (isCoatSelected !== !!next[pantKey]) {
          next[pantKey] = isCoatSelected;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [coatSels, pantType]);
  const mismatchCats = React.useMemo(() => {
    if (!pantType) return [];
    const matchIdx = pantType === 'lto' ? CATALOG.coatToLto : CATALOG.coatToPfp;
    const pantSource = CATALOG[pantType];
    if (!pantSource) return [];
    const mismatched = new Set();
    CATALOG.coat.items.forEach((coatItem, ci) => {
      if (!MATCH_CATS.has(coatItem.category)) return;
      const coatKey = 'coat||' + coatItem.category + '||' + ci;
      const isCoatSelected = !!coatSels[coatKey];
      const pantIdx = matchIdx[String(ci)];
      if (pantIdx == null) return;
      const pantItem = pantSource.items[pantIdx];
      if (!pantItem) return;
      const pantKey = 'pant||' + pantItem.category + '||' + pantIdx;
      if (isCoatSelected !== !!currentPantSels[pantKey]) mismatched.add(pantItem.category);
    });
    return [...mismatched];
  }, [coatSels, currentPantSels, pantType]);
  const handleCoatToggle = React.useCallback(
    (k) =>
      setCoatSels((p) => ({
        ...p,
        [k]: !p[k],
      })),
    [],
  );
  const handleCoatQty = React.useCallback(
    (k, v) =>
      setCoatQtys((p) => ({
        ...p,
        [k]: v,
      })),
    [],
  );
  const handlePantToggle = React.useCallback(
    (k) => {
      const cat = k.split('||')[1];
      if (MATCH_CATS.has(cat)) {
        setManualOverrides((prev) => {
          const next = {
            ...prev,
          };
          const s = new Set(prev[pantType] || []);
          s.add(cat);
          next[pantType] = s;
          return next;
        });
      }
      if (LTO_ONLY_PANT_CATEGORIES.has(cat)) {
        setPantSelsShared((p) => ({
          ...p,
          [k]: !p[k],
        }));
      } else {
        setCurrentPantSels((p) => ({
          ...p,
          [k]: !p[k],
        }));
      }
    },
    [pantType, setCurrentPantSels],
  );
  const handlePantQty = React.useCallback(
    (k, v) => {
      const cat = k.split('||')[1];
      if (LTO_ONLY_PANT_CATEGORIES.has(cat)) {
        setPantQtysShared((p) => ({
          ...p,
          [k]: v,
        }));
      } else {
        setCurrentPantQtys((p) => ({
          ...p,
          [k]: v,
        }));
      }
    },
    [setCurrentPantQtys],
  );
  const handleGradeToggle = React.useCallback(
    (k) => {
      const cat = k.split('||')[1];
      if (LTO_ONLY_PANT_CATEGORIES.has(cat)) {
        setItemGradesShared((p) => ({
          ...p,
          [k]: !p[k],
        }));
      } else {
        setCurrentItemGrades((p) => ({
          ...p,
          [k]: !p[k],
        }));
      }
    },
    [setCurrentItemGrades],
  );
  const handleSuspToggle = React.useCallback(
    (k) =>
      setSuspSels((p) => ({
        ...p,
        [k]: !p[k],
      })),
    [],
  );
  const handleSuspQty = React.useCallback(
    (k, v) =>
      setSuspQtys((p) => ({
        ...p,
        [k]: v,
      })),
    [],
  );
  const handlePantTypeChange = React.useCallback((type) => {
    setPantType(type);
    setSearch('');
    setManualOverrides((prev) => ({
      ...prev,
      [type]: new Set(),
    }));
  }, []);
  const coatTotal = React.useMemo(
    () =>
      CATALOG.coat.items.reduce((s, it, i) => {
        const k = 'coat||' + it.category + '||' + i;
        return s + (coatSels[k] ? (parsePrice(it.price) ?? 0) * (coatQtys[k] ?? 1) : 0);
      }, 0),
    [coatSels, coatQtys],
  );
  const pantTotal = React.useMemo(() => {
    if (!pantType) return 0;
    return getCombinedPantItems(pantType, mergedPantSels, mergedPantQtys, mergedItemGrades).reduce(
      (s, it) => s + (resolveItemPrice(it, it.grade) ?? 0) * it.qty,
      0,
    );
  }, [pantType, mergedPantSels, mergedPantQtys, mergedItemGrades]);
  const suspTotal = React.useMemo(
    () =>
      suspEnabled
        ? CATALOG.suspenders.items.reduce((s, it, i) => {
            const k = 'susp||' + it.category + '||' + i;
            return s + (suspSels[k] ? (parsePrice(it.price) ?? 0) * (suspQtys[k] ?? 1) : 0);
          }, 0)
        : 0,
    [suspEnabled, suspSels, suspQtys],
  );
  const grandTotal = coatTotal + pantTotal + suspTotal;
  const coatCount = Object.values(coatSels).filter(Boolean).length;
  const pantCount = Object.values(mergedPantSels).filter(Boolean).length;
  const suspCount = Object.values(suspSels).filter(Boolean).length;
  const handleReset = () => {
    setCoatSels({});
    setPantSelsLTO({});
    setPantSelsPFP({});
    setPantSelsShared({});
    setSuspSels({});
    setCoatQtys({});
    setPantQtysLTO({});
    setPantQtysPFP({});
    setPantQtysShared({});
    setSuspQtys({});
    setItemGradesLTO({});
    setItemGradesPFP({});
    setItemGradesShared({});
    setPantType('');
    setSuspEnabled(false);
    setTab('coat');
    setSearch('');
    setQuoteInfo({
      dealer: '',
      salesman: '',
      department: '',
      date: '',
    });
    setDiscountPct(0);
    setCoatNotes('');
    setPantNotes('');
    setManualOverrides({
      lto: new Set(),
      pfp: new Set(),
    });
    setShowReset(false);
  };
  const handleGeneratePDF = () => {
    const coatItems = CATALOG.coat.items.flatMap((it, i) => {
      const k = 'coat||' + it.category + '||' + i;
      return coatSels[k]
        ? [
            {
              ...it,
              qty: coatQtys[k] ?? 1,
            },
          ]
        : [];
    });
    const pantItems = pantType
      ? getCombinedPantItems(pantType, mergedPantSels, mergedPantQtys, mergedItemGrades)
      : [];
    const suspItems = suspEnabled
      ? CATALOG.suspenders.items.flatMap((it, i) => {
          const k = 'susp||' + it.category + '||' + i;
          return suspSels[k]
            ? [
                {
                  ...it,
                  qty: suspQtys[k] ?? 1,
                },
              ]
            : [];
        })
      : [];
    generatePDF(
      coatItems,
      pantItems,
      pantType || 'lto',
      suspItems,
      coatTotal,
      pantTotal,
      suspTotal,
      grandTotal,
      quoteInfo,
      discountPct,
      coatNotes,
      pantNotes,
    );
  };
  React.useMemo(() => {
    if (typeof window !== 'undefined' && !window.jspdf) {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      document.head.appendChild(s);
    }
  }, []);
  return (
    <DiagramContext.Provider value={diagramCtxValue}>
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
          <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-700 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-lg border border-slate-600 p-1">
                    <img
                      src={MP_LOGO_B64}
                      alt="Morning Pride"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest text-red-400 uppercase">
                      Morning Pride
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      Turnout Gear <span className="text-red-500">Builder</span>
                    </h1>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Horizon Turnout Gear — Authorized Distributor
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/80 border border-slate-600 rounded-xl px-5 py-3 min-w-[220px]">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                    Running Total
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {fmtMoney(grandTotal)}
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-slate-400">
                    <span>
                      Coat: <span className="text-blue-300 font-mono">{fmtMoney(coatTotal)}</span>
                    </span>
                    <span>
                      Pants:{' '}
                      <span className="text-purple-300 font-mono">{fmtMoney(pantTotal)}</span>
                    </span>
                    {suspEnabled && (
                      <span>
                        Susp:{' '}
                        <span className="text-emerald-300 font-mono">{fmtMoney(suspTotal)}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 text-xs mt-1 text-slate-500">
                    {coatCount > 0 && <span>{coatCount} coat</span>}
                    {pantCount > 0 && <span>{pantCount} pant</span>}
                    {suspEnabled && suspCount > 0 && <span>{suspCount} susp</span>}
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="bg-slate-900 border-b border-slate-700 sticky top-0 z-10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex gap-1 pt-2">
                {[
                  {
                    id: 'coat',
                    label: '\uD83E\uDDE5  Coat',
                  },
                  {
                    id: 'pant',
                    label: '\uD83D\uDC56  Pants',
                  },
                  {
                    id: 'overview',
                    label: '\uD83D\uDCCB  Overview',
                  },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTab(t.id);
                      setSearch('');
                    }}
                    className={
                      'px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ' +
                      (tab === t.id
                        ? 'bg-blue-900/60 border-red-500 text-white'
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50')
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <main className="max-w-7xl mx-auto px-4 py-6">
            {tab === 'coat' && (
              <React.Fragment>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search SKUs or descriptions\u2026"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <CoatPanel
                  selections={coatSels}
                  quantities={coatQtys}
                  onToggle={handleCoatToggle}
                  onQtyChange={handleCoatQty}
                  search={search}
                />
              </React.Fragment>
            )}
            {tab === 'pant' && (
              <React.Fragment>
                <div className="mb-5 p-4 bg-slate-800/80 border border-slate-700 rounded-xl">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Select Pant Type
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      {
                        id: 'lto',
                        label: 'LTO Pant',
                        active: 'text-blue-300 border-blue-500 bg-blue-900/60',
                      },
                      {
                        id: 'pfp',
                        label: 'PFP Pant',
                        active: 'text-purple-300 border-purple-500 bg-purple-900/60',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handlePantTypeChange(opt.id)}
                        className={
                          'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold border-2 transition-all ' +
                          (pantType === opt.id
                            ? opt.active + ' shadow-lg scale-105'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200')
                        }
                      >
                        <span
                          className={
                            'w-2.5 h-2.5 rounded-full ' +
                            (pantType === opt.id ? 'bg-current' : 'bg-slate-600')
                          }
                        />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                {pantType && <MismatchBanner cats={mismatchCats} />}
                {pantType && (
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search SKUs or descriptions\u2026"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}
                {pantType && (
                  <PantPanel
                    pantType={pantType}
                    selections={mergedPantSels}
                    quantities={mergedPantQtys}
                    onToggle={handlePantToggle}
                    onQtyChange={handlePantQty}
                    search={search}
                    suspSels={suspSels}
                    suspQtys={suspQtys}
                    onSuspToggle={handleSuspToggle}
                    onSuspQtyChange={handleSuspQty}
                    suspEnabled={suspEnabled}
                    grades={mergedItemGrades}
                    onGradeToggle={handleGradeToggle}
                  />
                )}
              </React.Fragment>
            )}
            {tab === 'overview' && (
              <React.Fragment>
                <div className="mb-6 p-4 bg-slate-800/80 border border-slate-700 rounded-xl">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Quote Information — Appears on PDF
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        key: 'dealer',
                        label: 'Dealer / Distributor',
                        ph: 'e.g. Horizon Turnout Gear',
                      },
                      {
                        key: 'salesman',
                        label: 'Salesman',
                        ph: 'e.g. Steve Smith',
                      },
                      {
                        key: 'department',
                        label: 'Department / Organization',
                        ph: 'e.g. Orange County Fire Rescue',
                      },
                      {
                        key: 'date',
                        label: 'Quote Date',
                        ph: 'e.g. June 14, 2026',
                      },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs text-slate-400 mb-1">{f.label}</label>
                        <input
                          type="text"
                          value={quoteInfo[f.key]}
                          onChange={(e) =>
                            setQuoteInfo((p) => ({
                              ...p,
                              [f.key]: e.target.value,
                            }))
                          }
                          placeholder={f.ph}
                          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <label className="block text-xs text-slate-400 mb-1">Discount Percentage</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        value={discountPct || ''}
                        onChange={(e) =>
                          setDiscountPct(
                            Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)),
                          )
                        }
                        placeholder="0"
                        className="w-28 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                      <span className="text-sm text-slate-400">%</span>
                      {discountPct > 0 && (
                        <span className="text-xs text-emerald-400">
                          Discount will be applied to the grand total
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        Coat Customization Notes
                      </label>
                      <textarea
                        value={coatNotes}
                        onChange={(e) => setCoatNotes(e.target.value)}
                        placeholder="Special instructions for coat construction\u2026"
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        Pant Customization Notes
                      </label>
                      <textarea
                        value={pantNotes}
                        onChange={(e) => setPantNotes(e.target.value)}
                        placeholder="Special instructions for pant construction\u2026"
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-y"
                      />
                    </div>
                  </div>
                </div>
                <OverviewPanel
                  coatSels={coatSels}
                  coatQtys={coatQtys}
                  pantSels={mergedPantSels}
                  pantQtys={mergedPantQtys}
                  pantGrades={mergedItemGrades}
                  pantType={pantType || 'lto'}
                  suspSels={suspSels}
                  suspQtys={suspQtys}
                  suspEnabled={suspEnabled}
                  onGeneratePDF={handleGeneratePDF}
                  onReset={() => setShowReset(true)}
                  discountPct={discountPct}
                  setDiscountPct={setDiscountPct}
                />
              </React.Fragment>
            )}
          </main>
          {showReset && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
              <div className="bg-slate-800 border border-slate-600 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-2">Reset Quote?</h2>
                <p className="text-slate-400 text-sm mb-5">
                  This will clear all selections, quantities, and quote information. This cannot be
                  undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors"
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setShowReset(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2.5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <DiagramModal
            modal={diagramModal}
            onClose={closeDiagram}
            onSelectPage={selectDiagramPage}
          />
        </div>
    </DiagramContext.Provider>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
