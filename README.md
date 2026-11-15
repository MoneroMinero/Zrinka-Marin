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

**Adresa weba:** upisuje se na jednom mjestu, `adresaWeba` u `lib/postavke.js`
(vidi "Prelazak na vlastitu domenu" niže).

**Google Search Console** (https://search.google.com/search-console):
1. Add property → **URL prefix** → upiši adresu weba.
2. Izaberi metodu **HTML tag**, kopiraj samo vrijednost iz `content="..."` i upiši je u
   `googleVerifikacija` u `lib/postavke.js` → push → pričekaj objavu → **Verify**.
3. Lijevo **Sitemaps** → upiši `sitemap.xml` → Submit.

**Google Business Profile** (https://business.google.com): napravi profil "Zrinka i Marin",
kategorija *Photographer* / *Wedding photographer*, područje usluge Zagreb i okolica (adresu možeš sakriti),
oba telefona i adresu weba. To je najvažnije za pretrage tipa "fotograf Zagreb" na Google Mapama.

## Prelazak na vlastitu domenu

Stranica je pripremljena tako da se domena upisuje na **jednom mjestu**: `adresaWeba` u `lib/postavke.js`.
Iz te adrese se sami slažu kanonske adrese stranica, `sitemap.xml`, `robots.txt`, slike za dijeljenje
i strukturirani podaci za Google.

1. Kupi domenu (npr. kod hrvatskog registra za `.hr`, ili Namecheap / Cloudflare / Vercel za `.com`).
2. Vercel → projekt **zrinka-marin** → **Settings → Domains → Add**: dodaj `tvojadomena.hr` i `www.tvojadomena.hr`.
   Jednu označi kao glavnu (Primary), a druga neka preusmjerava na nju.
3. Kod prodavača domene upiši DNS zapise koje ti Vercel pokaže na toj stranici. Obično su to:
   - zapis **A** za `@` → IP adresa koju prikaže Vercel (npr. `76.76.21.21`)
   - zapis **CNAME** za `www` → vrijednost koju prikaže Vercel (npr. `cname.vercel-dns.com`)
   Uvijek prepiši točne vrijednosti iz Vercela. Kad uz domenu piše **Valid Configuration**, radi (od par minuta do nekoliko sati).
   HTTPS certifikat Vercel napravi sam.
4. U `lib/postavke.js` promijeni `adresaWeba` u novu glavnu adresu, točno kako je u Vercelu
   (s `www` ili bez), npr. `"https://tvojadomena.hr"`, i spremi na GitHub.
5. Gotovo. Stara adresa `zrinka-marin.vercel.app` (popis `stareAdrese`) od tog trenutka trajno
   preusmjerava na novu, uključujući podstranice, pa stari linkovi i dalje rade.
6. Google Search Console: dodaj novu adresu kao novi property i pošalji `sitemap.xml` (koraci gore).

Napomena: Vercelov besplatni plan (Hobby) je po njihovim pravilima za nekomercijalnu upotrebu.
Za poslovnu stranicu Vercel traži plan Pro; domena radi jednako na oba.

## Brzina

- Fotke idu kroz `next/image`: lazy loading, automatski AVIF/WebP u veličini ekrana, pamte se 31 dan.
- Fontovi se poslužuju s vlastite domene; kurziv se učitava samo na Contact stranici.
- Naslovnica na mobitelu se prikaže tek kad je složena u 2 stupca, pa fotke ne skaču (CLS 0).
- Stranica 404 je u stilu weba; sigurnosna zaglavlja su u `next.config.mjs`.

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
5. Vlastitu domenu dodaš prema uputama "Prelazak na vlastitu domenu" gore.

Svaki push na GitHub automatski objavi novu verziju.
