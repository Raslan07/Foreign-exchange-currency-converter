import { useEffect, useMemo, useRef, useState } from "react";
import { getCurrencies, getRate } from "../services/apiCurrency";
import styles from "./CurrencyConverter.module.css";

const POPULAR_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"];
const FLAG_OVERRIDES = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  CAD: "ca",
  AUD: "au",
  CHF: "ch",
  CNY: "cn",
  HKD: "hk",
  SGD: "sg",
  SEK: "se",
  NOK: "no",
  DKK: "dk",
  PLN: "pl",
  CZK: "cz",
  HUF: "hu",
  BGN: "bg",
  RON: "ro",
  TRY: "tr",
  AED: "ae",
  SAR: "sa",
  EGP: "eg",
  MAD: "ma",
  INR: "in",
  PKR: "pk",
  BHD: "bh",
  QAR: "qa",
  KWD: "kw",
  OMR: "om",
  IDR: "id",
  MYR: "my",
  THB: "th",
  VND: "vn",
  PHP: "ph",
  KRW: "kr",
  TWD: "tw",
  NZD: "nz",
  MXN: "mx",
  BRL: "br",
  CLP: "cl",
  COP: "co",
  PEN: "pe",
  ARS: "ar",
  UAH: "ua",
  ZAR: "za",
  NGN: "ng",
  KES: "ke",
  GHS: "gh",
};
const FLAG_SOURCES = import.meta.glob("/src/assets/*.webp", {
  eager: true,
  import: "default",
});

const formatAmount = (value) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(value);

const formatDisplayAmount = (value) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);

const getFlagSrc = (code) => {
  const normalizedCode = FLAG_OVERRIDES[code] ?? code.slice(0, 2).toLowerCase();
  const assetUrl = FLAG_SOURCES[`/src/assets/${normalizedCode}.webp`];

  return assetUrl ?? FLAG_SOURCES["/src/assets/us.webp"];
};

