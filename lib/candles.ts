export async function fetchCandles(symbol: string, interval = "1d", limit = 500) {
  if (!process.env.CANDLE_API_URL) {
    throw new Error("CANDLE_API_NOT_CONFIGURED");
  }
  const url = `${process.env.CANDLE_API_URL}/candles?symbol=${encodeURIComponent(symbol)}&interval=${interval}&limit=${limit}`;
  const headers: any = {};
  if (process.env.CANDLE_API_KEY) headers["x-api-key"] = process.env.CANDLE_API_KEY;
  const resp = await fetch(url, { headers });
  if (!resp.ok) throw new Error("CANDLE_FETCH_FAILED");
  return await resp.json();
}
