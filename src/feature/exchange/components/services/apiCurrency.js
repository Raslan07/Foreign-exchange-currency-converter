import { fetchJson } from "./api";



const API_URL = "https://api.frankfurter.dev/v2";

export function getCurrencies() {
  const url = new URL(`${API_URL}/currencies`);

  return fetchJson(url);
}

export function getRate(base, quote) {
  const url = new URL(`${API_URL}/rate/${base}/${quote}`);

  return fetchJson(url);
}

export function getHistoricalRates(
  base,
  quote,
  from,
  to
) {
  const url = new URL(`${API_URL}/rates`);

  url.searchParams.set("base", base);
  url.searchParams.set("quotes", quote);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  return fetchJson(url);
}

























const url = new URL("https://api.frankfurter.dev/v2/rates");

const params = new URLSearchParams({
    base: "EUR",
    quotes: "USD",
    from: "2026-06-28",
    to: "2026-07-28",
});

url.search = params

console.log(url.protocol)
console.log(url.hostname)
console.log(url.pathname)
console.log(url.searchParams)

console.log(url.toString());