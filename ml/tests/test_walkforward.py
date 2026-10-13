import pandas as pd
import numpy as np
from ml.utils import walk_forward_cv
from sklearn.ensemble import GradientBoostingClassifier


def fake_candles(n=200):
    dates = pd.date_range("2020-01-01", periods=n)
    close = np.cumsum(np.random.randn(n)) + 100
    o = close - np.random.rand(n)
    h = close + np.random.rand(n)
    l = close - np.random.rand(n)
    vol = np.random.randint(100, 1000, size=n)
    return pd.DataFrame({"date": dates, "open": o, "high": h, "low": l, "close": close, "volume": vol})


def test_walk_forward_runs():
    df = fake_candles(300)
    from ml.features import compute_features
    X, y = compute_features(df)
    res = walk_forward_cv(X, y, model=GradientBoostingClassifier(n_estimators=10), purge_days=2)
    assert "predictions" in res
    assert len(res["predictions"]) == len(y)
