import numpy as np
from sklearn.base import clone


def walk_forward_cv(X, y, model, purge_days=2, initial_train_frac=0.5, test_frac=0.1):
    """
    Simple walk-forward expanding-window CV with label purging.
    - X: numpy array (n_samples, n_features)
    - y: numpy array (n_samples,)
    Returns dict with full-length arrays of predictions/probabilities (nan where not tested) and last model.
    """
    n = len(y)
    if n < 50:
        # fallback: train on all and predict in-sample (not ideal)
        m = clone(model)
        m.fit(X, y)
        probs = np.full(n, np.nan)
        preds = np.full(n, np.nan)
        return {"predictions": preds, "probabilities": probs, "model": m}

    initial = max(10, int(initial_train_frac * n))
    test_size = max(1, int(test_frac * n))
    probs = np.full(n, np.nan)
    preds = np.full(n, np.nan)
    last_model = None
    train_end = initial
    while train_end + test_size <= n:
        test_start = train_end
        test_end = min(n, test_start + test_size)
        # purge: remove last `purge_days` rows from training to avoid leakage
        purge = purge_days
        train_indices = list(range(0, max(0, train_end - purge)))
        if len(train_indices) < 5:
            train_end += test_size
            continue
        X_train = X[train_indices]
        y_train = y[train_indices]
        X_test = X[test_start:test_end]
        y_test = y[test_start:test_end]
        m = clone(model)
        try:
            m.fit(X_train, y_train)
            p = m.predict_proba(X_test)[:, 1]
            pr = (p > 0.5).astype(int)
        except Exception:
            p = np.full(len(y_test), np.nan)
            pr = np.full(len(y_test), np.nan)
        probs[test_start:test_end] = p
        preds[test_start:test_end] = pr
        last_model = m
        train_end += test_size
    return {"predictions": preds, "probabilities": probs, "model": last_model}
