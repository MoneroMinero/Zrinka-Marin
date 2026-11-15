# Zrinka i Marin — web (Next.js)

Stranica za fotografiju svečanosti, proslava i portreta. Napravljena u Next.js-u, spremna za Vercel.

## Što je gdje

| Što želiš promijeniti | Datoteka |
|---|---|
| Tekstove, telefone, email, Instagram/Facebook, WhatsApp | `lib/postavke.js` |
| Fotke | mape `public/fotke/svecanosti`, `public/fotke/proslave`, `public/fotke/portret` |
| Boje i fontove | `app/globals.css` (na vrhu, `:root`) |

## Dodavanje ili brisanje fotki

1. Ubaci (ili obriši) JPG fotke u odgovarajuću mapu u `public/fotke/...`.
   Najbolje da su dulje strane oko 1600–2400 px; Vercel ih sam smanji za mobitele.
2. Pokreni `npm run fotke` — to ponovno složi popis (`lib/fotke.json`).
   Prva fotka na popisu je naslovna slika kategorije; redoslijed možeš mijenjati ručno u tom fileu.
3. Spremi promjene na GitHub (commit + push) — Vercel sam objavi novu verziju za minutu-dvije.

## Lazy loading

Sve fotke idu kroz `next/image`: učitavaju se tek kad se približe ekranu, a Vercel automatski
šalje manje AVIF/WebP verzije prema veličini ekrana. Na naslovnici se prvih 6 fotki učita odmah
(da prvi ekran ne bude prazan), sve ostale lijeno. U povećanju (lightbox) se sljedeća fotka učita unaprijed.

## Google (SEO)

Sve je već postavljeno: naslovi i opisi za svaku stranicu, slike za dijeljenje (Facebook/WhatsApp),
`/sitemap.xml`, `/robots.txt`, kanonske adrese, alt tekstovi fotki i strukturirani podaci
(Google iz njih zna da ste fotografski obrt iz Zagreba, s telefonima i uslugama).
Opisi se mijenjaju u `lib/postavke.js` (`opis`, `opisKategorija`).

**Adresa weba:** dok je `adresaWeba` u `lib/postavke.js` prazna, koristi se Vercel adresa
(`xxx.vercel.app`). Kad dobiješ vlastitu domenu, upiši je tamo (npr. `"https://zrinkaimarin.hr"`).
Može i kao varijabla `NEXT_PUBLIC_SITE_URL` u Vercelu (Settings → Environment Variables).

**Google Search Console** (https://search.google.com/search-console):
1. Add property → **URL prefix** → upiši adresu weba.
2. Izaberi metodu **HTML tag**, kopiraj samo vrijednost iz `content="..."` i upiši je u
   `googleVerifikacija` u `lib/postavke.js` → push → pričekaj objavu → **Verify**.
3. Lijevo **Sitemaps** → upiši `sitemap.xml` → Submit.

**Google Business Profile** (https://business.google.com): napravi profil "Zrinka i Marin",
kategorija *Photographer* / *Wedding photographer*, područje usluge Zagreb i okolica (adresu možeš sakriti),
oba telefona i adresu weba. To je najvažnije za pretrage tipa "fotograf Zagreb" na Google Mapama.

## Pokretanje na svom računalu (nije obavezno)

Treba ti Node.js 20 ili noviji (https://nodejs.org).

```
npm install
npm run dev
```

pa otvori http://localhost:3000

## Objava na Vercel

1. Napravi (besplatan) račun na https://vercel.com — najlakše "Continue with GitHub".
2. Klikni **Add New… → Project**, izaberi GitHub repozitorij s ovim projektom i klikni **Import**.
3. Ništa ne mijenjaj (Vercel sam prepozna Next.js) i klikni **Deploy**.
4. Za minutu-dvije dobiješ adresu tipa `zrinka-i-marin.vercel.app`.
5. Vlastitu domenu dodaš u projektu: **Settings → Domains**.

Svaki push na GitHub automatski objavi novu verziju.
