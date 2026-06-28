# Demo web - Jana Klimešová (RE/MAX Glorion, Karlovy Vary)

Nezávazný koncept webu na míru pro realitní makléřku Janu Klimešovou. Postaveno
z obsahu a fotek jejího RE/MAX profilu, přepsáno podle konverzních principů.

## Koncept a strategie

- **Pozice:** místní makléřka, která Karlovarsko zná dům od domu. Hlavní hák je
  "jsem odsud, vyznám se tu" plus její vlastní silná věta "Nahradím Vás ve Vašem
  milovaném domě, na Vás zůstane jen podpis".
- **Zaměření:** prodej, práce s prodávajícími (dle jejích odpovědí v e-mailu).
- **Vizuální styl:** lázeňská elegance Karlových Varů, hluboká zelená a mosaz na
  teplé slonové kosti, patkové písmo Fraunces. Blízko stylu webů Artema Saykina
  a Lukáše Kukly, které se jí líbí. Plynulé animace, žádný generický vzhled.

## Co je na webu reálné

- profilová fotka, telefon, e-mail, adresa kanceláře (Krymská 1056/5, Karlovy Vary)
- 3 ukázkové nemovitosti z její skutečné nabídky (foto, lokalita, výměra, cena)
- odkaz na všech 35 jejích nemovitostí na remax-czech.cz
- recenze klientů jsou její skutečné reference (jen lehce upravená interpunkce)
- hodnocení 5,0 odpovídá hodnocení na jejím profilu

Nic není vymyšlené. Žádné fiktivní recenze, čísla ani výsledky.

## Sekce

1. Hero (foto, headline, CTA, hodnocení)
2. Pruh regionu (Karlovy Vary, Jáchymov, Ostrov, Hroznětín a okolí)
3. Statistiky
4. O mně (místní znalost)
5. Můj přístup (emoční sekce "tu tíhu nesu za Vás")
6. Jak to probíhá (4 kroky) + "Co pro Vás zařídím"
7. Aktuální nabídka (3 nemovitosti + odkaz na vše)
8. Reference
9. CTA
10. Kontakt (formulář + údaje)
11. Patička

Formulář je zatím jen vizuální (po odeslání zobrazí poděkování), bez napojení
na e-mail. Napojení se doplní až při ostrém nasazení.

## Spuštění lokálně

```bash
npm install
npm run dev      # vyvojovy server
npm run build    # produkcni build do dist/
npm run preview  # nahled produkcniho buildu
```

## Stack

React 19, Vite, Tailwind CSS, Motion (framer-motion). Fotky optimalizovány
(skript byl jednorazovy, sharp je jen dev zavislost).

## Další krok

Nasadit `dist/` na Vercel nebo Netlify (zdarma, do minuty) a veřejný odkaz dát
do cold emailu. Nenasazovat bez svolení.
