"""
Train script for dhru.ltd prediction engine.

- Uses OHLCV CSV or REST-provided data.
- Extracts technical features: EMA, RSI, MACD, ATR, volume features.
- Uses walk-forward (expanding window) evaluation with purged labels to avoid leakage.
- Compares model (e.g., GradientBoostingClassifier) against base rate baseline.
- Computes accuracy, Brier score, and calibration bins.
- Saves best model to ./models/model.pkl and an evaluation JSON.

Usage:
  python train.py --candles ./data/BOM_EQ_RELIANCE.csv
"""
import argparse
import json
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.calibration import calibration_curve
from sklearn.metrics import brier_score_loss, accuracy_score
import joblib
from features import compute_features
from utils import walk_forward_cv


def evaluate_model(candles_df):
    X, y = compute_features(candles_df)  # returns features dataframe and binary label (1=up next day)
    # Walk-forward evaluation with purged labels
    results = walk_forward_cv(X, y, model=GradientBoostingClassifier(n_estimators=100), purge_days=2)
    # results: per-fold predictions, probabilities, metrics
    # Compare to base-rate baseline
    base_rate = np.nanmean(y)
    # build full arrays for probabilities and predictions
    probs = results["probabilities"]
    preds = results["predictions"]
    # For baseline, use constant probability = base_rate on test indices
    baseline_probs = np.full_like(probs, base_rate, dtype=float)
    # Compute metrics on non-nan positions
    mask = ~np.isnan(probs)
    brier_model = float(brier_score_loss(y[mask], probs[mask]))
    brier_baseline = float(brier_score_loss(y[mask], baseline_probs[mask]))
    acc_model = float(accuracy_score(y[mask], preds[mask]))
    acc_baseline = float(accuracy_score(y[mask], (baseline_probs[mask] > 0.5).astype(int)))

    # Determine validation
    validated = (brier_model < brier_baseline) and (acc_model >= acc_baseline)

    # Calibration bins
    prob_true, prob_pred = calibration_curve(y[mask], probs[mask], n_bins=10)

    eval_obj = {
        "brier_model": brier_model,
        "brier_baseline": brier_baseline,
        "acc_model": acc_model,
        "acc_baseline": acc_baseline,
        "validated": bool(validated),
        "calibration": {
            "prob_pred": prob_pred.tolist(),
            "prob_true": prob_true.tolist()
        }
    }
    return results, eval_obj


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--candles", required=True)
    args = parser.parse_args()
    df = pd.read_csv(args.candles, parse_dates=["date"])[:]
    results, eval_obj = evaluate_model(df)
    import os
    os.makedirs("models", exist_ok=True)
    joblib.dump(results["model"], "models/model.pkl")
    with open("models/eval.json", "w") as f:
        json.dump(eval_obj, f, indent=2)
    print("Saved model and evaluation.")
