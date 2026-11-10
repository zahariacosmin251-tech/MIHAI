# STYLE GUIDE — Vitrine Olanda (citit OBLIGATORIU înainte de a scrie partialul)

## Misiunea
PAGINĂ DE RECRUTARE pentru **vitrine & cluburi licențiate din Olanda — dansuri erotice și sexwork LEGAL, cu contract de muncă**, conform legislației olandeze (prostituția e legală și reglementată din 2000; operatorii au nevoie de „vergunning” municipală; 18+ strict; BSN; GGD pentru sănătate). Ton: **sexy, glam, empowerment, DAR classy** — stil „boutique glam”, paletă **alb + roz bombon** strălucitoare, accenți aurii, iepuraș roz decorativ, inimă roz diabolică ca brand. Zero vulgaritate, zero descrieri explicite de servicii. Numele de brand NU e definit încă — folosește «Vitrine Olanda» ca titlu descriptiv până la alegerea numelui final (search&replace ușor). Public: tinere 18+ din România.

## Reguli dure
1. Scrii DOAR fișierul/fișierele primite în task. Nu modifica alte fișiere.
2. Fragment HTML pur: fără `<html>`, `<head>`, `<body>`, fără `<script>`, fără `<link>`, fără `<style>` inline mari (clase existente + Tailwind).
3. Toate textele în **română cu diacritice**. Zero lorem ipsum, zero TODO, zero text placeholder gen „XXX”.
4. Fără cifre inventate (salarii exacte, telefoane, adrese). Dacă e necesar un contact: folosește comentariul `<!-- CHANGE-ME -->` lângă element.
5. Fără emoji ca iconițe principale — folosește Font Awesome 6 (`<i class="fa-solid fa-..."></i>`). Inimioare decorative unicode `♥` sunt OK ca accent mic.
6. Animații: orice element care intră în viewport primește `data-reveal="up|down|left|right|zoom|flip"` și opțional `data-delay="0.05..0.4"`, `data-duration="0.9"`. Container decorativ poate primi `data-parallax="0.15"`.
7. Hero: elementele animabile primesc `data-hero="0|0.15|0.3..."` (secvență de stagerru). Hero include OBLIGATORIU `<canvas id="heartsCanvas" class="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true"></canvas>`.
8. Imaginile există deja — folosește-le EXACT pe cele disponibile (listă mai jos), cu `alt` în română. `loading="lazy"` pe toate exceptând hero (hero `loading="eager"`).
9. IDs de secțiune EXACT cum sunt în task (navbarul le leagă). Un singur `<section id="...">` per ID.
10. Accesibilitate: contrast minim pe roz deschid — text pe fundal roz folosește `text-plum` sau alb pe gradient `candy-600→candy-700`.

## Tokeni (config Tailwind deja încărcat)
- Culori: `blush` (fundal alb-roz), `candy-100..900` (roz bombon; 600=#FF4FA3 principal, 700=#E11D78 închis, 200=#FFD3E8 soft), `plum` (text închis #2B0A1E), `gold` (#FFD86B accent strălucitor).
- Fonturi: `font-display` (Playfair Display — titluri), `font-body` (Poppins — text), `font-script` (Great Vibes — accente caligrafice sexy, ex. „cu drag”).
- Umbre: `shadow-candy`, `shadow-glow`, `shadow-soft`.

## Clase gata făcute (din css/style.css)
- `.btn-primary`, `.btn-ghost` — butoane (nu repeta padding cu Tailwind decât modifici).
- `.chip-18` — badge 18+.
- `.kicker` — etichetă mică deasupra titlului (uppercase, liniuțe).
- `.title-flourish` — titlu cu inimioară sub.
- `.mc-gradient-text` — text cu gradient roz-auriu strălucitor.
- `.card-soft` — card alb rotund cu hover lift. `.tilt-img` pe imagini în `.group` pentru zoom la hover.
- `.badge-heart` — inimioară rotundă plasată absolut pe carduri de poză.
- `.mc-float` ( plutire), `.mc-beat` (bătaie de inimă), `.mc-pulse-ring` (inel puls), `.mc-shine` (reflexie care trece).
- `.mc-blob` — cerc roz blurat decorativ: `<div class="mc-blob absolute -z-10 w-96 h-96 rounded-full bg-candy-300"></div>`.
- `.mc-marquee` + `.mc-marquee-track` — bandă rulată (conținut duplicat de 2x pentru loop perfect).
- Acordeon: `.acc-item` > button`[data-acc-btn]` + `<div class="acc-body">`; iconiță `.acc-icon` cu `fa-plus`.
- Formular: inputuri cu clasa `.mc-field`.

## Schelet de secțiune (șablon)
```html
<section id="ID_EXACT" class="relative py-24 md:py-32 overflow-hidden">
  <div class="mc-blob absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-candy-200" data-parallax="0.12"></div>
  <div class="mc-blob absolute -bottom-32 -right-20 w-[24rem] h-[24rem] rounded-full bg-candy-300" data-parallax="-0.1"></div>
  <div class="relative mx-auto max-w-7xl px-4">
    <p class="kicker" data-reveal="up">ETICHETĂ MICĂ</p>
    <h2 class="title-flourish font-display text-4xl md:text-5xl font-bold mt-3" data-reveal="up" data-delay="0.08">
      Titlu cu <span class="mc-gradient-text italic">accent roz</span>
    </h2>
    <p class="mt-4 max-w-2xl text-plum/70 leading-relaxed" data-reveal="up" data-delay="0.15">Subtitlu...</p>
    <!-- conținut: grid gap-8 mt-14 -->
  </div>
</section>
```

## Imagini disponibile (assets/img/)
- `hero.jpg` (1344x768) — tinută elegantă neagră cu emblemă inimă roz, lounge roz
- `team.jpg` (1344x768) — grup de 4 colege în uniforme asortate negru/roz
- `bar.jpg` (864x1152, portrait) — barmaniță elegantă la bar cu neon roz
- `hostess.jpg` (864x1152, portrait) — lucrătoare elegantă la intrare, perdea roz
- `backstage.jpg` (1024x1024) — două colege râd backstage, uniforme
- `dance.jpg` (864x1152, portrait) — dansatoare în rochie sclipitoare roz pe podium
- `amsterdam.jpg` (1344x768) — canale olandeze la apus, cer roz
- `uniform.jpg` (1024x1024) — detaliu blazer negru cu etichetă inimă roz

## Decoruri SVG disponibile
- `assets/logo.svg` — inima roz diabolică străpunsă de săgeată (brand)
- `assets/bunny.svg` — iepuraș roz cu fundiță (decor jucăuș — folosește-l discret, mărime mică/medie, opacitate parțială OK)

## Stil „playboy-glam dar classy”
- Titluri mari serif cu cuvinte accentuate `italic` + `mc-gradient-text`.
- Accente `font-script` pentru jurăminte caligrafice („cu drag”, „te așteptăm”).
- Carduri rotunde mari (`rounded-[2rem]`), borduri roz soft, hover ridicare.
- Dungi `mc-marquee` cu text tip „NOW HIRING ♥ OLANDA ♥ 18+ ♥ HOSTESS ♥”.
- Iepurașul apare ca decalcomanie decorativă (opacitate 10–25%, colțuri de secțiune).
- Estetică curată, mult aer, blur blobs roz, fără aglomerare.
