import { fetchJson } from "./api";

const API_URL = "https://api.frankfurter.dev/v1";

export function getCurrencies() {
  const url = new URL(`${API_URL}/currencies`);

  return fetchJson(url);
}

export function getRate(base, quote) {
  const url = new URL(`${API_URL}/latest`);

  url.searchParams.set("base", base);
  url.searchParams.set("symbols", quote);

  return fetchJson(url);
}

export function getHistoricalRates(base, quote, from, to) {
  const url = new URL(`${API_URL}/${from}..${to}`);

  url.searchParams.set("base", base);
  url.searchParams.set("symbols", quote);

  return fetchJson(url);
}