export default function CurrencyConverter() {
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("EUR");
  const [sendAmount, setSendAmount] = useState(1000);
  const [currencyList, setCurrencyList] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [pickerTarget, setPickerTarget] = useState(null);
  const [rateData, setRateData] = useState(null);
  const [rateError, setRateError] = useState(null);
  const pickerRef = useRef(null);

  const currencyEntries = useMemo(
    () =>
      Object.entries(currencyList).map(([code, details]) => [
        code,
        typeof details === "string" ? details : details?.name ?? code,
      ]),
    [currencyList],
  );

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const allCurrencies = await getCurrencies();
        const normalizedCurrencies = Object.fromEntries(
          Object.entries(allCurrencies).map(([code, details]) => [
            code,
            typeof details === "string" ? details : details?.name ?? code,
          ]),
        );

        setCurrencyList(normalizedCurrencies);
      } catch {
        setCurrencyList({
          USD: "US Dollar",
          EUR: "Euro",
          GBP: "British Pound Sterling",
          JPY: "Japanese Yen",
          CAD: "Canadian Dollar",
          AUD: "Australian Dollar",
          CHF: "Swiss Franc",
          CNY: "Chinese Yuan",
        });
      }
    }

    loadCurrencies();
  }, []);

  useEffect(() => {
    function handlePointerDown(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setPickerTarget(null);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);

    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    async function fetchRate() {
      try {
        setRateError(null);
        const response = await getRate(sendCurrency, receiveCurrency);
        setRateData(response);
      } catch (caughtError) {
        setRateError(caughtError);
      }
    }

    if (sendCurrency && receiveCurrency) {
      fetchRate();
    }
  }, [sendCurrency, receiveCurrency]);

  const matcher = useMemo(() => {
    const value = searchValue.trim().toLowerCase();

    return currencyEntries.filter(([code, name]) => {
      if (!value) return true;

      return code.toLowerCase().includes(value) || name.toLowerCase().includes(value);
    });
  }, [currencyEntries, searchValue]);

  const popularCurrencies = useMemo(
    () => matcher.filter(([code]) => POPULAR_CURRENCIES.includes(code)),
    [matcher],
  );
  const otherCurrencies = useMemo(
    () => matcher.filter(([code]) => !POPULAR_CURRENCIES.includes(code)),
    [matcher],
  );

  const rate = Number(rateData?.rates?.[receiveCurrency] ?? 0);

  const calculatedReceive = Number.isFinite(sendAmount) && rate
    ? sendAmount * rate
    : 0;


  const activeRateLabel = rate
    ? `1 ${sendCurrency} = ${rate.toFixed(4)} ${receiveCurrency}`
    : "Live rate unavailable";

  const togglePicker = (target) => {
    setPickerTarget((currentTarget) => (currentTarget === target ? null : target));
  };

  const closePicker = () => setPickerTarget(null);

  const handlePickerSelect = (code) => {
    if (pickerTarget === "send") {
      setSendCurrency(code);
    }

    if (pickerTarget === "receive") {
      setReceiveCurrency(code);
    }

    closePicker();
    setSearchValue("");
  };

  const handleSwap = () => {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
  };

  return (
    <section className={styles.currencyCon}>
      <h3>CHECK THE RATE</h3>
      <main className={styles.converterField}>
        <div className={styles.sendField}>
          {/* Send Input Group */}
          <div className={styles.inputGroup}>
            <label htmlFor="send-amount" className={styles.label}>SEND</label>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                id="send-amount" 
                value={formatDisplayAmount(sendAmount)}
                onChange={(event) => {
                  const digitsOnly = event.target.value.replace(/[^\d]/g, "");
                  const nextValue = digitsOnly ? Number.parseInt(digitsOnly, 10) : 0;

                  setSendAmount(nextValue);
                }}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.currencySelect}
                onClick={() => togglePicker("send")}
                aria-haspopup="dialog"
                aria-expanded={pickerTarget === "send"}
              >
                <img className={styles.flagImage} src={getFlagSrc(sendCurrency)} alt={sendCurrency} />
                <span>{sendCurrency}</span>
                <span className={styles.dropdownArrow}>▼</span>
              </button>
            </div>
          </div>

          <button type="button" className={styles.swapBtn} onClick={handleSwap} aria-label="Swap currencies">
            ⇄
          </button>

          {/* Receive Input Group */}
          <div className={styles.inputGroup}>
            <label htmlFor="receive-amount" className={styles.label}>RECEIVE</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="receive-amount"
                value={formatAmount(calculatedReceive)}
                className={styles.input}
                readOnly
              />
              <button
                type="button"
                className={styles.currencySelect}
                onClick={() => togglePicker("receive")}
                aria-haspopup="dialog"
                aria-expanded={pickerTarget === "receive"}
              >
                <img className={styles.flagImage} src={getFlagSrc(receiveCurrency)} alt={receiveCurrency} />
                <span>{receiveCurrency}</span>
                <span className={styles.dropdownArrow}>▼</span>
              </button>
            </div>
          </div>
        </div>

        {pickerTarget && (
          <div className={styles.currencyPopover} ref={pickerRef}>
            <div className={styles.popoverHeader}>
              <input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search currencies"
                className={styles.searchInput}
                aria-label="Search currencies"
              />
            </div>

            <div className={styles.currencyGroup}>
              <h4 className={styles.groupTitle}>Popular</h4>
              <ul className={styles.currencyList}>
                {popularCurrencies.map(([code, name]) => (
                  <li key={code}>
                    <button
                      type="button"
                      className={styles.currencyOption}
                      onClick={() => handlePickerSelect(code)}
                    >
                      <span className={styles.currencyOptionMain}>
                        <img className={styles.flagImage} src={getFlagSrc(code)} alt={name} />
                        <span className={styles.currencyCode}>{code}</span>
                        <span className={styles.currencyName}>{name}</span>
                      </span>
                      {code === (pickerTarget === "send" ? sendCurrency : receiveCurrency) && (
                        <span className={styles.selectedMark}>✓</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.currencyGroup}>
              <h4 className={styles.groupTitle}>Other currencies</h4>
              <ul className={styles.currencyList}>
                {otherCurrencies.map(([code, name]) => (
                  <li key={code}>
                    <button
                      type="button"
                      className={styles.currencyOption}
                      onClick={() => handlePickerSelect(code)}
                    >
                      <span className={styles.currencyOptionMain}>
                        <img className={styles.flagImage} src={getFlagSrc(code)} alt={name} />
                        <span className={styles.currencyCode}>{code}</span>
                        <span className={styles.currencyName}>{name}</span>
                      </span>
                      {code === (pickerTarget === "send" ? sendCurrency : receiveCurrency) && (
                        <span className={styles.selectedMark}>✓</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className={styles.splittedLine}></div>

        <div className={styles.converterFooter}>
          <span className={styles.rateInfo}>
            {rateError ? "Live rate unavailable" : activeRateLabel}
          </span>

          <div className={styles.actionButtons}>
            <button type="button" className={styles.btnFavorited}>
              <span className={styles.starIcon}>★</span> FAVORITED
            </button>

            <button type="button" className={styles.btnLog}>
              LOG CONVERSION
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
