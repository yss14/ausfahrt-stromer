# Wie realistisch sind die Annahmen im Rechner?

Recherchestand: 17. November 2026. Geprüft wurden alle Startwerte in `src/domain/defaults.ts`, die Steuerlogik in `src/domain/tax.ts`, die CO₂-Faktoren in `src/domain/insights.ts` und die Hinweistexte in `messages/de.json`. Jede Aussage ist im jeweiligen Abschnitt mit Quelle belegt. Werte, die aus Quellenzahlen errechnet wurden, sind als „rechnerisch“ markiert. Zwei Befunde mit großer Wirkung wurden zusätzlich direkt an der Originalquelle nachgeprüft:

- Der Tankrabatt (Energiesteuer −14,04 ct/l, mit Mehrwertsteuer rund −17 ct/l, 1.10. bis 31.12.2026, Benzin und Diesel) ist durch [Ebner Stolz](https://www.ebnerstolz.de/de/unser-angebot/leistungen/steuerberatung/zollrecht-energiesteuer-aussenwirtschaft/erneuter-tankrabatt-ab-01.10.2026-113433.html) und mehrere Presseberichte belegt. Die Seite des Bundesfinanzministeriums war beim Abruf nicht erreichbar.
- Den KBA-Durchschnitt von 10.616 km je Pkw für 2025 nennt der [Kurzbericht „Verkehr in Kilometern“ 2023–2025](https://www.kba.de/DE/Statistik/Kraftverkehr/VerkehrKilometer/vk_inlaenderfahrleistung/2025/verkehr_in_kilometern_kurzbericht_pdf.pdf?__blob=publicationFile&v=5). Die Werte für E-Autos (11.312 km) und Benziner (8.406 km) stehen wörtlich in der [Pressemitteilung 38/2026](https://www.kba.de/DE/Presse/Pressemitteilungen/Allgemein/2026/pm38_2026_verkehr_in_kilometern.html).

## Kurzfazit

Die meisten Startwerte sind realistisch, und die Steuerlogik ist korrekt. Vier Werte verzerren das Ergebnis aber spürbar. Drei davon benachteiligen das E-Auto, einer bevorzugt es:

1. Der Wertverlust des E-Autos ist mit 11 % pro Jahr zu hoch. Marktdaten von November 2026 zeigen für 3 bis 6 Jahre alte E-Autos rund 6 bis 9 %, also etwa so viel wie bei gleichaltrigen Verbrennern.
2. Die Spritpreise sind eine korrekte Momentaufnahme, enthalten aber den Tankrabatt von rund 17 ct/l, der am 31.12.2026 endet. Ohne Rabatt lägen sie bei etwa 2,15 €/l (E10) und 2,38 €/l (Diesel).
3. Die Haltedauer ist mit 5 Jahren eher kurz. Gebrauchtwagen werden laut DAT im Schnitt rund 6 bis 7 Jahre gehalten.
4. Die Fahrleistung ist mit 13.000 km pro Jahr rund 20 % höher als der KBA-Durchschnitt von 10.616 km. Das bevorzugt das E-Auto, weil sich seine Fixkosten auf mehr Kilometer verteilen.

Kleinere Abweichungen: Die HU für den Verbrenner ist mit 140 € alle zwei Jahre veraltet (2026 rund 160 €). Die Wallbox ist mit 1.200 € am unteren Rand. Die THG-Prämie von 250 € liegt über den meisten festen Zusagen für 2027 (rund 200 bis 230 €). Der CO₂-Faktor für Strom (0,36 kg/kWh) entspricht 2024, das UBA schätzt für 2025 0,344 kg/kWh.

## Überblick

| Annahme | Im Rechner | Bewertung | Empfehlung |
|---|---|---|---|
| Spritpreis E10 / Diesel | 1,98 / 2,22 €/l | realistisch, aber mit Tankrabatt bis 31.12.2026 | 2,15 / 2,38 €/l oder Hinweis auf den Tankrabatt |
| Spritpreis-Anstieg | 3 %/Jahr | realistisch | beibehalten, Hinweis zu CO₂-Preis (65 €/t) präzisieren |
| Haushaltsstrom | 35 ct/kWh | realistisch (Verivox-Neukunden 35 ct, BDEW 37,3 ct) | beibehalten |
| Öffentliches Laden AC / DC | 55 / 69 ct/kWh | realistisch | beibehalten, Spannen im Hinweis nennen |
| Strompreis-Anstieg | 1,5 %/Jahr | realistisch, eher unterer Rand | beibehalten |
| Lademix | 70 % zu Hause | unklar, keine Messdaten | beibehalten, Hinweis für Laternenparker |
| Ladeverluste | 10 % | realistisch als Mischwert | beibehalten, Hinweis auf ADAC 08/2026 aktualisieren |
| Verbrauch E-Auto / Benziner | 17 kWh / 6,5 l | realistisch, beide eher am günstigen Rand | beibehalten |
| Versicherung | 650 / 800 € | realistisch | beibehalten, Hinweis präzisieren |
| Wartung | 800 / 520 € | realistisch | beibehalten |
| Reifen | 150 / 190 € | realistisch, ohne Räderwechsel | beibehalten, Hinweis ergänzen |
| HU/AU Verbrenner | 70 €/Jahr | zu niedrig | 80 €/Jahr („ca. 160 € alle 2 Jahre“) |
| HU E-Auto | 55 €/Jahr | realistisch | beibehalten |
| Wallbox | 1.200 € | zu niedrig | 1.500 € |
| Einmalkosten Kauf | 270 / 120 € | realistisch | beibehalten |
| Kaufpreis E-Auto (EZ 2022) | 22.000 € | realistisch | beibehalten |
| Wert Verbrenner | 12.000 € | realistisch, eher hoch bei Inzahlungnahme | beibehalten |
| Wertverlust E-Auto | 11 %/Jahr | zu hoch | 9 %/Jahr, Hinweistext korrigieren |
| Wertverlust Verbrenner | 9 %/Jahr | realistisch | beibehalten |
| Akku-Alterung, Garantie, Rücklage | 2 %/Jahr, 8 J./160.000 km, 0 € | realistisch | beibehalten |
| Batteriezertifikat als „wichtigster Faktor“ | Hinweistext | nicht belegt | abschwächen (VMF: rund 5–6 % Preisunterschied) |
| Kfz-Steuer E-Auto (Befreiung, Satz) | § 3d, bis 2035; 56,25 € | korrekt | Paragraf auf § 9 Abs. 1 Nr. 3 korrigieren, auf volle Euro abrunden |
| Kfz-Steuer Verbrenner | 98 € | korrekt | Label „Euro 4+“ in „Euro 3 oder besser“ ändern |
| THG-Prämie | 250 €/Jahr | unklar für 2027 ff. | rund 220 € oder als Annahme kennzeichnen |
| Kaufprämie | keine | korrekt (nur Neuwagen) | beibehalten |
| Fahrleistung | 13.000 km | zu hoch | 11.000 km |
| Haltedauer | 5 Jahre | zu niedrig | 6 Jahre |
| Zins | 3 % | realistisch, Hinweis „Tagesgeld“ irreführend | beibehalten, Hinweis auf Festgeld bzw. Kreditzins ändern |
| CO₂-Faktor Strom | 0,36 kg/kWh | veraltet | 0,34 kg/kWh |
| CO₂-Faktor Benzin / Diesel | 2,37 / 2,65 kg/l | realistisch | beibehalten |
| Herstellungsemissionen | nicht eingerechnet | vertretbar beim Gebrauchtkauf | im Hinweis transparent machen |

## Wie stark ändern die Empfehlungen das Ergebnis?

Berechnet mit `computeTco`, `firstCurveCrossing` und `breakEvenKmPerYear` aus `src/domain/`. Jede Zeile ändert nur den genannten Wert gegenüber den heutigen Startwerten, die letzte Zeile alle zusammen. „Gesamt“ sind die Kosten über die Haltedauer.

| Änderung | Gesamt Verbrenner | Gesamt E-Auto | Mehrkosten E-Auto | Kurven kreuzen | E-Auto lohnt ab |
|---|---|---|---|---|---|
| heutige Startwerte | 23.738 € | 25.808 € | 2.070 € | nicht in 7 Jahren | 21.000 km/Jahr |
| E10 2,15 €/l | 24.501 € | 25.808 € | 1.307 € | nach 7,0 Jahren (Prognose) | 17.500 km/Jahr |
| 11.000 km/Jahr | 22.372 € | 24.977 € | 2.606 € | nicht in 7 Jahren | 21.000 km/Jahr |
| 6 Jahre | 28.344 € | 29.972 € | 1.627 € | nicht in 8 Jahren | 18.000 km/Jahr |
| Wertverlust E-Auto 9 % | 23.738 € | 24.472 € | 734 € | nach 6,4 Jahren (Prognose) | 16.000 km/Jahr |
| HU Verbrenner 80 € | 23.788 € | 25.808 € | 2.020 € | nicht in 7 Jahren | 21.000 km/Jahr |
| Wallbox 1.500 € | 23.738 € | 26.108 € | 2.370 € | nicht in 7 Jahren | 22.000 km/Jahr |
| THG-Prämie 220 € | 23.738 € | 25.958 € | 2.220 € | nicht in 7 Jahren | 21.500 km/Jahr |
| alle zusammen | 27.526 € | 28.039 € | 513 € | nach 6,9 Jahren (Prognose) | 12.500 km/Jahr |

Den größten Einfluss haben der Wertverlust des E-Autos und der Spritpreis ohne Tankrabatt. Mit allen Empfehlungen bleibt das E-Auto im Standardfall knapp teurer, die Schwelle, ab der es sich lohnt, sinkt aber von 21.000 auf 12.500 km pro Jahr. Die niedrigere Fahrleistung allein macht das E-Auto teurer, weil seine Fixkosten (Wallbox, höhere Versicherung) auf weniger Kilometer verteilt werden.

## Energie und Laden

### 1. Kraftstoffpreise (Super E10 1,98 €/l, Diesel 2,22 €/l)

- **Im Rechner:** E10 1,98 €/l, Diesel 2,22 €/l; Hinweis „ADAC-Schnitt 11.11.2026: E10 1,978 €, Diesel 2,217 €“.
- **Befund:**
  - Die ADAC-Pressemeldung vom 11.11.2026 nennt als bundesweiten Durchschnitt 1,978 €/l für Super E10 und 2,217 €/l für Diesel. Die Werte im Rechner stimmen also exakt. Brent stand laut ADAC bei rund 91 US-Dollar je Barrel.
  - Laut dpa/ADAC (9.11.2026) lag der Tagesschnitt am Sonntag davor bei 1,996 € (E10) und 2,241 € (Diesel). Am 8.10.2026 waren es 2,140 € bzw. 2,242 €. Einen neueren ADAC-Wert als den vom 11.11.2026 habe ich nicht gefunden.
  - **Wichtig:** Die Preise sind derzeit durch den zweiten „Tankrabatt“ gedrückt. Die Energiesteuer auf Benzin und Diesel ist vom 1.10. bis 31.12.2026 um 14,04 ct/l gesenkt, mit Mehrwertsteuer sind das rund 17 ct/l (Ebner Stolz, 1.10.2026; Bundesrat-Beschluss 25.9.2026). Ab dem 1.1.2027 gelten wieder die alten Steuersätze. Schon im Mai und Juni 2026 gab es einen ersten Tankrabatt in ähnlicher Höhe.
  - Ohne Tankrabatt lägen die heutigen Preise rechnerisch bei etwa 2,15 €/l (E10) und 2,38 €/l (Diesel). Dabei bleibt alles andere gleich, und die Senkung muss vollständig weitergegeben worden sein. Laut ADAC war das nicht immer der Fall.
  - Das Preisniveau ist krisengetrieben (Nahost/Iran, Straße von Hormus). Mitte Juni 2026 kostete E10 noch 1,854 € und Diesel 1,797 € (ADAC, 17.6.2026).
- **Bewertung:** realistisch. Als Momentaufnahme stimmen die Werte exakt mit dem ADAC überein. Sie enthalten aber einen befristeten Steuerrabatt von rund 17 ct/l, der am 31.12.2026 endet.
- **Empfehlung:** Für eine mehrjährige Kostenrechnung ist ein Startwert ohne Tankrabatt sinnvoller: E10 2,15 €/l, Diesel 2,38 €/l. Neuer Hinweistext: „ADAC 11.11.2026: E10 1,978 €, Diesel 2,217 € – inkl. Tankrabatt (−17 ct/l), der am 31.12.2026 endet“. Alternativ bleiben die Werte, und der Hinweis wird um diesen Zusatz ergänzt.
- **Quellen:**
  - [ADAC e.V.: Kraftstoffpreise – Super E10 wieder unter 2 Euro (11.11.2026)](https://presse.adac.de/meldungen/adac-ev/verkehr/kraftstoffpreise-super-e10-wieder-unter-2-euro.html)
  - [inFranken/dpa: Spritpreise sinken – E10 im Tagesschnitt unter 2 Euro (9.11.2026)](https://www.infranken.de/deutschland/spritpreise-sinken-e10-im-tagesschnitt-unter-2-euro-art-6409789,PRINT) (Sekundärquelle, zitiert ADAC)
  - [ADAC e.V.: Kraftstoffpreise sinken zwar deutlich, aber nicht genug (17.6.2026)](https://presse.adac.de/meldungen/adac-ev/verkehr/kraftstoffpreise-sinken-zwar-deutlich-aber-nicht-genug.html)
  - [Ebner Stolz: Bundestag und Bundesrat beschließen erneuten Tankrabatt ab 01.10.2026 (1.10.2026)](https://www.ebnerstolz.de/de/unser-angebot/leistungen/steuerberatung/zollrecht-energiesteuer-aussenwirtschaft/erneuter-tankrabatt-ab-01.10.2026-113433.html) (Sekundärquelle, Steuerberatung)
  - [transport-online/dpa: Spritpreise nach Tankrabatt wieder teurer (2.10.2026)](https://transport-online.de/news/spritpreise-benzin-und-diesel-nach-tankrabatt-wieder-teurer-193896.html) (Sekundärquelle)

### 2. Preissteigerung Kraftstoff (3 % pro Jahr)

- **Im Rechner:** 3 %/Jahr; Hinweis „CO₂-Preis 2027 bei 55–65 €/t, ab 2028 EU-ETS2“.
- **Befund:**
  - **BEHG 2026:** Seit 2026 wird der Preis versteigert, innerhalb eines Korridors von 55 bis 65 €/t. Laut ADAC endeten alle Versteigerungen 2026 beim Höchstpreis von 65 €/t (ADAC, 10.11.2026).
  - **BEHG 2027:** Das Kabinett hat am 12.8.2026 beschlossen, den Korridor von 55 bis 65 €/t für 2027 beizubehalten (hib 692/2026 vom 8.9.2026). Laut ADAC hat der Bundestag die Änderung am 15.10.2026 beschlossen, die Zustimmung des Bundesrats wurde für November 2026 erwartet. Ob der Bundesrat schon zugestimmt hat, habe ich nicht verifiziert.
  - **EU-ETS2:** Der Start ist um ein Jahr auf 2028 verschoben (Bundestag hib 8.9.2026; ADAC 10.11.2026). Die erste ETS2-Auktion ist laut Carbon Pulse für den 18.1.2027 angesetzt. Analysten erwarten dort rund 50 €/t im Jahr 2028 und etwa 90 €/t bis 2032. Das ist eine Sekundärquelle hinter einer Paywall; gesehen habe ich nur den Anrisstext.
  - **Preisdämpfung im ETS2:** Steigt der Preis über rund 45 €/t (in Preisen von 2020), werden zusätzliche Zertifikate freigegeben. Das ist kein harter Preisdeckel. Laut ADAC lässt sich der Preis ab 2028 „noch nicht verlässlich vorhersagen“.
  - **Cent je Liter pro 10 €/t:** Die ADAC-Tabelle weist brutto inkl. MwSt. aus: 55 €/t entsprechen 15,7 ct/l (Benzin) und 17,3 ct/l (Diesel), 65 €/t entsprechen 18,6 bzw. 20,5 ct/l. Je 10 €/t sind das also etwa **+2,9 ct/l Benzin** und **+3,2 ct/l Diesel** brutto.
  - **Sondereffekt 2027:** Das Ende des Tankrabatts zum 1.1.2027 bringt einen Sprung von rund +17 ct/l, also etwa +8,5 % auf E10 (rechnerisch). Der CO₂-Preis bleibt 2027 dagegen voraussichtlich unverändert.
  - Eine amtliche Langfristprognose für Endkundenpreise von Benzin oder Diesel habe ich nicht gefunden (keine belastbare Quelle gefunden). Der Rohölpreis schwankt 2026 stark: Brent lag im Juni bei rund 79 $ und im November bei 91 $.
- **Bewertung:** realistisch. 3 % nominal pro Jahr ist als langfristige Annahme vertretbar, denn Inflation und ein ab 2028 eher steigender CO₂-Preis treiben den Preis. Der Hinweistext ist aber unvollständig: Der Korridor ist richtig, praktisch gilt aber der Höchstpreis von 65 €/t, und der Tankrabatt endet zum Jahreswechsel.
- **Empfehlung:** 3 % beibehalten (Startwert siehe Punkt 1). Neuer Hinweistext: „CO₂-Preis 2026/27: 65 €/t (Obergrenze des Korridors 55–65 €), ab 2028 EU-ETS2; je +10 €/t ≈ +2,9 ct/l Benzin, +3,2 ct/l Diesel. Tankrabatt (−17 ct/l) endet 31.12.2026.“
- **Quellen:**
  - [ADAC: CO₂-Steuer bei Benzin und Diesel – so viel müssen Autofahrer 2027 zahlen (10.11.2026)](https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/kfz-steuer/co2-steuer/)
  - [Deutscher Bundestag, hib 692/2026: Gesetzentwurf zum BEHG (8.9.2026)](https://www.bundestag.de/1210950)
  - [leinetal24: CO₂-Preis gestoppt – Bundestag bremst Anstieg (16.10.2026)](https://www.leinetal24.de/wirtschaft/co2-preis-gestoppt-bundestag-bremst-anstieg-mit-folgen-zr-94544024.html) (Sekundärquelle)
  - [Carbon Pulse: EU ETS2 prices seen rising to €90 by 2032 as auctions start in January (Oktober 2026)](https://carbon-pulse.com/557713/) (Sekundärquelle, Paywall, nur Anrisstext gelesen)
  - [ZfK: CO₂-Preis 2027 – Einigung Union/SPD zu BEHG und ETS2 (2026)](https://www.zfk.de/politik/deutschland/co2-preis-2027-einigung-union-spd-behg-ets2) (Sekundärquelle, nur über die Suche gesehen)

### 3. Haushaltsstrompreis fürs Laden zu Hause (35 ct/kWh)

- **Im Rechner:** 35 ct/kWh; Hinweis „BDEW-Schnitt 37,3 ct“.
- **Befund:**
  - **BDEW-Strompreisanalyse 10/2026:** Der Durchschnitt für Haushalte 2026 liegt bei 37,3 ct/kWh. Davon entfallen 15,4 ct auf Beschaffung und Vertrieb, 9,2 ct auf Netzentgelte und 12,6 ct auf Steuern, Abgaben und Umlagen. Durch den Bundeszuschuss zu den Übertragungsnetzentgelten sanken die Netzentgelte um 1,7 ct/kWh. Laut BDEW haben die durch den Iran-Konflikt gestiegenen Großhandelspreise die Neukundentarife ab 1.10.2026 erhöht.
  - **Verivox (Seite mit Stand 17.11.2026):** Neukundentarife mit 12 Monaten Preisgarantie kosten rund 35 ct/kWh brutto, inklusive Boni. Bei 4.000 kWh ergibt sich im Schnitt 35,7 ct/kWh bzw. 1.426 €/Jahr. Laut Verivox dürften die Nahost-Krisen „zeitversetzt“ auch die Haushaltsstrompreise erhöhen.
  - **Wärmepumpenstrom (Verivox, Stand 13.7.2026):** Neukunden zahlen im Schnitt 20,7 ct/kWh, bei 7.500 kWh und mit separatem Zähler. Einen Durchschnittswert für reine Autostromtarife habe ich nicht gefunden (keine belastbare Quelle gefunden).
  - **§14a EnWG (BNetzA-Festlegung BK8-22/010-A):** Wer eine steuerbare Wallbox oder Wärmepumpe betreibt, erhält ein reduziertes Netzentgelt.
    - Modul 1: pauschal etwa 110–190 € brutto pro Jahr, je nach Netzgebiet.
    - Modul 2: Der Netzentgelt-Arbeitspreis sinkt um 60 %; nötig ist ein separater Zählpunkt. Im Beispiel der Netze BW 2026 sinkt er von 7,57 auf 3,03 ct/kWh netto (laut 42watt).
    - Modul 3: zeitvariables Netzentgelt, nur zusammen mit Modul 1 und einem Smart Meter.
    - Für eine Wallbox sinkt der Ladestrompreis damit, grob um einige ct/kWh. Die Höhe hängt vom Netzbetreiber ab.
- **Bewertung:** realistisch. 35 ct/kWh entspricht genau dem aktuellen Verivox-Neukundenschnitt und liegt leicht unter dem BDEW-Jahresschnitt von 37,3 ct, der auch Bestandsverträge abbildet.
- **Empfehlung:** 35 ct beibehalten. Neuer Hinweistext: „Neukunden ca. 35 ct (Verivox 17.11.2026), BDEW-Schnitt 2026: 37,3 ct; mit Wärmepumpen-/§14a-Tarif (separater Zähler) deutlich günstiger“.
- **Quellen:**
  - [BDEW: Strompreisanalyse (Web-Zusammenfassung, Oktober 2026)](https://www.bdew.de/service/daten-und-grafiken/bdew-strompreisanalyse/)
  - [BDEW: Strompreisanalyse 10/2026 (PDF)](https://www.bdew.de/media/documents/BDEW_Strompreisanalyse_102026_1.pdf) (PDF war für mich technisch nicht lesbar; Zahlen von der BDEW-Webseite)
  - [Verivox: Strompreise (Stand 17.11.2026)](https://www.verivox.de/strom/strompreise/)
  - [Verivox: Wärmepumpenstrom-Preisentwicklung (13.7.2026)](https://www.verivox.de/heizstrom/waermepumpenstrom-preisentwicklung/)
  - [Bundesnetzagentur: § 14a EnWG – Festlegung und FAQ](https://www.bundesnetzagentur.de/DE/Beschlusskammern/BK08/BK8_06_Netzentgelte/68_Para14a_EnWG/BK8_14a_EnWG.html)
  - [Bundesnetzagentur: Pressemitteilung zu steuerbaren Verbrauchseinrichtungen (27.11.2023)](https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/DE/2023/20231127_14a.html)
  - [42watt: § 14a EnWG 2026 – Module 1–3 (2026)](https://42watt.de/magazin/paragraph-14a-enwg) (Sekundärquelle, Netze-BW-Beispiel)

### 4. Öffentliches Laden (AC 55 ct/kWh, DC 69 ct/kWh)

- **Im Rechner:** AC 55 ct/kWh, DC-Schnellladen 69 ct/kWh.
- **Befund:**
  - **ACE (9.11.2026):**
    - Typische Preisspannen: AC etwa 40–60 ct, DC 50–80 ct, HPC etwa 60–80 ct oder mehr.
    - Vertragstarife mit Grundgebühr: etwa 0,39–0,55 €/kWh; ohne Grundgebühr: oft 0,50–0,75 €/kWh.
  - **Aral pulse (ab 1.7.2026):**
    - Klassik-Tarif (ohne Grundgebühr): AC 0,47 €, DC bis 50 kW 0,52 €, DC über 50 kW 0,62 €.
    - Extra-Tarif (2,99 €/Monat): 0,41 €, 0,46 € bzw. 0,54 €.
    - Ad hoc: AC 0,59 €, DC 0,69 € bzw. 0,79 €.
  - **Ionity:** Die Preise stiegen zum 1.7.2026 um durchschnittlich etwa 4 %, ad hoc auf bis zu 0,76 €/kWh. Einfach E-Auto nennt für Oktober 2026 0,72 €/kWh ad hoc.
  - **EnBW mobility+:**
    - Ladetarif L: AC 0,39 € bei 11,99 €/Monat.
    - Fremdnetz-Preise im HyperNetz: 56 bis max. 89 ct/kWh (EnBW-Tarifseite).
    - Ad-hoc-DC an EnBW-Säulen: 0,59–0,66 € (Einfach E-Auto, Oktober 2026).
  - **Maingau Autostrom Vorteil (ohne Grundgebühr):** AC 0,42 €, DC 0,52 € (Einfach E-Auto, Oktober 2026).
  - **EWE Go:** 0,52 € an eigenen Säulen, 0,62 € im Partnernetz.
  - **Weitere Ad-hoc-Preise DC (Oktober 2026):** Fastned 0,69 €, Electra 0,69 €, E.ON Drive 0,57–0,74 €, Vattenfall 0,47–0,52 €.
  - **ADAC:** Unter rund 50 ct/kWh lädt man unterwegs selten. Ad hoc war in der ADAC-Autobahnerhebung 2025 bis zu 62 % teurer als ein Vertrag ohne Grundgebühr, zum Beispiel 84 statt 52 ct bei EWE Go.
  - **Tesla Supercharger für Fremdmarken und Allego:** Für 2026 keine belastbare Quelle gefunden. Tesla-Preise schwanken je Standort und Uhrzeit; Sekundärberichte nennen für September 2026 0,20 € (nachts) bis 0,60 €.
- **Bewertung:** realistisch. 55 ct (AC) und 69 ct (DC) liegen in der Mitte der Spannen für 2026, die für Tarife ohne Grundgebühr und für Ad-hoc-Laden gelten (AC ca. 42–59 ct, DC ca. 52–79 ct). Mit Abo sind etwa 39–55 ct möglich.
- **Empfehlung:** Werte beibehalten. Hinweistext: „2026 ohne Grundgebühr/ad hoc: AC ca. 42–59 ct, DC ca. 52–79 ct; mit Lade-Abo ab ca. 39 ct (ACE, Aral pulse, EnBW, Ionity)“.
- **Quellen:**
  - [ACE Auto Club Europa: Ladepreise (9.11.2026)](https://www.ace.de/elektromobilitaet/laden-wallbox/ladepreise/)
  - [EnBW: mobility+ Ladetarife (Seite abgerufen 11/2026, Tarifkacheln „Stand 01.12.2025“)](https://www.enbw.com/elektromobilitaet/produkte/ladetarife)
  - [Dr. Web: E-Auto-Ladepreise driften auseinander – Aral senkt, Ionity erhöht (15.7.2026)](https://www.drweb.de/e-auto-ladepreise-driften-auseinander-aral-senkt-ionity-erhoeht-zum-selben-stichtag/) (Sekundärquelle; die Betreiberseiten von Aral und Ionity konnte ich nicht direkt abrufen)
  - [Einfach E-Auto: E-Auto-Ladetarife im Oktober 2026 (Oktober 2026)](https://einfacheauto.de/blog/e-auto-ladetarife-im-oktober-2026) (Sekundärquelle)
  - [ADAC: Ladetarife für Elektroautos 2026 (2026)](https://www.adac.de/rund-ums-fahrzeug/elektromobilitaet/laden/elektroauto-ladesaeulen-strompreise/)
  - [autohaus.de: ADAC-Test auf Autobahnen – Ad-hoc-Laden bis zu 62 Prozent teurer (28.7.2025)](https://www.autohaus.de/nachrichten/autohandel/adac-test-auf-autobahnen-ad-hoc-laden-bis-zu-62-prozent-teurer-3691826) (Sekundärquelle zur ADAC-Erhebung)

### 5. Preissteigerung Strom (1,5 % pro Jahr)

- **Im Rechner:** 1,5 %/Jahr.
- **Befund:**
  - **2026:** Der Haushaltsstrompreis ist gegenüber 2025 gesunken, vor allem weil der Bundeszuschuss zu den Übertragungsnetzentgelten die Netzentgelte um 1,7 ct/kWh senkte (BDEW 10/2026).
  - **Zuschuss 2027:** Geplant sind rund 5,5 Mrd. € aus dem Klima- und Transformationsfonds, 1 Mrd. € weniger als 2026. Das BMWE erwartet 2027 eine Entlastung von etwa 1,7 ct/kWh, das sind 0,3 ct weniger als 2026 (ZfK, 13.8.2026).
  - **Stromsteuer:** Für Haushalte bleibt sie bei 2,05 ct/kWh; die Senkung auf das EU-Minimum gilt nur für das produzierende Gewerbe und die Land- und Forstwirtschaft (ZfK, 13.8.2026). Eine Senkung auch für Haushalte ist weiter offen und steht unter Finanzierungsvorbehalt. Sie würde bei 3.500 kWh rund 81 €/Jahr sparen (echo24, 28.10.2026).
  - **Umlagen 2027:** Aufschlag für besondere Netznutzung, Offshore-Netzumlage und KWK-Umlage steigen zusammen von 2,946 auf 3,621 ct/kWh netto (+22,9 %). Bei 3.500 kWh sind das etwa +28 €/Jahr brutto. Die Netzentgelte steigen 2027 laut einer Verivox-Berechnung für ASEW im Schnitt um etwa 1,9 % (echo24, 28.10.2026).
  - **Großhandel:** Laut BDEW und Verivox treiben die Nahost-Krisen seit Herbst 2026 die Großhandelspreise und damit zeitversetzt die Endkundenpreise.
  - **Langfrist:** Verivox zitiert das BMWE mit der Erwartung eines leichten, aber stetigen Anstiegs der Verbraucherstrompreise bis 2040. Eine konkrete Prozentzahl habe ich in einer Primärquelle nicht gefunden (keine belastbare Quelle gefunden).
- **Bewertung:** realistisch. Für 2027 deutet alles auf einen leichten Anstieg hin (kleinerer Zuschuss, höhere Umlagen und Netzentgelte, teurerer Großhandel); langfristig erwartet das BMWE ebenfalls einen leichten Anstieg. 1,5 % nominal liegt eher am unteren Rand, ist aber plausibel.
- **Empfehlung:** 1,5 % beibehalten. Optionaler Hinweis: „2027: Netzentgelt-Zuschuss sinkt, Umlagen +0,7 ct; Stromsteuersenkung für Haushalte nicht beschlossen“.
- **Quellen:**
  - [BDEW: Strompreisanalyse (Oktober 2026)](https://www.bdew.de/service/daten-und-grafiken/bdew-strompreisanalyse/)
  - [ZfK: Strompreis 2027 – Reiches Entlastungen im Überblick (13.8.2026)](https://www.zfk.de/politik/deutschland/strompreis-2027-reiche-entlastungen-ueberblick) (Fachpresse)
  - [echo24: Strompreis 2027 – Umlagen steigen um 23 Prozent (28.10.2026)](https://www.echo24.de/welt/strompreis-2027-umlagen-steigen-um-23-prozent-das-zahlen-haushalte-zr-94561774.html) (Sekundärquelle, Werte der Übertragungsnetzbetreiber via ASEW)
  - [Verivox: Strompreise (Stand 17.11.2026)](https://www.verivox.de/strom/strompreise/)

### 6. Lademix (70 % zu Hause/Arbeit, vom Rest 50 % DC)

- **Im Rechner:** 70 % zu Hause oder bei der Arbeit, vom Rest 50 % DC (also je 15 % öffentlich AC und DC).
- **Befund:**
  - **BDEW/UScale-Umfrage:** 1.009 BEV-Fahrende, befragt im Juli/August 2026, veröffentlicht am 7.9.2026. Mehrfachnennungen waren möglich.
    - 75 % laden (auch) zu Hause, 2025 waren es 82 %.
    - 40 % laden beim Arbeitgeber, 40 % am Straßenrand.
    - 39 % nutzen innerstädtische Ladehubs (2025: 21 %), 47 % Kundenparkplätze, 34 % laden unterwegs bzw. an der Autobahn.
    - 77 % nutzen mindestens einen öffentlichen Ladeort.
  - **E.ON-Umfrage (berichtet 26.10.2026), am häufigsten genutzter Ort:**
    - eigene Wallbox: 63 %
    - Arbeitsplatz: 11 %
    - Schnelllader in der Stadt: 10 %
    - städtische Normallader: 7 %
    - Die Stichprobengröße ist nicht angegeben.
  - Beide Umfragen messen Anteile der Fahrenden, nicht die geladene Energiemenge. Daten zum kWh-Anteil von privatem und öffentlichem Laden in Deutschland: keine belastbare Quelle gefunden.
- **Bewertung:** unklar. Die Umfragen stützen „zu Hause/Arbeit als Hauptladeort“ für rund drei Viertel der Fahrenden, eine gemessene Energieverteilung gibt es aber nicht. Rund ein Viertel lädt gar nicht zu Hause, bei ihnen läge der Anteil deutlich niedriger.
- **Empfehlung:** 70 % als Standard beibehalten. Hinweistext ergänzen: „BDEW/UScale 2026: 75 % der E-Auto-Fahrenden laden (auch) zu Hause; ohne eigene Wallbox Anteil deutlich senken“.
- **Quellen:**
  - [electrive.net: BDEW-Umfrage – Ladehubs gewinnen deutlich an Bedeutung (7.9.2026)](https://www.electrive.net/2026/09/07/bdew-umfrage-ladehubs-sind-wichtiger/) (Fachpresse; die BDEW-Seite selbst nennt keine Prozentwerte)
  - [BDEW: Umfrage E-Autos/Elektromobilität (2.9.2026)](https://www.bdew.de/energie/elektromobilitaet-dossier/umfrage-e-autos-elektromobilitaet/)
  - [ecomento: Umfrage – Wallbox zu Hause bleibt beliebtester Ladeort (26.10.2026)](https://ecomento.de/2026/10/26/umfrage-wallbox-zu-hause-bleibt-beliebtester-ladeort-fuers-e-auto/) (Sekundärquelle, E.ON-Umfrage)

### 7. Ladeverluste (10 %)

- **Im Rechner:** 10 %; Hinweis „ADAC: Wallbox 5–10 %, Steckdose bis 30 %“.
- **Befund:**
  - **ADAC-Messung vom 6.8.2026, AC-Laden** (fünf aktuelle Modelle, 10–90 % Ladestand, Zuleitung eingerechnet):
    - Wallbox 11 kW: 5,1–7,0 % (Volvo EX30 an 22 kW: 6,7 %)
    - PV-Überschussladen mit 4,1 kW: 8,0–12,8 %
    - Haushaltssteckdose (2,3 kW): 12,7–24,2 %
  - **ADAC, DC-Laden:**
    - etwa 3 % Wandlungsverlust in der Säule
    - im Auto 1–10 %, je nach Vorkonditionierung und Temperatur
    - insgesamt 5–15 %
  - Die Angabe „Wallbox 5–10 %, Steckdose 10–30 %“ stammt aus einer älteren ADAC-Meldung vom 13.9.2022. Die knapp 30 % maß der ADAC damals an einem Renault Zoe an der Steckdose.
- **Bewertung:** realistisch. 10 % ist für reines Wallbox-Laden etwas hoch, als Mischwert über Wallbox, Winter bzw. kalte Batterie und Schnellladen aber plausibel. Der Hinweistext ist veraltet.
- **Empfehlung:** 10 % beibehalten (oder 8 % bei überwiegend Wallbox). Neuer Hinweistext: „ADAC 08/2026: Wallbox 5–7 %, Schnellladen 5–15 %, Steckdose 13–24 %“.
- **Quellen:**
  - [ADAC: Ladeverluste beim Elektroauto – So viel Strom geht beim Laden verloren (6.8.2026)](https://www.adac.de/rund-ums-fahrzeug/elektromobilitaet/laden/ladeverluste-elektroauto-studie/)
  - [ADAC e.V.: Ladeverluste bei E-Autos (13.9.2022)](https://presse.adac.de/meldungen/adac-ev/technik/ladeverluste-bei-e-autos.html)

### 8. Verbrauch E-Auto (17 kWh/100 km) und Verbrenner (6,5 l/100 km)

- **Im Rechner:** E-Auto 17 kWh/100 km „Jahresschnitt inkl. Winter“ (Bordcomputer, ohne Ladeverluste); Benziner-Kompakter 6,5 l/100 km.
- **Befund E-Auto:**
  - **ADAC-Autotest VW ID.3 Pro Performance 58 kWh (Stand November 2020):**
    - Ecotest-Verbrauch 19,3 kWh/100 km inklusive Ladeverluste (Wallbox, 3-phasig 16 A).
    - Innerorts etwa 16,1, außerorts 20,1, Autobahn 21,4 kWh/100 km.
    - Eine Vollladung brauchte 64,8 kWh für 58 kWh netto, also etwa 10 % Verlust.
    - Rechnerisch ergeben sich daraus rund 17,4 kWh/100 km ab Batterie. Das ist ein Wert unter Testbedingungen, nicht im Winter.
  - **ADAC, Wintermessung auf dem Testgelände (um 0 °C gegenüber 20 °C):** ID.3 etwa +30 %, Renault Zoe und Peugeot e-208 etwa +21 % (ecomento, 22.1.2024).
  - **Green NCAP, Kurzstrecke bei −7 °C:** Tesla Model 3 steigt von 16,5 auf 28,5 kWh/100 km.
  - **Spritmonitor (Abruf 26.11.2025):**
    - Tesla Model 3: 18,2 kWh/100 km (825 Datensätze, inkl. Performance)
    - Hyundai Kona Elektro: 16,1 kWh/100 km (333 Nutzer)
    - Ob diese Nutzerangaben Ladeverluste enthalten, ist nicht einheitlich.
    - Für ID.3 und Zoe: keine belastbare Quelle gefunden (Spritmonitor blockiert den Abruf).
- **Befund Verbrenner:**
  - **Autokostencheck (Nutzerangaben):**
    - Golf VII 1.5 TSI: 6,5 l/100 km (655 Meldungen, Normwert 4,8)
    - Golf VIII 1.5 TSI 130 PS: 7,3 l/100 km (364 Meldungen, Normwert 5,4)
  - **Einzelne Spritmonitor-Fahrzeuge Golf 1.5 TSI:** 6,6–7,2 l/100 km. Das sind Einzelprofile, nicht repräsentativ.
  - **EU-Kommission (OBFCM-Daten, Erstzulassung 2022):** Benziner verbrauchen real im Schnitt 21,1 % bzw. 1,3 l/100 km mehr als nach Typprüfwert. Rechnerisch entspricht das etwa 7,5 l/100 km über alle neuen Benziner inklusive SUVs.
- **Bewertung:** realistisch. 17 kWh/100 km ab Bordcomputer passt zu Kona und Model 3 und ist für einen ID.3 im Jahresmittel mit Winter eher knapp. 6,5 l/100 km liegt für einen gebrauchten Benzin-Kompakten am unteren Rand der realen Nutzerwerte (6,5–7,3 l).
- **Empfehlung:** 17 kWh beibehalten (oder 18 kWh für einen vorsichtigeren Ansatz). Beim Benziner 6,5 l beibehalten oder auf 7,0 l anheben. Hinweistext für den Benziner: „Realwerte Golf 1.5 TSI laut Nutzerdaten 6,5–7,3 l/100 km“.
- **Quellen:**
  - [ADAC Autotest: VW ID.3 Pro Performance 1st Max (November 2020, PDF)](https://assets.adac.de/image/upload/v1607082434/ADAC-eV/KOR/Text/PDF/VW_ID_3_Pro_Performance_58_kWh_1st_Max_vjjkbf.pdf)
  - [ecomento: Elektroauto-Mehrverbrauch im Winter laut ADAC (22.1.2024)](https://ecomento.de/2024/01/22/elektroauto-mehrverbrauch-im-winter-adac/) (Sekundärquelle zu ADAC/Green NCAP)
  - [elektroauto-news: 7 E-Autos, die im Alltag besonders sparsam sind – Spritmonitor-Daten (29.11.2025)](https://www.elektroauto-news.net/news/7-eautos-verbrauch-sparsam-alltag-reale-daten) (Sekundärquelle zu Spritmonitor)
  - [Autokostencheck: Golf VII 1.5 TSI Verbrauch (abgerufen 17.11.2026)](https://www.autokostencheck.de/VW/VW-Golf/Golf-VII/golf-vii-1-5-tsi-au_45749/verbrauch/) (Nutzerdaten)
  - [Autokostencheck: Golf VIII 1.5 TSI Verbrauch (abgerufen 17.11.2026)](https://www.autokostencheck.de/VW/VW-Golf/Golf-VIII/golf-viii-1-5-tsi-cd_49131/verbrauch/) (Nutzerdaten)
  - [EU-Kommission: Real-world CO₂ emissions and fuel consumption of cars and vans collected in 2022 (26.7.2024)](https://climate.ec.europa.eu/news-other-reads/news/publication-real-world-co2-emissions-and-fuel-consumption-cars-and-vans-collected-2022-2024-07-26_en)

## Laufende Kosten und Einmalkosten

### 1. Versicherung (Haftpflicht + Kasko-Mix)

- **Im Rechner:** Verbrenner 650 €/Jahr, E-Auto 800 €/Jahr. Hinweis: „Verivox 2026: in ca. der Hälfte der Tarife teurer“.
- **Befund:**
  - Verivox (27.01.2026) hat über 400 Vollkasko-Tarife von rund 70 Versicherern durchgerechnet (Profil: 45 Jahre, Berlin, 12.000 km, SF 15). Beim BMW X3 ist die E-Version in rund 49 % der Tarife teurer, in rund 32 % günstiger. Beim Enyaq/Kodiaq-Paar ist der Stromer in rund 40 % teurer und in 35 % günstiger. Die Aufschläge reichen bis 44 %, die besten Tarife sind für das E-Auto bis 23 % günstiger. Euro-Beträge und Kompaktmodelle nennt Verivox nicht.
  - Der GDV (13.08.2025, 53 Modellpaare) findet: In der Vollkasko sind Schäden an E-Autos im Schnitt 15–20 % teurer als bei vergleichbaren Verbrennern (vorher 20–25 %). Sie kommen aber 10–15 % seltener vor.
  - GDV-Typklassen (Stand 30.09.2026): Der VW ID.3 Pro 150 kW (HSN/TSN 0603/CKV) liegt bei 14 / 20 / 19 (HP / TK / VK). Der Golf VII 1.0 TSI 85 kW (0603/BVV) liegt bei 13 / 17 / 15. Beim ID.3 ist die Vollkasko also vier Klassen höher, die Haftpflicht nur eine.
  - Der Verivox-Index vom 19.08.2026 zeigt, dass der Preisanstieg vorbei ist: Haftpflicht −3 %, Teilkasko +0,1 %, Vollkasko +2,5 % gegenüber dem Vorjahr.
  - Absolutwerte: Check24 nennt 683 €/Jahr als Durchschnitt aller 2025 über das Portal abgeschlossenen Kfz-Haftpflichtverträge. Wie viel davon auf Kasko entfällt, wird nicht ausgewiesen. Einen belastbaren Marktdurchschnitt für Haftpflicht + Vollkasko für 2026: keine belastbare Quelle gefunden.
  - Wichtig für den Vergleich: Ein 22.000-€-Stromer wird typischerweise vollkaskoversichert, ein 12.000-€-Benziner oft nur teilkaskoversichert. Ein Teil des Abstands kommt also aus der Deckungswahl, nicht nur aus dem Antrieb.
- **Bewertung:** realistisch. Ein Aufschlag von rund 150 € (≈ 23 %) passt zu den höheren Vollkasko-Typklassen und Schadenhöhen. Die absoluten Beträge lassen sich mangels Marktdurchschnitt nur grob einordnen.
- **Empfehlung:** Werte beibehalten. Den Hinweis präzisieren: „Verivox (Jan. 2026): bei rund der Hälfte der Vollkasko-Tarife teurer als der Verbrenner-Zwilling; GDV: Kaskoschäden an E-Autos 15–20 % teurer“.
- **Quellen:**
  - [Verivox: Schnäppchen ade – Hälfte der Versicherungstarife ist für E-Autos teurer als für Verbrenner (27.01.2026)](https://www.verivox.de/kfz-versicherung/nachrichten/schnaeppchen-ade-haelfte-der-versicherungstarife-ist-fuer-e-autos-teurer-als-fuer-verbrenner-1121443/)
  - [GDV: E-Autos und Verbrenner gleichen sich in Schadenhöhe und -häufigkeit an (13.08.2025)](https://www.gdv.de/gdv/medien/medieninformationen/gdv-studie-e-autos-und-verbrenner-gleichen-sich-in-schadenhoehe-und-haeufigkeit-an-190552)
  - [Die Versicherer (GDV): Typklassen VW ID.3 Pro 150, 0603/CKV (Stand 30.09.2026)](https://www.dieversicherer.de/typklassen/versicherer/VW_ID.3-hsn-0603-tsn-CKV)
  - [Die Versicherer (GDV): Typklassen VW Golf VII 1.0 TSI, 0603/BVV (Stand 30.09.2026)](https://www.dieversicherer.de/typklassen/versicherer/VW_Golf%20VII-hsn-0603-tsn-BVV)
  - [Verivox: Preissteigerungen in der Kfz-Versicherung sind vorbei (19.08.2026)](https://www.verivox.de/presse/preissteigerungen-in-der-kfz-versicherung-sind-vorbei-haftpflicht-drei-prozent-guenstiger-als-im-vorjahr-1121641/)
  - [Check24: Lexikon Personenschaden, Durchschnittskosten Kfz-Haftpflicht (Datenbasis 2025, Seite undatiert)](https://www.check24.de/kfz-versicherung/lexikon/personenschaden)

### 2. Wartung und Reparaturen

- **Im Rechner:** Verbrenner 800 €/Jahr („Inspektion, Öl, Bremsen, Auspuff, Verschleiß“), E-Auto 520 €/Jahr. Hinweis: „ADAC: Inspektion rund ⅓ günstiger“.
- **Befund:**
  - ADAC (03.02.2026) hat 120 Kostenvoranschläge bei Markenwerkstätten von BMW, Dacia, Hyundai, Mercedes und VW angefragt und 94 Antworten erhalten. Die E-Auto-Inspektion ist im Schnitt rund ein Drittel günstiger: bei VW um 44 %, bei Hyundai um 39 %, bei BMW um 58 % und bei Mercedes um 45 %. Nur bei Dacia ist der Verbrenner 43 % günstiger. Bei fast der Hälfte der detaillierten Angebote lag der Stundensatz für E-Autos rund 17 % höher, was der ADAC für technisch nicht begründbar hält.
  - Laut DAT-Report 2026 (Daten 2025, nur Sekundärbericht ausgewertet) kostet eine Wartung im Schnitt 542 € und eine Reparatur 604 €. Das sind rund 30 % mehr als 2020. Gleichzeitig ist die Zahl der Verschleißreparaturen auf ein Allzeittief von 0,35 je Pkw und Jahr gesunken. Getrennte Werte für E-Autos und Verbrenner nennt der Bericht nicht. Grob gerechnet ergibt eine Wartung pro Jahr plus 0,35 × 604 € rund 750 € für einen Durchschnitts-Pkw, bei älteren Fahrzeugen tendenziell mehr.
  - Laut ADAC-Pannenstatistik 2026 (Daten 2025, Pressemitteilung 23.04.2026) haben vierjährige E-Autos 6,5 Pannen je 1.000 Fahrzeuge, gleich alte Verbrenner 12,5. Bei fünfjährigen sind es 10,3 gegenüber 17,4. Die häufigste Ursache ist bei beiden Antrieben die 12-V-Batterie. Die Zahlen stammen aus Sekundärberichten, die Primärseite ließ sich nicht laden.
  - Der TÜV-Report 2026 (Nov. 2025) sieht bei E-Autos Schwächen an Bremsen, Achsen und Licht: Weil die Rekuperation die Reibbremse wenig nutzt, korrodieren Scheiben leichter.
  - Wartungsintervalle: Für den ID.3 gilt ein 2-Jahres-Intervall, der Kona Elektro muss jährlich bzw. alle 15.000 km zur Inspektion. Beide Angaben stammen nur aus Werkstattportalen und sind nicht vom Hersteller bestätigt.
- **Bewertung:** realistisch. 800 € passen zum DAT-Durchschnitt für ältere Verbrenner. Ein E-Auto-Wert rund 35 % darunter deckt sich mit den ADAC-Inspektionsdaten und den geringeren Pannenraten. Zusätzlich ist das E-Auto (EZ 2022) jünger.
- **Empfehlung:** Werte beibehalten. Den Hinweis präzisieren: „ADAC (Feb. 2026): Inspektion bei VW/Hyundai rund 40 % günstiger; Werkstätten verlangen aber teils höhere Stundensätze“.
- **Quellen:**
  - [ADAC: Inspektionskosten im Vergleich – E-Auto vs. Verbrenner (03.02.2026)](https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/autokosten/inspektionskosten-e-auto-verbrenner/)
  - [firmenauto: DAT Report 2026 – Kennzahlen (01.02.2026, Sekundärquelle zum DAT-Report)](https://www.firmenauto.de/branche/dat-report-2026-kpis-e-autos-china-marken-werkstattkosten-relevanz-fuhrparks/)
  - [Vision Mobility: DAT-Report – Reparaturhäufigkeit sinkt (2026, Sekundärquelle)](https://vision-mobility.de/news/dat-report-reparaturhaeufigkeit-sinkt-394979.html)
  - [DAT: DAT-Report 2026 Kurzbericht (PDF, Primärquelle; Text ließ sich nicht automatisch auslesen)](https://www.dat.de/fileadmin/de/images/produkte/DAT_Report/DAT_Report_NEW/2026/DAT-Report-2026-Kurzbericht.pdf)
  - [ADAC Presse: Pannenstatistik 2026 (23.04.2026)](https://presse.adac.de/meldungen/adac-ev/technik/adac-pannenstatistik-2026.html) und [electrive: ADAC – Elektroautos sind zuverlässiger als Verbrenner (23.04.2026, Sekundärquelle)](https://www.electrive.net/2026/04/23/adac-elektroautos-sind-zuverlaessiger-als-verbrenner/)
  - [TÜV SÜD: Gebrauchte Elektroautos fahren in Sachen Sicherheit vorne mit (TÜV-Report 2026, Nov. 2025)](https://www.tuvsud.com/de-de/presse-und-medien/2025/november/gebrauchte-elektroautos-fahren-in-sachen-sicherheit-vorne-mit)
  - [carwiki: Inspektion VW ID.3 (Datum nicht geprüft, Sekundärquelle)](https://carwiki.de/vw-id3-inspektion/), [repareo: Inspektion Hyundai Kona Elektro (Datum nicht geprüft, Werkstattportal)](https://www.repareo.de/inspektion-hyundai-kona-elektro/)

### 3. Reifen

- **Im Rechner:** Verbrenner 150 €/Jahr, E-Auto 190 €/Jahr („Mehrgewicht erhöht den Abrieb“).
- **Befund:**
  - Laut ADAC (04.03.2025) steigt der Reifenabrieb proportional zum Fahrzeuggewicht, und hohes Drehmoment kann den Verschleiß zusätzlich erhöhen. Spezielle E-Auto-Reifen hält der ADAC nicht für nötig, wegen der höheren Traglast sind die Reifen aber oft größer dimensioniert. Eine Prozentzahl für den Mehrverschleiß nennt der ADAC nicht.
  - Die oft genannten „bis zu 20 % mehr Verschleiß“ gehen auf Michelin zurück, Goodyear spricht von bis zu 50 %. Beides sind Herstellerangaben, die ich nur aus Sekundärberichten kenne. Eine unabhängige Messstudie: keine belastbare Quelle gefunden.
  - ADAC-Sommerreifentest 2026 (über test.de, 27.02.2026): In der Größe 225/50 R17 kosten Premiumreifen rund 156–165 € pro Stück. Die vom ADAC hochgerechnete Laufleistung liegt bei 44.700–57.800 km, bei Billigreifen ab 26.100 km.
  - Netzwelt (Sekundärquelle) nennt für 205/55 R16 (Golf) knapp 400 € je Satz Premium-Sommerreifen.
  - Räderwechsel (ADAC, 30.10.2026): Werkstätten verlangen oft 100 € und mehr pro Wechsel, freie Werkstätten teils rund 50 €. Die Einlagerung kostet 40–80 € im Jahr, teils bis 100 €. Bei Sommer- und Winterreifen kommen so leicht 100–250 €/Jahr zusammen, und zwar bei beiden Antrieben.
- **Bewertung:** realistisch. Für den reinen Reifenersatz eines Kompakten passen 150 € bzw. ein rund 25 % höherer Wert für das schwerere E-Auto mit größeren Reifen zur Datenlage. Die Kosten für Wechsel und Einlagerung sind darin aber offenbar nicht enthalten.
- **Empfehlung:** Werte beibehalten. Den Hinweis ergänzen: „ohne Räderwechsel/Einlagerung (ADAC: oft 100 €+ je Wechsel)“. Alternativ bei beiden Antrieben rund 120 €/Jahr für saisonalen Wechsel aufschlagen. Das ändert die Differenz nicht.
- **Quellen:**
  - [ADAC: Spezielle Reifen für E-Autos (04.03.2025)](https://www.adac.de/rund-ums-fahrzeug/ausstattung-technik-zubehoer/reifen/reifenkauf/reifen-elektroautos/)
  - [Stiftung Warentest: Die besten Sommerreifen aus den ADAC-Tests (27.02.2026)](https://www.test.de/Test-Sommerreifen-Die-besten-Sommerreifen-aus-den-ADAC-Tests-6045628-0/)
  - [ADAC: Teurer Räderwechsel – so lassen sich Kosten sparen (30.10.2026)](https://www.adac.de/rund-ums-fahrzeug/ausstattung-technik-zubehoer/reifen/kosten-radwechsel/)
  - [nextpit: Reifen fürs E-Auto – das sagen Hersteller (Datum nicht geprüft, Sekundärquelle für Michelin/Goodyear)](https://www.nextpit.de/news/brauchen-e-autos-andere-reifen)
  - [Netzwelt: Sommerreifen-Test 2026 (Datum nicht geprüft, Sekundärquelle)](https://www.netzwelt.de/autoreifen/vergleich.html)

### 4. HU/AU

- **Im Rechner:** Verbrenner 70 €/Jahr („ca. 140 € alle 2 Jahre“), E-Auto 55 €/Jahr (ohne AU).
- **Befund:**
  - Laut ADAC (30.07.2026) kostet die HU mit AU für Pkw im Bundesschnitt 2026 rund 163 €. 2020 waren es noch rund 112 €. E-Autos zahlen dieselbe HU-Gebühr, nur die AU entfällt.
  - TÜV Saarland, Entgeltliste mobiler Dienst, gültig ab 01.01.2026: Pkw-HU ohne Abgasuntersuchung 108,90 €, mit Abgasuntersuchung 166,90 € (inkl. MwSt.).
  - Die TÜV-SÜD-Gebührentabelle 2026 nennt laut Suchergebnis-Auszug für Berlin 101,90 € ohne bzw. 160,00 € mit AU und für Bremen 108,50 € bzw. 166,00 €. Die Seite selbst war für mich gesperrt (HTTP 403).
- **Bewertung:** zu niedrig (Verbrenner) bzw. realistisch (E-Auto). 140 € je HU entspricht nicht mehr den 2026er-Preisen von 160–167 €. Für die E-Auto-HU sind 102–109 € alle zwei Jahre ≈ 51–55 €/Jahr korrekt.
- **Empfehlung:** Verbrenner auf 80 €/Jahr anheben, Hinweis „ca. 160 € alle 2 Jahre (ADAC-Bundesschnitt 2026: 163 €)“. E-Auto bei 55 €/Jahr belassen, Hinweis „ca. 105–110 € alle 2 Jahre, keine AU“.
- **Quellen:**
  - [ADAC: Kosten Hauptuntersuchung – Infos und Preise zum TÜV (30.07.2026)](https://www.adac.de/rund-ums-fahrzeug/reparatur-pflege-wartung/hu-und-au/tuev-kosten/)
  - [TÜV Saarland: Entgelte Mobiler Dienst 2026, Pkw (PDF, gültig ab 01.01.2026)](https://www.tuev-saar.de/wp-content/uploads/2026/01/Entgelte-Mobiler-Dienst-2026-Saar_PKW-A4.pdf)
  - [TÜV SÜD: HU-Preise/Gebühren (2026; Werte nur aus Suchergebnis-Auszug, Seite nicht direkt abrufbar)](https://www.tuvsud.com/de-de/branchen/mobilitaet-und-automotive/hauptuntersuchung/gebuehren)

### 5. Wallbox inkl. Installation

- **Im Rechner:** 1.200 € einmalig.
- **Befund:**
  - Laut ADAC (29.06.2026) kostet das Gerät 300–2.000 €, einfache Modelle 300–600 €. Die Installation im Einfamilienhaus kostet 500–3.000 €, ein einfacher Anschluss an Garage oder Carport oft 500–1.500 €. Für eine gängige 11-kW-Wallbox liegt die Gesamtsumme bei grob 1.200–3.500 €.
  - Förderung (ADAC, 17.11.2026): Für private Wallboxen am Eigenheim gibt es keine Bundesförderung. Das KfW-Programm 442 wurde 2024 eingestellt, NRW und Baden-Württemberg fördern Einfamilienhaus-Wallboxen nicht. Es gibt nur kommunale bzw. Stadtwerke-Zuschüsse, etwa 100–400 € in Fürth, Baden-Baden und Mainz. Das Bundesprogramm für Mehrparteienhäuser (bis 1.500 € je Stellplatz mit Ladepunkt) lief vom 15.04. bis 10.11.2026 und ist geschlossen.
  - Über §14a EnWG gibt es ein reduziertes Netzentgelt, wenn der Netzbetreiber steuern darf. Das ist ein Tarifvorteil, keine Investitionsförderung.
- **Bewertung:** zu niedrig. 1.200 € ist die Untergrenze der ADAC-Spanne und trifft nur auf ein günstiges Gerät mit kurzem Kabelweg zu.
- **Empfehlung:** Auf 1.500 € anheben. Hinweis: „ADAC 2026: 1.200–3.500 € je nach Kabelweg und Zählerschrank; keine Bundesförderung für Eigenheime“.
- **Quellen:**
  - [ADAC: Wallbox – das kosten private Ladestationen plus Installation 2026 (29.06.2026)](https://www.adac.de/rund-ums-fahrzeug/elektromobilitaet/laden/wallbox-kosten/)
  - [ADAC: Wallbox-Förderung 2026 – wo es Zuschüsse für Ladestationen gibt (17.11.2026)](https://www.adac.de/news/einbau-von-wallboxen-fuer-elektroautos-soll-erleichtert-werden)

### 6. Einmalkosten beim Kauf

- **Im Rechner:** E-Auto 270 € („Zulassung, Kennzeichen, Batteriezertifikat“), Verbrenner 120 €.
- **Befund:**
  - Ummeldung nach Halterwechsel (ADAC, 22.06.2026): Die Gebühr der Zulassungsstelle beträgt rund 17 €, wenn das Kennzeichen bleibt, und rund 27 € mit neuem Kennzeichen. Neue Schilder kosten rund 25 €, zusammen sind es also rund 52 €. Laut ADAC (22.07.2026) sind die Gebühren bundesweit einheitlich, online (i-Kfz) kostet die (Wieder-)Zulassung 12,80 € statt meist 30 €. Zulassungsdienste kosten deutlich mehr.
  - Batteriezertifikat: Aviloo nennt auf seiner Privatkundenseite für einen Beispiel-Pkw 99 € (Premium-Test, Box für bis zu 7 Tage). Der TÜV-Verband beziffert einen SoH-Test auf 100–200 € (Stand Oktober 2025, nur über Sekundärquelle zitiert).
  - Gebrauchtwagen-Check (für beide Antriebe optional): Der TÜV Rheinland Proficheck kostet laut Sekundärquelle 29,90 €, ADAC-Pakete ab rund 179 €. Einen DEKRA-Preis listet die Primärquelle nicht.
  - Eine Ummeldung kostet allein also rund 50 €. Die 120 € beim Verbrenner enthalten damit offenbar mehr, etwa einen Check oder ein Wunschkennzeichen. Die Differenz von 150 € beim E-Auto entspricht einem Batteriezertifikat am oberen Rand der Spanne.
- **Bewertung:** realistisch. Ummeldung plus Batteriezertifikat für 100–200 € ergibt 150–250 €, mit kleinem Puffer passen also 270 €. Die Mehrkosten von 150 € gegenüber dem Verbrenner sind plausibel.
- **Empfehlung:** Werte beibehalten. Den Hinweis konkretisieren: „Ummeldung + Kennzeichen ca. 50 €; Batteriezertifikat 100–200 € (Aviloo ab 99 €)“. Beim Verbrenner offenlegen, was über die Zulassung hinaus enthalten ist, z. B. „inkl. Gebrauchtwagen-Check“.
- **Quellen:**
  - [ADAC: Auto ummelden – Kosten und notwendige Unterlagen (22.06.2026)](https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/kfz-zulassung/auto-ummelden/)
  - [ADAC: Auto online zulassen oder abmelden (22.07.2026)](https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/kfz-zulassung/zulassung-online/)
  - [Aviloo: Private – Batteriegesundheit sichtbar gemacht (Seite undatiert, abgerufen 17.11.2026)](https://aviloo.com/de/aviloo-private)
  - [cleanthinking: Akkus von Elektroautos altern langsamer als viele Käufer fürchten (01.10.2026, zitiert TÜV-Verband, Stand Okt. 2025; Sekundärquelle)](https://www.cleanthinking.de/gebrauchtes-elektroauto/)
  - [fahrzeugschein.de: Gebrauchtwagencheck Kosten 2026 (2026, Sekundärquelle)](https://www.fahrzeugschein.de/blog/artikel/gebrauchtwagencheck-kosten)

### 7. Was dem Rechner bei den laufenden Kosten fehlt (optional)

- **Im Rechner:** nicht abgebildet.
- **Befund:**
  - Räderwechsel und Einlagerung (siehe Punkt 3): rund 100–250 €/Jahr bei Sommer-/Winterbetrieb in der Werkstatt, für beide Antriebe gleich.
  - Werkstatt-Stundensätze: Laut GDV (über mobiFlip, 29.10.2026) lagen sie 2025 für E-Autos rund 15 % über denen für Verbrenner. Über alle Antriebe stiegen sie 2025 um 7,5 %, die Ersatzteilpreise um 5,6 %. Ein durchschnittlicher Pkw-Sachschaden kostete rund 4.600 €. Für den Halter wirkt sich das vor allem über die Kaskoprämie und die Selbstbeteiligung aus. Die Prämie ist im Rechner bereits höher angesetzt.
  - Bremsen beim E-Auto: Laut TÜV-Report 2026 korrodieren sie wegen der Rekuperation häufiger, daher fallen gelegentlich Scheiben- und Belagwechsel als HU-Mangel an. Bei Wartung und Reparatur steckt das implizit im E-Auto-Wert von 520 €.
  - 12-V-Starterbatterie: Sie ist bei beiden Antrieben die häufigste Pannenursache (ADAC-Pannenstatistik 2026). Ein spezieller Kostenpunkt fürs E-Auto ist sie nicht.
  - Klimaservice und Wartungsintervalle: Belastbare 2026er-Preise im Vergleich E-Auto vs. Verbrenner: keine belastbare Quelle gefunden.
- **Bewertung:** unklar. Keiner dieser Punkte verschiebt den Vergleich nennenswert, denn der Räderwechsel betrifft beide Antriebe gleich und die höheren E-Auto-Reparaturkosten stecken bereits in der Versicherung.
- **Empfehlung:** Optional eine gemeinsame Position „Räderwechsel/Einlagerung“ mit rund 120 €/Jahr für beide Antriebe aufnehmen oder im Reifen-Hinweis erwähnen. Sonst nichts ändern.
- **Quellen:**
  - [mobiFlip: GDV – Autoreparaturen werden teurer, Elektroautos besonders kostspielig (29.10.2026, Sekundärquelle zu GDV-Zahlen)](https://www.mobiflip.de/?p=493951)
  - [ADAC: Teurer Räderwechsel (30.10.2026)](https://www.adac.de/rund-ums-fahrzeug/ausstattung-technik-zubehoer/reifen/kosten-radwechsel/)
  - [TÜV SÜD: TÜV-Report 2026, gebrauchte Elektroautos (Nov. 2025)](https://www.tuvsud.com/de-de/presse-und-medien/2025/november/gebrauchte-elektroautos-fahren-in-sachen-sicherheit-vorne-mit)

## Fahrzeugwerte, Wertverlust und Akku

### 1. Kaufpreis gebrauchtes E-Auto (Kompaktklasse, EZ 2022)

- **Im Rechner:** 22.000 €
- **Befund:** Laut AutoScout24 (17.11.2026) liegt der Median-Angebotspreis des VW ID.3 mit EZ 2022 bei 22.960 €, die übliche Spanne bei 21.756–24.617 €. Beim Hyundai Kona Elektro 2022 kosten die 64-kWh-Versionen (150 kW) in den ersten Inseraten 24.499–24.900 €, die 39-kWh-Versionen 18.550–21.450 €. Einen Median nur für den 64-kWh-Kona weist AutoScout24 nicht aus. Beim Renault Megane E-Tech 2022 liegen EV60-Inserate bei 24.885–27.890 € (bei rund 25.000–33.000 km), EV40-Inserate bei 18.470–19.210 €. Die Seite nennt als Hauptspanne 18.790–31.400 € (Stand 1.7.2026). Der Tesla Model 3 mit EZ 2022 ist deutlich teurer: Median 28.976 €, Spanne 27.500–30.970 €. Marktumfeld: Laut AutoScout24-Preisindex sind gebrauchte E-Autos 2026 gegen den Gesamtmarkt teurer geworden. Der Durchschnitt aller E-Inserate stieg von 32.980 € (Januar) auf 39.658 € (Oktober), also um rund 20 %.
- **Bewertung:** realistisch. Für ID.3, Megane EV60 und die untere Hälfte der Kona-64-kWh-Angebote passen 22.000 € zum aktuellen Markt (Inseratspreise, verhandelbar); für einen Model 3 ist der Wert rund 7.000 € zu niedrig.
- **Empfehlung:** 22.000 € beibehalten. Ergänzender Hinweis: „Marktpreise Nov. 2026: VW ID.3 (2022) ca. 22.000–25.000 €, Tesla Model 3 (2022) ca. 27.500–31.000 €.“ Da die Preise 2026 um rund 20 % gestiegen sind, sollte der Wert halbjährlich geprüft werden.
- **Quellen:**
  - [AutoScout24: VW ID.3, EZ 2022 (Listenseite mit Median), Stand 17.11.2026](https://www.autoscout24.de/lst/vw/id.3/re_2022)
  - [AutoScout24: Tesla Model 3, EZ 2022, Stand 17.11.2026](https://www.autoscout24.de/lst/tesla/model-3/re_2022)
  - [AutoScout24: Renault Megane E-Tech, EZ 2022, Inserate abgerufen 17.11.2026 (Spanne Stand 1.7.2026)](https://www.autoscout24.de/lst/renault/megane-e-tech/re_2022)
  - [AutoScout24: Hyundai Kona Elektro, EZ 2022, Inserate abgerufen 17.11.2026 (kein Median ausgewiesen)](https://www.autoscout24.de/lst/hyundai/kona/re_2022?fuel=E)
  - [AutoScout24 Gebrauchtwagen-Preisindex (AGPI) Oktober 2026, 05.11.2026](https://www.autoscout24.de/unternehmen/agpi/agpi-oktober-gegen-den-markttrend-preise-fuer-gebrauchte-elektroautos-steigen-weiter/)

### 2. Wert des aktuellen Benziners (6–10 Jahre alter Kompakter)

- **Im Rechner:** 12.000 €
- **Befund:** AutoScout24-Medianpreise vom 17.11.2026, alle Antriebsarten (der Kraftstofffilter wirkte auf die Median-Angabe nicht): VW Golf EZ 2016: 11.466 € (Spanne 9.417–13.485 €); EZ 2018: 13.815 €; EZ 2020: 17.620 €. Opel Astra EZ 2016: 7.647 €; EZ 2018: 9.113 €. Laut AutoScout24-Index kosten 5–10 Jahre alte Gebrauchte im Oktober 2026 im Schnitt 21.958 €; das gilt allerdings über alle Klassen. Für den Nutzer zählt der erzielbare Verkaufs- oder Inzahlungnahmepreis, der unter den Händler-Inseratspreisen liegt. Wie groß dieser Abschlag 2026 ist: keine belastbare Quelle gefunden.
- **Bewertung:** realistisch. 12.000 € entsprechen etwa einem 8–10 Jahre alten Golf zum Inseratspreis. Für Volumenmodelle wie den Astra und bei Inzahlungnahme ist der Wert eher hoch angesetzt.
- **Empfehlung:** Beibehalten. Hinweistext ergänzen: „Setze den Preis ein, den du realistisch bekommst (z. B. DAT- oder ADAC-Bewertung). Händler zahlen bei Inzahlungnahme weniger als Inseratspreise.“
- **Quellen:**
  - [AutoScout24: VW Golf, EZ 2016, Stand 17.11.2026](https://www.autoscout24.de/lst/vw/golf/re_2016)
  - [AutoScout24: VW Golf, EZ 2018, Stand 17.11.2026](https://www.autoscout24.de/lst/vw/golf/re_2018)
  - [AutoScout24: VW Golf, EZ 2020, Stand 17.11.2026](https://www.autoscout24.de/lst/vw/golf/re_2020)
  - [AutoScout24: Opel Astra, EZ 2016, Stand 17.11.2026](https://www.autoscout24.de/lst/opel/astra/re_2016)
  - [AutoScout24: Opel Astra, EZ 2018, Stand 17.11.2026](https://www.autoscout24.de/lst/opel/astra/re_2018)
  - [AutoScout24 AGPI Oktober 2026 (Alterssegmente), 05.11.2026](https://www.autoscout24.de/unternehmen/agpi/agpi-oktober-gegen-den-markttrend-preise-fuer-gebrauchte-elektroautos-steigen-weiter/)

### 3. Wertverlust E-Auto pro Jahr

- **Im Rechner:** 11 % pro Jahr; Hinweis „Studien: 10–14 % in den ersten Jahren“
- **Befund:**
  - *Verlauf der DAT-Restwerte dreijähriger E-Autos (Händlerverkaufswert in % des Listenneupreises):* Anfang 2023 lagen sie bei 61,5 %. Im April 2024 lagen die Händlerverkaufswerte 18 % unter dem Vorjahr (Benziner −7 %, Diesel −5 %). Im Juli 2025 lag der Restwert bei 50,3 % (Benziner 63,5 %, Diesel 62,2 %), im November 2025 bei 48,4 % (Benziner 62,6 %, Diesel 61,2 %) und im Dezember 2025 bei 49 %. Bis August 2026 stieg er wieder auf 51,5 %, während Benziner auf 59,4 % und Diesel auf 58 % fielen. Die DAT erklärt die Erholung vor allem mit hohen Kraftstoffpreisen. Der Absturz von 2023 bis 2025 ist damit gestoppt; 2026 erholen sich die E-Restwerte leicht, während die Verbrenner-Restwerte sinken.
  - *Erste drei Jahre:* 51,5 % Restwert nach drei Jahren entsprechen rechnerisch rund 20 % Wertverlust pro Jahr (Benziner: rund 16 %/Jahr; eigene Rechnung). Die Angabe „10–14 % in den ersten Jahren“ ist damit für Neuwagen deutlich zu niedrig. Eine Studie mit 10–14 %: keine belastbare Quelle gefunden.
  - *Ab Alter 3–4 (relevant für den Rechner), eigene Rechnung aus AutoScout24-Medianen vom 17.11.2026:* VW ID.3 EZ 2024 → 2022: 8,9 %/Jahr; EZ 2023 → 2020: 5,9 %/Jahr. Tesla Model 3 EZ 2023 → 2021: 6,2 %/Jahr. Zum Vergleich der gleichaltrige Verbrenner VW Golf EZ 2023 → 2020: 7,7 %/Jahr, EZ 2023 → 2021: 8,1 %/Jahr. Im aktuellen Querschnitt verlieren 3–6 Jahre alte E-Autos also nicht schneller an Wert als gleichaltrige Golf.
  - *Risiken nach vorn:* Laut der VMF/Deloitte-Studie (Juli 2026) kommen ab 2026 mehr Leasingrückläufer bis fünf Jahre auf den Markt. Die seit 1.1.2026 geltende Förderung gilt nur für Neuwagen, und Preissenkungen bei Neuwagen können die Restwerte erneut drücken. Laut DAT (Januar 2026) setzt die Förderung die Gebrauchtpreise unter Druck.
- **Bewertung:** zu hoch. Für ein 2022er E-Auto zeigen die Marktdaten vom November 2026 eher 6–9 % pro Jahr, ähnlich wie bei gleichaltrigen Verbrennern. 11 % ist nur als vorsichtiger Wert vertretbar, der die Schwankungen von 2023–2025 einpreist. Der UI-Hinweis verwechselt zudem die Neuwagenphase (rund 20 %/Jahr) mit der Phase ab Jahr 3–4.
- **Empfehlung:** Standardwert auf 9 % senken. Neuer Hinweistext: „Marktdaten Nov. 2026: 3–6 Jahre alte E-Autos verlieren rund 6–9 % pro Jahr. 2023–2025 fielen die Preise deutlich schneller, 2026 sind sie wieder gestiegen.“
- **Quellen:**
  - [autohaus.de: DAT – Spritpreise machen gebrauchte E-Autos teurer, 28.09.2026 (Fachpresse zu DAT-Daten)](https://www.autohaus.de/nachrichten/gw-trends/dat-spritpreise-machen-gebrauchte-e-autos-teurer-3909599)
  - [ecomento: Verbrenner verlieren auf dem Gebrauchtwagenmarkt an Wert, Elektroautos legen zu, 14.10.2026 (Sekundärquelle, nach Automobilwoche)](https://ecomento.de/2026/10/14/verbrenner-verlieren-auf-dem-gebrauchtwagenmarkt-an-wert-elektroautos-legen-zu/)
  - [autohaus.de: Restwerte für gebrauchte E-Autos – Förderung setzt Preise weiter unter Druck, 20.01.2026](https://www.autohaus.de/nachrichten/gw-trends/gebrauchte-e-autos-foerderung-setzt-preise-weiter-unter-druck-3758585)
  - [autohaus.de: E-Auto-Restwerte weiterhin unter Verbrenner-Niveau, 29.07.2025](https://www.autohaus.de/nachrichten/gw-trends/e-auto-restwerte-weiterhin-unter-verbrenner-niveau-3693415)
  - [auto-medienportal.net: DAT-Restwerte (Startwert 61,5 % Anfang 2023), 30.07.2025](https://www.auto-medienportal.net/artikel/detail/68198)
  - [Börse Express (dpa-AFX): Gebrauchtwagenpreise sinken – vor allem bei Stromern, 20.05.2024](https://www.boerse-express.com/news/articles/gebrauchtwagenpreise-sinken-vor-allem-bei-stromern-628731)
  - [elektroauto-news.net: VMF-Studie zum Gebrauchtmarkt für E-Autos, 16.07.2026 (Sekundärquelle; Studie kostenpflichtig)](https://www.elektroauto-news.net/news/vmf-studie-gebrauchtwagenmarkt-elektroautos)
  - [AutoScout24: VW ID.3 EZ 2020](https://www.autoscout24.de/lst/vw/id.3/re_2020), [EZ 2023](https://www.autoscout24.de/lst/vw/id.3/re_2023), [EZ 2024](https://www.autoscout24.de/lst/vw/id.3/re_2024); [Tesla Model 3 EZ 2021](https://www.autoscout24.de/lst/tesla/model-3/re_2021), [EZ 2023](https://www.autoscout24.de/lst/tesla/model-3/re_2023); [VW Golf EZ 2021](https://www.autoscout24.de/lst/vw/golf/re_2021), [EZ 2023](https://www.autoscout24.de/lst/vw/golf/re_2023) (alle Stand 17.11.2026)

### 4. Wertverlust Verbrenner pro Jahr

- **Im Rechner:** 9 % pro Jahr; Hinweis „Ältere Verbrenner: oft 7–10 %“
- **Befund:** Eigene Rechnung aus AutoScout24-Medianen vom 17.11.2026: VW Golf EZ 2018 → 2016 (beide Golf 7): 8,9 %/Jahr; EZ 2020 → 2016: 10,2 %/Jahr (verzerrt durch den Modellwechsel zum Golf 8 im Jahr 2020). Opel Astra EZ 2018 → 2016: 8,4 %/Jahr. Dazu kommt der Markttrend: Die DAT-Restwerte dreijähriger Benziner sanken von 62,6 % (November 2025) auf 59,4 % (August 2026), und der AutoScout24-Index meldet für Benziner und Diesel im Oktober 2026 leicht fallende Preise (−0,2 % bzw. −0,8 % zum Vormonat). Eine DAT- oder Schwacke-Primärquelle mit jährlichen Raten für 6–10 Jahre alte Autos: keine belastbare Quelle gefunden. Ratgeberseiten nennen Faustwerte von 5–7 % pro Jahr nach dem fünften Jahr, ohne nachvollziehbare Datenbasis.
- **Bewertung:** realistisch. Der Marktquerschnitt ergibt für 6–10 Jahre alte Kompakte rund 8–10 % pro Jahr; 9 % liegt mittendrin.
- **Empfehlung:** Beibehalten. Hinweistext präzisieren: „6–10 Jahre alte Kompakte: Marktdaten Nov. 2026 rund 8–10 % pro Jahr.“
- **Quellen:**
  - [AutoScout24: VW Golf EZ 2016](https://www.autoscout24.de/lst/vw/golf/re_2016), [EZ 2018](https://www.autoscout24.de/lst/vw/golf/re_2018), [EZ 2020](https://www.autoscout24.de/lst/vw/golf/re_2020) (Stand 17.11.2026)
  - [AutoScout24: Opel Astra EZ 2016](https://www.autoscout24.de/lst/opel/astra/re_2016), [EZ 2018](https://www.autoscout24.de/lst/opel/astra/re_2018) (Stand 17.11.2026)
  - [autohaus.de: DAT – Spritpreise machen gebrauchte E-Autos teurer, 28.09.2026](https://www.autohaus.de/nachrichten/gw-trends/dat-spritpreise-machen-gebrauchte-e-autos-teurer-3909599)
  - [AutoScout24 AGPI Oktober 2026, 05.11.2026](https://www.autoscout24.de/unternehmen/agpi/agpi-oktober-gegen-den-markttrend-preise-fuer-gebrauchte-elektroautos-steigen-weiter/)

### 5. Akku-Alterung (Kapazitätsverlust)

- **Im Rechner:** „Die meisten Akkus verlieren nur rund 2 % Kapazität pro Jahr.“
- **Befund:** Geotab (April 2026, über 22.700 Fahrzeuge, 21 Modelle) misst im Mittel 2,3 % pro Jahr, nach acht Jahren also 81,6 % SoH. Autos mit wenig Schnellladen (unter 12 % DC-Ladevorgänge) verlieren rund 1,5 % pro Jahr, Autos mit viel Hochleistungs-DC-Laden rund 3,0 % pro Jahr. Nach einem stärkeren Abfall in den ersten ein bis zwei Jahren pendeln sich acht von elf etablierten Modellen bei etwa 1,4 % pro Jahr ein; heißes Klima kostet rund 0,4 Prozentpunkte zusätzlich pro Jahr. Aviloo (Report vom 02.09.2026, über 500.000 Tests, 20 Modelle) misst bei den meisten Modellen nach 150.000 km noch rund 90 % SoH oder mehr, etwa VW ID.4 mit 90,6 % und Hyundai Ioniq 5 mit 92,8 %. Der Nissan Leaf mit 40 kWh liegt mit 86,3 % darunter. Exemplare desselben Modells streuen um bis zu 13,5 Prozentpunkte. Carly/TÜV Nord (März 2026, rund 50.000 Messungen) kommen auf einen Median-SoH von 96 und einen Verlust von rund 0,7 Punkten je 10.000 km bis 90.000 km, danach rund 2,3 Punkte je 10.000 km. Recurrent nennt keine Jahresrate.
- **Bewertung:** realistisch. Die Daten von 2025 und 2026 liegen bei 1,5–2,5 % pro Jahr im Mittel; der Wert hängt stark vom Schnellladeanteil ab.
- **Empfehlung:** Beibehalten, präzisieren: „Im Schnitt rund 2 % pro Jahr (Geotab 2026: 2,3 %; wenig Schnellladen eher 1,5 %, viel Schnellladen bis 3 %).“
- **Quellen:**
  - [Geotab: How long do electric car batteries last? (EV Battery Degradation), 28.04.2026](https://www.geotab.com/fleet-management-solutions/ev-battery-degradation-tool/)
  - [ecomento: Batteriegesundheit gebrauchter E-Autos – Aviloo wertet 500.000 Tests aus, 03.09.2026 (Sekundärquelle zum Aviloo-Report)](https://ecomento.de/2026/09/03/batteriegesundheit-gebrauchter-e-autos-aviloo-wertet-500-000-tests-aus/)
  - [firmenauto: SoH-Daten machen den Batteriezustand zum Wertfaktor (Carly/TÜV Nord), 22.03.2026](https://www.firmenauto.de/fahrzeuge/pkw/soh-daten-machen-den-batteriezustand-bei-gebrauchten-e-autos-zum-wertfaktor/)

### 6. Akku-Garantie

- **Im Rechner:** „meist 8 Jahre bzw. 160.000 km, oft ab 70 % SoH“
- **Befund:**
  - VW (ID.-Modelle): 8 Jahre oder 160.000 km mit zugesicherten 70 % Mindestkapazität; ob netto oder brutto, sagt die Seite nicht.
  - Hyundai Kona Elektro: 8 Jahre oder 160.000 km; eine Kapazitätsschwelle nennt die Modellseite nicht.
  - Kia: Ab Modelljahr 2026 gelten 8 Jahre oder 160.000 km mit 70 % für EV und PHEV. Ältere Modelljahre fallen nach Kias Darstellung unter die reguläre 7-Jahres-Garantie (7 Jahre/150.000 km). Die Kia-Garantie geht beim Verkauf auf den neuen Besitzer über, wenn das Auto gemäß den Bedingungen gewartet wurde.
  - Tesla Model 3/Y: Hinterradantrieb 8 Jahre oder 160.000 km, Long Range und Performance 8 Jahre oder 192.000 km, jeweils 70 % (laut Shop4Tesla, Juni 2024, Sekundärquelle; tesla.com blockierte den Abruf). Zur Übertragung auf Folgebesitzer zeigt Tesla laut Suchmaschinen-Auszug, dass die Garantie übertragbar ist; die Seite selbst konnte ich nicht lesen.
  - Renault (Megane E-Tech u. a.): 8 Jahre oder 160.000 km mit 70 % (Renault-Länderseiten; die deutsche Seite habe ich nicht gefunden).
  - BYD: Seit Januar 2026 gelten in Europa 8 Jahre oder 250.000 km mit 70 % SoH, rückwirkend für alle bestehenden Halter.
  - Übertragung allgemein: Laut AutoScout24 ist die Akku-Garantie meist fahrzeuggebunden und läuft beim Weiterverkauf weiter. Voraussetzung sind eingehaltene Inspektionen und Pflicht-Updates. Sie zählt ab Erstzulassung, ein Auto mit EZ 2022 ist also längstens bis 2030 abgedeckt.
- **Bewertung:** realistisch. „8 Jahre/160.000 km, 70 %“ ist der Marktstandard. Ausnahmen gibt es nach oben (BYD 250.000 km, Tesla LR 192.000 km) und nach unten (ältere Kia: 7 Jahre/150.000 km).
- **Empfehlung:** Beibehalten, ergänzen: „Gilt ab Erstzulassung und geht meist auf den Käufer über; ein Auto von 2022 ist also noch bis etwa 2030 abgedeckt. Inspektionsnachweise prüfen.“
- **Quellen:**
  - [Volkswagen: Batteriegarantie und Lebensdauer (volkswagen.de), abgerufen 17.11.2026](https://www.volkswagen.de/de/elektromobilitaet/batterie/garantie-lebensdauer.html)
  - [Hyundai Deutschland: Kona Elektro Modellseite, abgerufen 17.11.2026](https://www.hyundai.com/de/de/modelle/kona-elektro.html)
  - [Kia Deutschland: Garantie, abgerufen 17.11.2026](https://www.kia.com/de/garantie/)
  - [Shop4Tesla: Tesla-Ratgeber Garantie, 26.06.2024 (Sekundärquelle)](https://www.shop4tesla.com/pages/tesla-ratgeber-garantie)
  - [Tesla: Fahrzeuggarantie (Abruf blockiert, HTTP 403)](https://www.tesla.com/de/support/vehicle-warranty)
  - [Renault: E-Tech-Batterie (Renault Europe), abgerufen 17.11.2026](https://renault.ec/e-tech/battery-e-tech-electric.html)
  - [ecomento: BYD erweitert Batteriegarantie, 19.01.2026 (Sekundärquelle)](https://ecomento.de/?p=127508)
  - [AutoScout24: E-Auto-Batteriegarantie, Stand 09/2026](https://www.autoscout24.de/elektroauto/batteriegarantie/)

### 7. Batteriezertifikat (SoH) als Preisfaktor

- **Im Rechner:** „ist inzwischen der wichtigste Faktor für Preis und Restwert“
- **Befund:** VMF-Chef Frank Hägele beziffert den Preisunterschied zwischen guter und schwächerer Batterie auf rund 5–6 % und hält ein Zertifikat für notwendig (firmenauto, 06.11.2026). Für den Wiederverkauf hält er vor allem die Batteriegröße für entscheidend, die Ausstattung kaum. firmenauto (März 2026, zu Carly/TÜV Nord) nennt den SoH „vielleicht wichtigsten“ Maßstab nach dem Kilometerstand. Die großen Restwertbewegungen 2023–2026 erklären DAT und VMF dagegen mit Marktfaktoren: Neuwagenpreissenkungen, Förderung, Kraftstoffpreisen und Rückläuferangebot. Eine Studie, die das Batteriezertifikat als wichtigsten Preisfaktor belegt: keine belastbare Quelle gefunden.
- **Bewertung:** zu hoch. Der SoH ist ein relevanter Preisfaktor von einigen Prozent, aber als „wichtigster Faktor“ nicht belegt; Alter, Kilometerstand, Akkugröße und die Marktlage wirken stärker.
- **Empfehlung:** Neuer Hinweistext: „Ein Batteriezertifikat (SoH) schafft Klarheit über den Akku und beeinflusst den Preis. Laut VMF liegen zwischen guter und schwächerer Batterie rund 5–6 %.“
- **Quellen:**
  - [firmenauto: E-Auto-Leasing – Batteriezustand und Restwert (Interview Frank Hägele, VMF), 06.11.2026](https://www.firmenauto.de/branche/e-auto-leasing-batteriezustand-restwert-interview-frank-haegele-vmf-bonus-fuhrpark/)
  - [firmenauto: SoH-Daten machen den Batteriezustand zum Wertfaktor, 22.03.2026](https://www.firmenauto.de/fahrzeuge/pkw/soh-daten-machen-den-batteriezustand-bei-gebrauchten-e-autos-zum-wertfaktor/)
  - [autohaus.de: DAT – Spritpreise machen gebrauchte E-Autos teurer, 28.09.2026](https://www.autohaus.de/nachrichten/gw-trends/dat-spritpreise-machen-gebrauchte-e-autos-teurer-3909599)
  - [elektroauto-news.net: VMF-Studie zum Gebrauchtmarkt für E-Autos, 16.07.2026](https://www.elektroauto-news.net/news/vmf-studie-gebrauchtwagenmarkt-elektroautos)

### 8. Akku-Risikorücklage

- **Im Rechner:** 0 €/Jahr; Hinweis „sinnvoll, wenn die Akku-Garantie endet“
- **Befund:**
  - *Kosten:* Autohero (Juli 2026, Händler, Sekundärquelle) nennt für die Kompaktklasse (VW ID.3, 52–77 kWh) 1.750–4.000 € für eine Modulreparatur, ein einzelnes MEB-Modul kostet 1.750–2.200 €. Ein kompletter Tausch kostet dort 10.000–18.000 €. AutoScout24 (Stand 09/2026) nennt 6.500–20.000 € je nach Modell, zum Beispiel Nissan Leaf 62 kWh rund 15.500 € und Mercedes EQA rund 15.200 €, dazu Zellpreise von 110–140 €/kWh mit fallender Tendenz.
  - *Häufigkeit:* Laut Recurrent (November 2025, über 30.000 Fahrzeuge, nicht repräsentativ) wurden außerhalb von Rückrufen bei Modellen ab 2022 rund 0,3 % der Akkus getauscht, bei der zweiten Generation (z. B. frühe Model 3) rund 2 % und bei Erstgenerations-E-Autos (bis 2016) rund 8,5 %. AutoScout24 nennt einen kompletten Tausch selten nötig. Deutsche Ausfallstatistiken, etwa vom ADAC, zu Akkutausch oder Modulreparatur: keine belastbare Quelle gefunden.
  - *Eigene Rechnung:* 2 % Tauschwahrscheinlichkeit mal 10.000–18.000 € ergeben einen Erwartungswert von rund 200–360 € über viele Jahre Haltedauer, also deutlich unter 100 € pro Jahr. Modulreparaturen sind darin nicht enthalten.
- **Bewertung:** realistisch. Während der Garantie (bei EZ 2022 bis etwa 2030) ist 0 € angemessen; danach ist das Risiko klein, aber im Einzelfall teuer.
- **Empfehlung:** 0 € beibehalten. Hinweistext ergänzen: „Akkutausch ist selten (Recurrent: 0,3–2 % je nach Baujahr). Nach der Garantie kostet eine Modulreparatur etwa 1.750–4.000 €, ein Komplettakku in der Kompaktklasse etwa 10.000–18.000 €. Wer über das Garantieende hinaus plant, kann z. B. 100 €/Jahr zurücklegen.“ (Die 100 € sind eine Einschätzung als Puffer und stammen aus keiner Quelle.)
- **Quellen:**
  - [Autohero: Batterie beim E-Auto tauschen, aktualisiert 31.07.2026 (Händlerseite, Sekundärquelle)](https://www.autohero.com/de/beratung/informieren/antriebsarten/elektro/batterie-tauschen/)
  - [AutoScout24: Batterie-Kosten beim E-Auto, Stand 09/2026](https://www.autoscout24.de/elektroauto/batterie-kosten/)
  - [Recurrent: How long do EV batteries last?, 11.11.2025](https://www.recurrentauto.com/research/how-long-do-ev-batteries-last)

## Kfz-Steuer, THG-Quote und Förderung

### 1. Steuerbefreiung für E-Autos (§ 3d KraftStG)

- **Im Rechner:** Befreiung 10 Jahre ab Erstzulassung, längstens bis 31.12.2035 (`Math.min(firstRegistrationYear + 10, 2035)`). Die Befreiung „geht auf den Käufer über“. Ein 2022 zugelassenes Auto ist bis Ende 2032 steuerfrei und wird ab 2033 besteuert. Eingabefeld Erstzulassung: 2011 bis 2030.
- **Befund:**
  - § 3d Abs. 1 KraftStG in der aktuellen Fassung: befreit sind reine E-Fahrzeuge mit Erstzulassung vom 18.05.2011 bis 31.12.2030, für zehn Jahre ab dem Tag der Erstzulassung, längstens bis 31.12.2035. § 3d Abs. 2: Die Befreiung gilt einmal je Fahrzeug, bei Halterwechsel bekommt der neue Halter die Restlaufzeit.
  - Die Verlängerung kam mit dem Achten Gesetz zur Änderung des Kraftfahrzeugsteuergesetzes (BGBl. 2025 I Nr. 342, ausgefertigt und verkündet am 22.12.2025). Das Gesetz trat nach Art. 2 am 01.01.2026 in Kraft. Die Zulassungsfrist wurde von 31.12.2025 auf 31.12.2030 verschoben, das Enddatum von 31.12.2030 auf 31.12.2035.
  - Laut Zoll-Fachmeldung vom 09.01.2026 bekommen Halter von Autos mit Erstzulassung 2021 bis 2025, deren Befreiung bisher am 31.12.2030 gekappt war, im Laufe von 2026 automatisch einen geänderten Steuerbescheid, ohne Antrag. Nach 2025 zugelassene Autos sind nur noch bis 31.12.2035 befreit, also weniger als zehn Jahre.
  - Zählweise: Die Befreiung endet taggenau zehn Jahre nach der Erstzulassung (Beispiel: Zulassung 15.06.2022, steuerfrei bis 14.06.2032). Die Kfz-Steuer wird tageweise berechnet (§ 9 Abs. 5 KraftStG). Der Rechner setzt das ganze Jahr 2032 steuerfrei an und überschätzt die Befreiung damit um 0 bis 12 Monate, im Mittel um rund ein halbes Jahr. Beim Standardgewicht sind das höchstens 56 €, im Mittel rund 28 €, einmalig.
  - Randfälle: Autos mit Erstzulassung vor dem 18.05.2011 fallen nicht unter § 3d. Bei Eingabe 2011 ist die Befreiung im Rechner aber ohnehin 2021 abgelaufen, das Ergebnis stimmt also. Erstzulassungen nach 2030 sind nicht befreit, das Eingabefeld endet aber bei 2030.
- **Bewertung:** korrekt. Zulassungsfenster, Enddatum und Übergang auf den Käufer entsprechen dem geltenden Recht seit 01.01.2026. Die Zählung in ganzen Jahren ist eine vertretbare, leicht günstige Näherung.
- **Empfehlung:** Beibehalten. Optional das Jahr „Erstzulassung + 10“ (wenn ≤ 2035) nur zur Hälfte als steuerfrei rechnen, oder im Hinweis sagen, dass die Befreiung taggenau am Jahrestag der Erstzulassung endet. Als Quelle im Rechner sollte statt ZDF besser die Zoll-Fachmeldung oder § 3d KraftStG verlinkt werden.
- **Quellen:**
  - [§ 3d KraftStG, gesetze-im-internet.de (BMJV/juris), abgerufen 17.11.2026](https://www.gesetze-im-internet.de/kraftstg/__3d.html)
  - [Achtes Gesetz zur Änderung des Kraftfahrzeugsteuergesetzes, BGBl. 2025 I Nr. 342, recht.bund.de, 22.12.2025](https://www.recht.bund.de/bgbl/1/2025/342/VO.html)
  - [Gesetzestext mit Art. 2 Inkrafttreten 01.01.2026, umwelt-online.de (Sekundärquelle für den Wortlaut), abgerufen 17.11.2026](https://umwelt-online.de/recht/allgemei/steuer/z25_0342.htm)
  - [Zoll: Informationen zur Verlängerung der Steuerbefreiung für reine Elektrofahrzeuge, Fachmeldung, 09.01.2026](https://www.zoll.de/SharedDocs/Fachmeldungen/Aktuelle-Einzelmeldungen/2026/kfz_verlaengerung_steuerbefreiung_elektrofahrzeuge.html)
  - [Zoll: Steuervergünstigungen für Elektrofahrzeuge, ohne Datum, abgerufen 17.11.2026](https://www.zoll.de/DE/Fachthemen/Steuern/Verkehrsteuern/Kraftfahrzeugsteuer/Steuerverguenstigungen/Elektrofahrzeuge/elektrofahrzeuge_node.html)

### 2. Kfz-Steuer für E-Autos nach Ablauf der Befreiung

- **Im Rechner:** Gewichtsbasierte Steuer je angefangene 200 kg zulässiges Gesamtgewicht: 11,25 € bis 2.000 kg, 12,02 € über 2.000 bis 3.000 kg, 12,78 € darüber, gestaffelt (jede Stufe nur für ihren Gewichtsanteil), dann um 50 % gekürzt. Code-Kommentar: „KraftStG § 9 Abs. 1 Nr. 2“. Standard 2.000 kg ergibt 56,25 €/Jahr.
- **Befund:**
  - Die Gewichtssätze stehen in **§ 9 Abs. 1 Nr. 3** KraftStG, nicht in Nr. 2. Nr. 2 regelt die Pkw-Steuer nach Hubraum und CO₂. Sätze laut Gesetz: 11,25 € bis 2.000 kg, 12,02 € über 2.000 bis 3.000 kg, 12,78 € über 3.000 bis 3.500 kg, jeweils je angefangene 200 kg.
  - § 9 Abs. 2 KraftStG halbiert die nach Abs. 1 Nr. 3 (oder Nr. 4 a) berechnete Steuer für reine E-Fahrzeuge. Die Regel gilt unverändert, das Achte Änderungsgesetz hat sie nicht berührt.
  - Der Zoll rechnet die Gewichtsstufen gestaffelt: Bei 2.600 kg sind es 10 × 11,25 € + 3 × 12,02 € = 148,56 €, abgerundet 148 € (vor der E-Auto-Halbierung). Das entspricht der Logik im Code.
  - § 11 Abs. 5 KraftStG: Die zu zahlende Steuer wird auf volle Euro abgerundet. Bei 2.000 kg sind es also 112,50 € × 0,5 = 56,25 €, gezahlt werden 56 €.
  - Für Gesamtgewichte über 3.500 kg gilt Nr. 3 nicht mehr. Für Pkw ist das praktisch irrelevant.
- **Bewertung:** korrekt. Sätze, Staffelung und Halbierung stimmen. Nur die Paragrafenangabe „Nr. 2“ ist falsch, und die Abrundung auf volle Euro fehlt (Abweichung unter 1 €/Jahr).
- **Empfehlung:** Rechenlogik beibehalten. Kommentar und Texte auf „§ 9 Abs. 1 Nr. 3 i. V. m. Abs. 2 KraftStG“ korrigieren. Optional nach der Halbierung auf volle Euro abrunden (`Math.floor`), damit der Wert dem Steuerbescheid entspricht (56 € statt 56,25 €). Die Gewichtsobergrenze im Eingabefeld auf 3.500 kg setzen oder 12,78 € nur bis 3.500 kg anwenden.
- **Quellen:**
  - [§ 9 KraftStG, gesetze-im-internet.de (BMJV/juris), abgerufen 17.11.2026](https://www.gesetze-im-internet.de/kraftstg/__9.html)
  - [§ 11 KraftStG (Abrundung, Abs. 5), gesetze-im-internet.de, abgerufen 17.11.2026](https://www.gesetze-im-internet.de/kraftstg/__11.html)
  - [Zoll: Berechnung der Jahressteuer nach den gewichtsorientierten Staffelsteuersätzen, ohne Datum, abgerufen 17.11.2026](https://www.zoll.de/DE/Fachthemen/Steuern/Verkehrsteuern/Kraftfahrzeugsteuer/Grundsaetze_Besteuerung/Steuerhoehe/hintergrund_gewichtsorientierte_staffelsteuersaetze.html)

### 3. Kfz-Steuer für Verbrenner (§ 9 Abs. 1 Nr. 2 KraftStG)

- **Im Rechner:** Hubraumanteil je angefangene 100 ccm: 2,00 € Benzin, 9,50 € Diesel (ab 07/2009). Vor 07/2009 („Euro 4+“): 6,75 € Benzin, 15,44 € Diesel, ohne CO₂-Anteil. CO₂-Anteil 2 € je g/km über 120 g (07/2009–2011), über 110 g (2012–2013), über 95 g (2014–2020). Ab 2021 gestaffelt: 2,00 € (95–115 g), 2,20 € (115–135), 2,50 € (135–155), 2,90 € (155–175), 3,40 € (175–195), 4,00 € (über 195), jede Stufe nur für die Gramm in der Stufe. Standard: 1,4 l Benziner, 2014–2020, 130 g/km, 98 €/Jahr.
- **Befund:**
  - § 9 Abs. 1 Nr. 2 lit. b (Erstzulassung 01.07.2009 bis 31.12.2020): 2 € (Fremdzündung) bzw. 9,50 € (Selbstzündung) je angefangene 100 cm³, dazu 2 € je g/km über 120 g (bis 31.12.2011), über 110 g (ab 01.01.2012), über 95 g (ab 01.01.2014). Stimmt mit dem Code überein.
  - lit. c (Erstzulassung ab 01.01.2021): gleiche Hubraumsätze, CO₂-Stufen „über 95 g/km bis zu 115 g/km“ 2,00 €, über 115 bis 135 g 2,20 €, über 135 bis 155 g 2,50 €, über 155 bis 175 g 2,90 €, über 175 bis 195 g 3,40 €, über 195 g 4,00 €. Laut Zoll werden die Einzelbeträge der Stufen addiert. Bandgrenzen und Staffelung im Code stimmen.
  - lit. a (Erstzulassung bis 30.06.2009): 6,75 € / 15,44 € gelten für die beste Schadstoffklasse (aa). Der Zoll ordnet dem „Euro 3 und besser“ zu. Schlechtere Klassen zahlen mehr (Euro 2: 7,36 € / 16,05 €, Euro 1: 15,13 € / 27,35 €, bis 25,36 € / 37,58 €). Das Label „Euro 4+“ ist zu eng, weil auch Euro 3 diesen Satz bekommt. Für Euro 1 und 2 rechnet der Rechner zu niedrig.
  - Prüfrechnung Standard: 14 × 2 € = 28 € Hubraum + (130 − 95) × 2 € = 70 € CO₂ = **98 €**. Stimmt. Kein Abrundungsbedarf.
  - § 10b KraftStG (30 € Ermäßigung für Pkw mit höchstens 95 g/km, Erstzulassung 12.06.2020 bis 31.12.2024) endete spätestens am 31.12.2025. Für Rechenjahre ab 2026 spielt sie keine Rolle.
- **Bewertung:** korrekt. Alle Sätze, Schwellen und Bandgrenzen entsprechen § 9 Abs. 1 Nr. 2, und der Standardwert 98 € stimmt. Nur das Label „Euro 4+“ für vor 07/2009 ist ungenau.
- **Empfehlung:** Beibehalten. Label ändern in „vor 07/2009 (Euro 3 oder besser)“. Optional einen Hinweis ergänzen, dass Euro 1/2 deutlich höhere Sätze zahlen. Beim CO₂-Wert auf Feld V.7 der Zulassungsbescheinigung verweisen.
- **Quellen:**
  - [§ 9 KraftStG, gesetze-im-internet.de (BMJV/juris), abgerufen 17.11.2026](https://www.gesetze-im-internet.de/kraftstg/__9.html)
  - [Zoll: Steuerhöhe (Pkw-Sätze, Euro-Klassen, CO₂-Stufen), ohne Datum, abgerufen 17.11.2026](https://www.zoll.de/DE/Fachthemen/Steuern/Verkehrsteuern/Kraftfahrzeugsteuer/Grundsaetze_Besteuerung/Steuerhoehe/steuerhoehe.html)
  - [§ 10b KraftStG, gesetze-im-internet.de, abgerufen 17.11.2026](https://www.gesetze-im-internet.de/kraftstg/__10b.html)

### 4. THG-Prämie (THG-Quote)

- **Im Rechner:** 250 €/Jahr für das E-Auto, jedes Jahr gleich. Hinweis: „Markt 2026: meist 250–350 €, nur für den Halter“. FAQ: einmal pro Fahrzeug und Kalenderjahr. Wenn der Vorbesitzer sie für das laufende Jahr schon beantragt hat, ist der Käufer erst im nächsten Jahr dran. Standard-Startjahr: 2027.
- **Befund:**
  - **Wer darf beantragen:** Nach § 7 Abs. 1 der 38. BImSchV gilt beim nicht öffentlichen Laden die Person als Ladepunktbetreiber, auf die das E-Auto nachweislich zugelassen ist. Nachweis ist die Zulassungsbescheinigung Teil I. Die Anrechnung ist pro Fahrzeug und Verpflichtungsjahr (= Kalenderjahr) nur einmal möglich (§ 7 Abs. 4). Der Rechner sagt „Halter“. Rechtlich zählt der Zulassungsinhaber, der im Normalfall auch der Halter ist. Plug-in-Hybride sind ausgeschlossen.
  - **Frist:** Nach § 8 der 38. BImSchV muss der Dritte (Anbieter) die Fahrzeuge bis zum **15. November des Verpflichtungsjahres** melden. Für 2026 ist die Frist am 15.11.2026 abgelaufen. Wer heute ein gebrauchtes E-Auto kauft, bekommt für 2026 keine Prämie mehr. Mit Startjahr 2027 ist der Standard davon nicht betroffen.
  - **Schätzwert:** BMUKN-Bekanntmachung BAnz AT 28.10.2026 B4, gültig ab Verpflichtungsjahr 2027: Pkw (M1) bleiben bei 2.000 kWh/Jahr. Der Mehrfachanrechnungsfaktor 3 für Ladestrom bleibt nach dem neuen Gesetz bis einschließlich 2034, sinkt 2035 auf 2 und ab 2036 auf 1. Die anrechenbare Menge pro Pkw ändert sich bis 2034 also nicht.
  - **Reform:** Zweites Gesetz zur Weiterentwicklung der THG-Quote (RED-III-Umsetzung), BGBl. 2026 I Nr. 163, ausgefertigt 01.06.2026, verkündet 05.06.2026. Die Quote steigt laut Gleiss Lutz und VOLTORI von 12 % (2026) auf 17,5 % (2027), 19,5 % (2028), 22,5 % (2029), 26,5 % (2030) und 65 % (2040). Für Pkw-Halter ändert sich am Verfahren nichts. Die höhere Quote spricht eher für steigende Quotenpreise, belastbare Prognosen gibt es aber nicht. Die Quotenzahlen habe ich nicht im Gesetzestext selbst geprüft, weil das PDF nicht lesbar war. Sie stammen aus Sekundärquellen. AUTO BILD nennt noch 14,6 % (2027) und 59 % (2040). Das sind die Werte des Regierungsentwurfs und damit veraltet.
  - **Neue UBA-Gebühren:** Seit 17.04.2026 erhebt das UBA für Anträge nach § 8 Gebühren von 94,60 € bis 6.500 € je Antrag. Anbieter bündeln viele Fahrzeuge, die Wirkung je Auto ist daher klein, kann die Nettoauszahlung aber leicht drücken.
  - **Markt 2026:** Laut ADAC (24.06.2026) zahlen manche Anbieter über 300 €. Laut VOLTORI (Stand 17.11.2026) liegen die Fixprämien von 33 Anbietern im Schnitt bei rund 300 €, im August 2026 meist bei 300–380 € (nach auto motor und sport). Laut AUTO BILD (16.11.2026) bot WirkaufenDeinZertifikat zuletzt 333 € Garantie. Die Spanne 250–350 € für 2026 passt.
  - **Angekündigt für 2027:** Laut AUTO BILD (16.11.2026) liegen die festen Zusagen für 2027 bei 150–300 €, die meisten bei 200–233 €. 300 € gibt es nur mit Bonus und Zweijahresvertrag. Flex-Modelle versprechen bis 385–400 €, ohne Garantie. Mehrere große Anbieter (E.ON, EnBW, Carbonify) hatten noch keine Summe genannt.
  - **Steuern:** Für Privatpersonen ist die Auszahlung laut ADAC steuerfrei.
- **Bewertung:** unklar. Die Regeln (Halter bzw. Zulassungsinhaber, einmal pro Fahrzeug und Jahr) sind korrekt und die Spanne für 2026 stimmt. Der Standard von 250 €/Jahr liegt für 2027 aber über den meisten bisher garantierten Angeboten (rund 200–230 €). Für 2028 ff. gibt es keine belastbare Quelle.
- **Empfehlung:** Hinweistext aktualisieren, zum Beispiel: „2026: meist 250–350 €. Feste Zusagen für 2027 bisher meist 200–300 €. Nur für den Zulassungsinhaber, einmal pro Auto und Jahr.“ Den Standard auf etwa 220 € senken oder bei 250 € bleiben und ihn ausdrücklich als Annahme mit steigender Quote kennzeichnen. In der FAQ ergänzen, dass die Anmeldung für ein Jahr bis 15. November dieses Jahres laufen muss. Die Finanztip-Quelle durch die UBA-Seite oder § 7 der 38. BImSchV ergänzen.
- **Quellen:**
  - [§ 7 38. BImSchV, gesetze-im-internet.de (BMJV/juris), abgerufen 17.11.2026](https://www.gesetze-im-internet.de/bimschv_38_2017/__7.html)
  - [§ 8 38. BImSchV (Frist 15. November), gesetze-im-internet.de, abgerufen 17.11.2026](https://www.gesetze-im-internet.de/bimschv_38_2017/__8.html)
  - [UBA: Vollzug 38. BImSchV – Anrechnung von Strom für Elektrofahrzeuge (Gebühren seit 17.04.2026, BAnz-Hinweise), Stand 13.11.2026](https://www.umweltbundesamt.de/themen/verkehr/kraftstoffe-antriebe/vollzug-38-bimschv-anrechnung-von-strom-fuer)
  - [Zweites Gesetz zur Weiterentwicklung der Treibhausgasminderungs-Quote, BGBl. 2026 I Nr. 163, recht.bund.de, 05.06.2026](https://www.recht.bund.de/bgbl/1/2026/163/VO.html)
  - [Gleiss Lutz: Bundestag verschärft THG-Minderungspfad (Faktor 3 bis 2034, Quotenpfad), 13.05.2026 (Sekundärquelle)](https://www.gleisslutz.com/en/know-how/bundestag-tightens-greenhouse-gas-reduction-trajectory)
  - [electrive: THG-Quote soll bis 2040 auf 65 % steigen, 24.04.2026 (Sekundärquelle)](https://www.electrive.net/2026/04/24/gesetzesnovelle-thg-quote-soll-in-deutschland-bis-2040-auf-65-steigen/)
  - [THG-Quotenportal: THG-Schätzwerte 2027 (BAnz AT 28.10.2026 B4), 29.10.2026 (Sekundärquelle, Bekanntmachung selbst nicht eingesehen)](https://thg-quotenportal.de/elektromobilitaet-magazin/thg-schatzwerte-2027-mehr-quote-fur-e-lkw-und-transporter)
  - [ADAC: THG-Quote 2026, 24.06.2026](https://www.adac.de/rund-ums-fahrzeug/elektromobilitaet/elektroauto/thg-quote/)
  - [AUTO BILD: THG-Prämie 2027 im Vergleich, 16.11.2026](https://www.autobild.de/artikel/thg-quoten-vergleich-anbieter-21337529.html)
  - [VOLTORI: THG-Quote 2027, Stand 17.11.2026 (Anbieterportal)](https://www.voltori.de/thg-quote-2027)

### 5. Bundesförderung für E-Autos 2026

- **Im Rechner:** Keine Kaufprämie eingerechnet.
- **Befund:** Das neue einkommensabhängige Förderprogramm des BMUKN (Anträge seit 19.05.2026 über die Förderzentrale Deutschland, abgewickelt vom BAFA) gilt nur für **Neuwagen**, gekauft oder geleast, mit Erstzulassung in Deutschland ab 01.01.2026. Das BMUKN schreibt, das Programm sei „auf Kauf oder Leasing von Neuwagen ausgerichtet“. Weitere Eckdaten: zu versteuerndes Haushaltseinkommen höchstens 80.000 €, plus 5.000 € je Kind, höchstens 90.000 €. Förderung 1.500–6.000 €, für E-Autos 3.000 € Basis. 3 Mrd. € Budget für 2026–2029. **Gebrauchtwagen sind nicht förderfähig.**
- **Bewertung:** korrekt. Für einen Gebrauchtwagen gibt es 2026 keine Bundeskaufprämie, sie fehlt im Rechner also zu Recht.
- **Empfehlung:** Beibehalten. Optional ein FAQ-Satz: „Die E-Auto-Förderung 2026 gilt nur für Neuwagen, nicht für Gebrauchte.“ Indirekt kann die Neuwagenförderung die Gebrauchtpreise drücken, das gehört aber in die Wertverlust-Annahmen.
- **Quellen:**
  - [BMUKN: Fragen und Antworten zur E-Auto-Förderung, Stand 20.05.2026 (Aktualisierungen bis 12.08.2026)](https://www.bundesumweltministerium.de/foerderung/fragen-und-antworten-zur-e-auto-foerderung)

### 6. Weitere Rechtsänderungen mit Einfluss auf die laufenden Kosten 2026–2030

- **Im Rechner:** Konstante Verbrenner-Steuer, E-Auto-Steuer nach Ablauf der Befreiung, Preissteigerungsraten für Sprit (3 %/Jahr) und Strom (1,5 %/Jahr) als Nutzereingabe.
- **Befund:**
  - **CO₂-Preis auf Kraftstoffe (BEHG):** Weil der EU-ETS 2 auf 2028 verschoben wurde (VO (EU) 2026/667), soll der nationale CO₂-Preis auch 2027 im Korridor von 55–65 €/t bleiben. Der Bundestag hat das Dritte BEHG-Änderungsgesetz am 15.10.2026 beschlossen. Der Bundesrat berät am 20.11.2026, das Gesetz ist also noch nicht verkündet. Ab 2028 bestimmt der Markt im ETS 2 den Preis. Dazu gibt es keine belastbare Quelle für die Höhe. Das betrifft die Annahme zum Spritpreisanstieg, nicht die Steuerlogik.
  - **Kfz-Steuer-Reform:** Für Pkw gibt es keinen beschlossenen oder im Gesetzgebungsverfahren befindlichen Entwurf, der Verbrenner höher oder E-Autos anders besteuert. Berichte über Überlegungen im BMUKN von 2025 und ein UBA-Vorschlag zu einem Zulassungs-Malus sind nicht umgesetzt. Keine belastbare Quelle für eine konkrete Reform gefunden.
  - **§ 10b KraftStG** (30 € Ermäßigung für sparsame Verbrenner) ist Ende 2025 ausgelaufen, siehe Punkt 3.
  - **Netzentgelt-Rabatt für Wallboxen (§ 14a EnWG):** Steuerbare Wallboxen bekommen reduzierte Netzentgelte. Modul 1 ist eine Pauschale, laut BNetzA je nach Netzgebiet etwa 110–190 €/Jahr brutto (Stand 2023). Modul 2 senkt den Arbeitspreis um 60 %, mit separatem Zähler. Das senkt den Heimladestrompreis, ist aber eine Strompreisfrage und keine Steuer- oder THG-Frage. Aktuelle Werte für 2026 habe ich nicht geprüft.
- **Bewertung:** unklar. Die Steuerregeln im Rechner sind nach heutigem Recht bis 2035 stabil. Die CO₂-Bepreisung ab 2028 und mögliche Reformen sind offen und lassen sich nur über die Preissteigerungsraten abbilden.
- **Empfehlung:** Steuerlogik beibehalten. In den Erläuterungen zur Spritpreissteigerung den CO₂-Preis (2026/2027: 55–65 €/t, ab 2028 EU-ETS 2) als Grund nennen. Optional einen Hinweis auf § 14a EnWG beim Heimstrompreis ergänzen. Das gehört in den Block Energiepreise.
- **Quellen:**
  - [Deutscher Bundestag: Brennstoffemissionshandelsgesetz, Textarchiv KW 42, Oktober 2026](https://www.bundestag.de/dokumente/textarchiv/2026/kw42-de-brennstoffemissionshandelsgesetz-1223608)
  - [BMUKN: Entwurf Drittes BEHG-Änderungsgesetz, 2026](https://www.bundesumweltministerium.de/fileadmin/Daten_BMU/Download_PDF/Gesetze/drittes_behg-aenderungsgesetz.pdf)
  - [Bundesrat: Empfehlungen der Ausschüsse zur 1070. Sitzung am 20.11.2026, Drucksache 624/1/26](https://dserver.bundestag.de/brd/2026/0624-1-26.pdf)
  - [§ 10b KraftStG, gesetze-im-internet.de, abgerufen 17.11.2026](https://www.gesetze-im-internet.de/kraftstg/__10b.html)
  - [Bundesnetzagentur: Pressemitteilung zu steuerbaren Verbrauchseinrichtungen (§ 14a EnWG), 27.11.2023](https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/DE/2023/20231127_14a.html)

## Szenario, Kapitalkosten und CO₂

### 1. Jährliche Fahrleistung

- **Im Rechner:** 13.000 km pro Jahr
- **Befund:** Das KBA hat die Reihe „Verkehr in Kilometern“ im September 2026 auf eine neue Methode umgestellt. Grundlage sind jetzt die Kilometerstände bei der Hauptuntersuchung. Ergebnis: Ø **10.616 km je Pkw im Jahr 2025** (revidiert: 10.581 km 2024, 10.385 km 2023). Nach Antrieb 2025: **E-Auto (BEV) 11.312 km** (+25,8 % gegenüber dem Vorjahr), **Benziner 8.406 km**, Hybrid ohne Stecker 13.526 km, Plug-in-Hybrid 13.575 km. Für Diesel nennen Pressemitteilung und Kurzbericht keinen Wert je Fahrzeug, nur den Anteil an der Pkw-Fahrleistung (35,4 %, −4,1 %). Den Dieselwert je Fahrzeug konnte ich nicht prüfen, weil sich die XLSX-Zeitreihe des KBA nicht auslesen ließ: keine belastbare Quelle gefunden. Eine Aufteilung nach privaten und gewerblichen Haltern weist das KBA nicht aus: keine belastbare Quelle gefunden. Die alte Methode ergab für 2024 noch rund 12.300 km je Pkw und ist mit der neuen nicht vergleichbar. Diesen Wert habe ich nur über Sekundärquellen gesehen.
- **Bewertung:** zu hoch. 13.000 km liegen etwa 22 % über dem amtlichen Pkw-Durchschnitt und etwa 15 % über dem Durchschnitt der E-Autos.
- **Empfehlung:** Auf **11.000 km** senken. Hinweistext: „KBA 2025: Ø rund 10.600 km je Pkw, E-Autos 11.300 km, Benziner 8.400 km. Vielfahrer bitte eigenen Wert eintragen.“
- **Quellen:**
  - [Pressemitteilung Nr. 38/2026 „Verkehr in Kilometern“](https://www.kba.de/DE/Presse/Pressemitteilungen/Allgemein/2026/pm38_2026_verkehr_in_kilometern.html) – Kraftfahrt-Bundesamt, 9. September 2026
  - [Verkehr in Kilometern – Kurzbericht 2023–2025 (PDF)](https://www.kba.de/DE/Statistik/Kraftverkehr/VerkehrKilometer/vk_inlaenderfahrleistung/2025/verkehr_in_kilometern_kurzbericht_pdf.pdf?__blob=publicationFile&v=5) – Kraftfahrt-Bundesamt, September 2026
  - [Verkehr in Kilometern – Tabellen 2025](https://www.kba.de/DE/Statistik/Kraftverkehr/VerkehrKilometer/vk_inlaenderfahrleistung/2025/2025_vk_tabellen.html) – Kraftfahrt-Bundesamt, September 2026

### 2. Haltedauer

- **Im Rechner:** 5 Jahre
- **Befund:** Die jüngsten Zahlen zur Haltedauer, die ich in einer belastbaren Quelle gefunden habe, stammen aus dem DAT-Report 2021. Das ifeu zitiert sie in seinem Papier 02/2023. Danach behielten Gebrauchtwagenkäufer ihr Auto 2020 im Schnitt **81 Monate (6,75 Jahre)**, 2019 waren es 88 Monate. Bei Neuwagen waren es 71 Monate. Kam der Gebrauchte nach einem Neuwagen, lag der Wert sogar bei 124 Monaten. Für neuere DAT-Reports (2024–2026) habe ich keine Zahl zur Haltedauer gefunden, nur einen Werkstatt-Blog ohne nachprüfbaren Beleg: keine belastbare Quelle gefunden. Zum Vergleich: Das Durchschnittsalter der zugelassenen Pkw stieg laut KBA am 1. Januar 2026 auf **10,9 Jahre** (Vorjahr 10,6).
- **Bewertung:** zu niedrig. Die letzte verfügbare Statistik zeigt fast 7 Jahre bei Gebrauchtwagen, und die Flotte altert weiter. Die Zahl ist allerdings fünf Jahre alt.
- **Empfehlung:** Auf **6 Jahre** erhöhen. Das ist bewusst konservativ, weil Batteriezustand und Wiederverkauf über längere Zeiträume unsicherer werden. Hinweistext: „Gebrauchtwagen werden im Schnitt 6–7 Jahre gehalten (DAT).“
- **Quellen:**
  - [Neukauf eines Elektro-Pkw oder Weiternutzung des alten Verbrenners? (ifeu paper 02/2023, Infobox Haltedauern mit Daten aus dem DAT-Report 2021)](https://www.ifeu.de/fileadmin/uploads/ifeu_paper/ifeu_paper_02-2023_-_Umstieg_auf_Elektro-Pkw_rev03-2025.pdf) – ifeu Heidelberg, Dezember 2023, Revision 03/2025
  - [Der Fahrzeugbestand am 1. Januar 2026 (Pressemitteilung Nr. 09/2026)](https://www.kba.de/DE/Presse/Pressemitteilungen/Fahrzeugbestand/2026/pm09_fz_bestand_pm_komplett.html) – Kraftfahrt-Bundesamt, 3. März 2026

### 3. Zins / Opportunitätskosten

- **Im Rechner:** 3 % pro Jahr. Hinweis: „Was das im Auto gebundene Geld sonst bringen würde, z. B. auf dem Tagesgeldkonto“
- **Befund:**
  - **EZB:** Die EZB hat ihre Leitzinsen 2026 zweimal angehoben. Der Einlagesatz liegt seit dem 16. September 2026 bei **2,50 %** (seit 17. Juni 2026: 2,25 %, davor 2,00 %).
  - **Bankzinsen (Euroraum, MFI-Zinsstatistik August 2026):** Täglich fällige Einlagen privater Haushalte 0,29 %, Einlagen bis 1 Jahr Laufzeit 2,13 %. Konsumentenkredite kosteten 7,92 %. Ausschließlich deutsche Werte habe ich nicht auslesen können.
  - **Tagesgeld in Deutschland:** Laut Verivox (9. September 2026, über 800 Banken) zahlen überregionale Banken im Schnitt **1,4 %** Bestandskundenzins, Sparkassen 0,42 % und Genossenschaftsbanken 0,48 %. Die besten Dauerzinsen liegen bei 2,5 bis 2,6 %. Lockzinsen bis 4,25 % gelten nur 3–4 Monate für Neukunden. Mitte Oktober 2026 meldete Verivox laut dpa 1,47 % als Tagesgeld-Durchschnitt.
  - **Festgeld:** 2 Jahre Laufzeit brachten im September 2026 im Schnitt 2,55 % und Mitte Oktober 2,64 % (Verivox). Einen Durchschnitt für 5 Jahre Laufzeit habe ich nicht gefunden: keine belastbare Quelle gefunden.
  - **Autokredit:** Der ADAC-Autokredit kostet am 17. November 2026 **6,24 % effektiv**. Repräsentatives Beispiel: 10.000 €, 60 Monate. Ein Marktdurchschnitt speziell für Autokredite fand sich nur auf Vergleichsportalen (rund 6 %) und ist damit eine Sekundärquelle.
  - **Inflation:** Die Bundesbank erwartet für 2026 2,9 % und für 2027 2,7 %.
- **Bewertung:** realistisch. 3 % entsprechen in etwa einer gut verzinsten sicheren Anlage über mehrere Jahre (Festgeld 2,6 %, beste Tagesgeld-Dauerzinsen 2,5 %). Der Hinweis „Tagesgeldkonto“ führt aber in die Irre, weil der typische Tagesgeldzins nur bei rund 1,5 % liegt. Wer das Auto auf Kredit kauft, zahlt etwa doppelt so viel.
- **Empfehlung:** 3 % beibehalten und den Hinweistext ändern: „Was das im Auto gebundene Geld sonst bringen würde, z. B. als Festgeld (Ende 2026 ca. 2,5–3 %). Bei Finanzierung den Kreditzins eintragen (Autokredit ca. 6–8 %).“
- **Quellen:**
  - [Key ECB interest rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html) – Europäische Zentralbank, Stand 16. September 2026
  - [EZB-Rat hebt Leitzinsen um 25 Basispunkte an](https://www.bundesbank.de/de/aufgaben/themen/ezb-rat-hebt-leitzinsen-um-25-basispunkte-an-1008148) – Deutsche Bundesbank, 10. September 2026
  - [MFI-Zinsstatistik für den Euroraum: August 2026 (PDF)](https://www.ecb.europa.eu/press/stats/mfi/html/ecb.mir2610~8e4898ad10.de.html) – EZB, deutsche Übersetzung durch die Bundesbank, 1. Oktober 2026
  - [Harter Wettbewerb um Sparer: Banken zahlen bis zu 4,25 Prozent aufs Tagesgeld](https://www.verivox.de/presse/harter-wettbewerb-um-sparer-banken-zahlen-bis-zu-425-prozent-aufs-tagesgeld-1121672/) – Verivox (Vergleichsportal, Sekundärquelle), 9. September 2026
  - [Tagesgeld: Viele Sparkassen zahlen deutlich weniger Zinsen als andere Banken](https://ms-aktuell.de/?p=168710) – dpa-Meldung zu einer Verivox-Auswertung (Sekundärquelle), 15. Oktober 2026
  - [ADAC Autokredit – Gebrauchtwagenfinanzierung](https://www.adac.de/produkte/finanzdienstleistungen/autokredit/gebrauchtwagen-finanzierung) – ADAC, abgerufen am 17. November 2026 (ohne Datumsangabe)

### 4. CO₂-Faktor Strom

- **Im Rechner:** 0,36 kg CO₂/kWh („deutscher Strommix“)
- **Befund:** Das Umweltbundesamt (Climate Change 16/2026, März 2026) nennt für den Stromverbrauch in Deutschland folgende direkte CO₂-Emissionen bei der Erzeugung:
  - 379 g/kWh im Jahr 2023
  - **353 g/kWh im Jahr 2024** (vorläufig)
  - **344 g/kWh im Jahr 2025** (geschätzt)

  Daneben weist das UBA weitere Varianten aus:
  - **Mit Stromhandelssaldo** („Strominlandsverbrauch“): 334 g (2024) und 330 g (2025)
  - **Alle Treibhausgase ohne Vorketten:** 361 g CO₂e (2024) und 352 g CO₂e (2025)
  - **Lebenszyklus, also mit Vorketten** (Brennstoffförderung, Anlagenbau): **414 g CO₂e (2024) und 406 g CO₂e (2025)**. Das sind rund 18 % mehr als der direkte Wert.

  Für 2026 gibt es noch keinen g/kWh-Wert: keine belastbare Quelle gefunden. Laut Fraunhofer ISE lag der Erneuerbaren-Anteil an der öffentlichen Nettostromerzeugung im ersten Halbjahr 2026 mit 61,8 % etwa auf Vorjahresniveau (61,3 %). Ein deutlicher Sprung ist für 2026 also nicht zu erwarten. Der Rechner vergleicht Auspuff-CO₂ des Verbrenners (ohne Kraftstoff-Vorkette) mit direktem Strom-CO₂ (ohne Vorkette). Beide Seiten beruhen damit auf derselben Systemgrenze. Wer für Strom den Lebenszykluswert (0,406) nimmt, muss auch beim Kraftstoff die Vorkette (Förderung, Raffinerie, Transport) addieren. Sonst wird das E-Auto benachteiligt.
- **Bewertung:** veraltet. 0,36 entspricht etwa den Werten für 2024 (353 g CO₂ bzw. 361 g CO₂e). Der aktuelle UBA-Wert für 2025 liegt bei 344 g, und über eine Haltedauer bis etwa 2031 dürfte der Faktor eher weiter sinken.
- **Empfehlung:** Auf **0,34 kg/kWh** setzen. Hinweistext: „Umweltbundesamt, Schätzung 2025: 344 g CO₂ je kWh (nur Kraftwerksemissionen; mit Vorketten 406 g CO₂e).“
- **Quellen:**
  - [Entwicklung der spezifischen Treibhausgas-Emissionen des deutschen Strommix in den Jahren 1990–2025 (Climate Change 16/2026, PDF)](https://www.umweltbundesamt.de/system/files/medien/11850/publikationen/2026-03/16_2026_CC.pdf) – Umweltbundesamt, März 2026
  - [CO₂-Emissionen pro Kilowattstunde Strom 2025 nur leicht gesunken](https://www.umweltbundesamt.de/themen/co2-emissionen-pro-kilowattstunde-strom-2025-nur) – Umweltbundesamt, 23. März 2026
  - [Halbjahresauswertung Stromerzeugung 2026 (Presseinformation, PDF)](https://www.ise.fraunhofer.de/content/dam/ise/de/documents/presseinformationen/2026/1826_ISE_d_PI_Halbjahresauswertung.pdf) – Fraunhofer ISE, Juli 2026 (genaues Datum nicht geprüft)

### 5. CO₂-Faktoren Benzin und Diesel

- **Im Rechner:** 2,37 kg CO₂ je Liter Benzin, 2,65 kg CO₂ je Liter Diesel (Auspuff)
- **Befund:**
  - **Gesetzliche Standardwerte (EBeV 2030, Anlage 2 Teil 4, Brennstoffemissionshandel):**
    - Benzin: Dichte 0,755 t/1000 l, Heizwert 43,5 GJ/t, Faktor 0,0729 t CO₂/GJ. Das ergibt **≈ 2,39 kg CO₂/l** (eigene Rechnung).
    - Diesel: Dichte 0,845 t/1000 l, Heizwert 42,8 GJ/t, Faktor 0,074 t CO₂/GJ. Das ergibt **≈ 2,68 kg CO₂/l** (eigene Rechnung).
    - Beide Werte gelten für den reinen fossilen Kraftstoff, gemessen am Auspuff (tank-to-wheel).
  - **UBA-Werte (CO₂-Emissionsfaktoren für fossile Brennstoffe, aktualisiert Februar 2025):** Ottokraftstoff liegt seit Jahren stabil bei rund 73,1 t CO₂/TJ, Diesel bei rund 74,0 t CO₂/TJ. Gemessene Gemische mit Bioanteil liegen niedriger, weil Bioethanol Sauerstoff enthält: Super E5 etwa 3,07–3,12 t CO₂/t, Super E10 etwa 3,03–3,08 t CO₂/t.
  - **E10:** Bis zu 10 Vol.-% des Kraftstoffs sind Ethanol, dessen CO₂ als biogen gilt. Der fossile Anteil am Auspuff beträgt deshalb nur etwa **2,15 kg/l** (0,9 × 2,39). Mit dem Ethanol-CO₂ kommen am Auspuff insgesamt etwa 2,3 kg/l heraus. Beides ist eine eigene Überschlagsrechnung. Sie passt zur UBA-Messung für E10 (rund 3,04 t/t), wenn man eine Dichte von etwa 0,75 kg/l annimmt.
  - **Diesel B7:** Bis zu 7 Vol.-% sind Biodiesel. Der fossile Anteil liegt dann bei etwa 2,5 kg/l (eigene Rechnung). Den tatsächlichen mittleren Bioanteil an deutschen Tankstellen habe ich nicht geprüft.
  - **DIN EN 16258:** Diese Norm wurde 2023 durch DIN EN ISO 14083 ersetzt. Für reine Kraftstoffe nennt sie am Auspuff 2,42 (Benzin) bzw. 2,67 kg CO₂e/l (Diesel). Diese Zahlen habe ich nur in Sekundärquellen gefunden; der Normtext ist nicht frei zugänglich.
  - **BAFA-Informationsblatt CO₂-Faktoren:** Werte je Liter nicht gefunden: keine belastbare Quelle gefunden.
- **Bewertung:** realistisch. 2,37 und 2,65 kg/l liegen weniger als 1 % unter den gesetzlichen Standardwerten für reinen fossilen Kraftstoff. Sie bilden den Auspuff-Ausstoß ohne Vorkette ab, also dieselbe Systemgrenze wie der Stromfaktor.
- **Empfehlung:** Beibehalten, optional auf 2,39 und 2,68 präzisieren. Hinweistext: „CO₂ am Auspuff je Liter reinem fossilem Kraftstoff (Standardwerte Brennstoffemissionshandel). Bei E10 sind davon rund 10 % biogen.“
- **Quellen:**
  - [Emissionsberichterstattungsverordnung 2030 (EBeV 2030), Anlage 2](https://www.gesetze-im-internet.de/ebev_2030/anlage_2.html) – Bundesministerium der Justiz / gesetze-im-internet.de, geltende Fassung, abgerufen am 17. November 2026
  - [CO₂-Emissionsfaktoren für fossile Brennstoffe (Climate Change 28/2022, aktualisierte Fassung, PDF)](https://www.umweltbundesamt.de/system/files/medien/11850/publikationen/28_2022_cc.pdf) – Umweltbundesamt, 2022, aktualisiert Februar 2025

### 6. Herstellungsemissionen und gebrauchtes E-Auto

- **Im Rechner:** Der Verbrenner wird mit seinem Auspuff-CO₂ bewertet, das E-Auto mit dem CO₂ des Strommixes. Die Herstellung (insbesondere der Batterie) bleibt bei beiden Autos außen vor.
- **Befund:**
  - **ICCT, Juli 2025 (EU, Neuwagen 2025):** Ein E-Auto verursacht über den Lebensweg etwa 63 g CO₂e/km, ein Benziner (E10) etwa 235 g/km. Das sind **−73 %**. Die Herstellung des E-Autos verursacht rund 40 % mehr Emissionen. Dieser Mehrausstoß ist nach etwa **17.000 km** ausgeglichen. Die ICCT-Seite blockierte den Abruf; die Zahlen stammen aus der Berichterstattung von electrive (Sekundärquelle).
  - **ifeu paper 01/2025 (Deutschland, Baujahr 2023, 220.000 km Lebensfahrleistung):** Über den Lebensweg verursacht ein E-Auto bis zu 60 % weniger Treibhausgase. Der Batterie-Mehraufwand ist nach **25.000 km (gegenüber Diesel) bzw. 45.000 km (gegenüber Benziner)** ausgeglichen.
  - **ADAC/Joanneum Research (Stand Dezember 2022):** Mit deutschem Strommix ist der Mehraufwand nach 45.000–60.000 km ausgeglichen, mit Windstrom nach 25.000–30.000 km.
  - **Fraunhofer ISI:** Eine Lebenszyklusstudie von 2024 oder 2025 habe ich nicht gefunden; die letzten Arbeiten stammen von 2019/2020. Keine belastbare Quelle gefunden.
  - **Gebrauchtes E-Auto:**
    - Nur das ifeu-Papier 02/2023 (Revision 2025) behandelt die Frage direkt. In einer reinen Nutzerperspektive darf der Zweitbesitzer die Herstellungsemissionen ausblenden. Im Beispiel mit 6 Jahren Haltedauer spart er so 11,7 t Treibhausgase, der Erstbesitzer nur 5,4 t.
    - Das ifeu hält diese Sicht aber für einseitig: Solche Ausschnittsbilanzen führten „zu einseitigen Analysen und Fehlschlüssen“. Für eine faire persönliche Bilanz empfiehlt es, die Herstellung anteilig nach gefahrenen Kilometern auf alle Halter umzulegen. Ein gebrauchtes E-Auto sei dann nicht emissionsfrei.
    - Das Sunk-Cost-Argument gilt also nur aus Sicht der einzelnen Kaufentscheidung. Als Zurechnung von Verantwortung ist es nicht allgemein akzeptiert.
    - Im Rechner fehlt die Herstellung bei beiden Autos. Der Fehler beschränkt sich daher auf den Herstellungs-Mehraufwand des E-Autos, nicht auf seine gesamten Herstellungsemissionen. Laut ifeu machen die Herstellungsemissionen beim Verbrenner höchstens etwa 15 % der Lebenswegemissionen aus.
- **Bewertung:** unklar. Für die Kaufentscheidung eines Gebrauchtwagens ist das Weglassen vertretbar, weil die Herstellung bei beiden Autos schon angefallen ist. Nach der Methodik des ifeu, das die Herstellung anteilig auf alle Halter umlegt, wäre der Vorteil des E-Autos etwas kleiner, er bleibt laut allen Studien aber deutlich.
- **Empfehlung:** Die Rechnung beibehalten, aber transparent machen. Hinweistext: „Die Herstellung beider Autos ist nicht eingerechnet: Beim Gebrauchtkauf ist sie schon angefallen. Auch mit Herstellung ist ein E-Auto über sein ganzes Leben deutlich klimafreundlicher (ifeu 2025: bis zu −60 %, ICCT 2025: −73 % gegenüber Benzinern).“
- **Quellen:**
  - [Life-cycle greenhouse gas emissions from passenger cars in the European Union](https://theicct.org/publication/electric-cars-life-cycle-analysis-emissions-europe-jul25/) – ICCT, Juli 2025 (Abruf blockiert, Zahlen nicht im Original geprüft)
  - [EVs are getting cleaner faster than expected](https://www.electrive.com/2025/07/09/evs-are-getting-cleaner-faster-than-expected) – electrive (Sekundärquelle), 9. Juli 2025
  - [Quo vadis Elektroauto? Update der Klimabilanz (ifeu paper 01/2025, PDF)](https://www.ifeu.de/fileadmin/uploads/ifeu_paper/01_ifeu_Paper_Aktualisierte_Klimabilanz_von_Pkw_20250214_final.pdf) – ifeu Heidelberg, Februar 2025
  - [Neukauf eines Elektro-Pkw oder Weiternutzung des alten Verbrenners? (ifeu paper 02/2023, PDF)](https://www.ifeu.de/fileadmin/uploads/ifeu_paper/ifeu_paper_02-2023_-_Umstieg_auf_Elektro-Pkw_rev03-2025.pdf) – ifeu Heidelberg im Auftrag des BMWK, Dezember 2023, Revision 03/2025
  - [Treibhausgas-Bilanz: Welcher Antrieb kann das Klima retten?](https://www.adac.de/verkehr/tanken-kraftstoff-antrieb/alternative-antriebe/co2-treibhausgasbilanz-studie/) – ADAC (Studie von Joanneum Research), 21. Dezember 2022

### 7. Preissteigerung Kraftstoff (3 %/Jahr) und Strom (1,5 %/Jahr): Plausibilität anhand der Inflationsprognosen

- **Im Rechner:** Kraftstoff +3 % pro Jahr, Strom +1,5 % pro Jahr
- **Befund:**
  - **Bundesbank (Deutschland-Prognose, 12. Juni 2026):** HVPI-Inflation 2,9 % (2026), 2,7 % (2027) und 1,9 % (2028). Der Energiepreisschock treibt die Teuerung. Die Prognose unterstellt allerdings, dass der Ölpreis wieder deutlich sinkt. Der Rückgang 2028 hat auch damit zu tun, dass der nationale CO₂-Preis dann im europäischen Emissionshandel ETS II aufgeht; laut Bundesbank dämpft das die Preise.
  - **EZB-Projektionen (Euroraum, September 2026):** 3,0 % (2026), 2,5 % (2027) und 2,1 % (2028).
  - **Survey of Professional Forecasters (Q3 2026):** 2,7 %, 2,2 % und 2,0 %, langfristig 2,0 %.
- **Bewertung:** realistisch. +3 % für Kraftstoff liegen leicht über der allgemeinen Inflation, was zu einem steigenden CO₂-Preis passt. +1,5 % für Strom liegen unter der Inflation, also real leicht fallend. Gesamtwirtschaftlich ist das plausibel, die Details prüft der Energiepreis-Teil der Recherche.
- **Empfehlung:** Aus makroökonomischer Sicht beibehalten. Optionaler Hinweistext: „Zum Vergleich: Bundesbank und EZB erwarten für 2027/28 rund 2–2,7 % allgemeine Inflation.“
- **Quellen:**
  - [Deutschland-Prognose der Bundesbank: Energiepreis-Schock bremst Konjunkturerholung](https://www.bundesbank.de/de/presse/pressemitteilungen/deutschland-prognose-der-bundesbank-energiepreis-schock-bremst-konjunkturerholung-964728) – Deutsche Bundesbank, 12. Juni 2026
  - [EZB-Rat hebt Leitzinsen um 25 Basispunkte an (mit Projektionen vom September 2026)](https://www.bundesbank.de/de/aufgaben/themen/ezb-rat-hebt-leitzinsen-um-25-basispunkte-an-1008148) – Deutsche Bundesbank, 10. September 2026
  - [Ergebnisse des Survey of Professional Forecasters für das dritte Quartal 2026](https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.pr260724~a099353951.de.html) – Europäische Zentralbank, 24. Juli 2026

