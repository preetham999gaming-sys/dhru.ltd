import pandas as pd
import numpy as np


def compute_rsi(series, period=14):
    delta = series.diff()
    up = delta.clip(lower=0)
    down = -1 * delta.clip(upper=0)
    ma_up = up.ewm(alpha=1/period, adjust=False).mean()
    ma_down = down.ewm(alpha=1/period, adjust=False).mean()
    rs = ma_up / (ma_down + 1e-8)
    return 100 - (100 / (1 + rs))


def compute_features(df):
    # expects columns: date, open, high, low, close, volume
    df = df.copy().sort_values("date").reset_index(drop=True)
    df["ema_10"] = df["close"].ewm(span=10, adjust=False).mean()
    df["ema_50"] = df["close"].ewm(span=50, adjust=False).mean()
    df["rsi_14"] = compute_rsi(df["close"], 14)
    df["macd"] = df["close"].ewm(span=12, adjust=False).mean() - df["close"].ewm(span=26, adjust=False).mean()
    df["atr"] = (df["high"] - df["low"]).rolling(window=14).max().fillna(0)
    df["vol_avg"] = df["volume"].rolling(window=20).mean().fillna(0)
    # label: whether next-day close > today close
    df["label"] = (df["close"].shift(-1) > df["close"]).astype(int)
    # drop last row which has no label
    features = df.dropna().copy()
    X = features[["ema_10", "ema_50", "rsi_14", "macd", "atr", "vol_avg"]].fillna(0).values
    y = features["label"].values
    return X, y


def compute_features_from_last(candles: list):
    # candles: list of dicts with keys date, open, high, low, close, volume
    df = pd.DataFrame(candles)
    if df.empty:
        raise ValueError("no candles provided")
    X, y = compute_features(df)
    # return last feature vector as 2D array
    return X[-1:].astype(float)
