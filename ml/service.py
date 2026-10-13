from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import json
import os
from features import compute_features_from_last

app = FastAPI()
MODEL_PATH = "models/model.pkl"
EVAL_PATH = "models/eval.json"
model = None
eval_info = {"validated": False}
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
if os.path.exists(EVAL_PATH):
    with open(EVAL_PATH) as f:
        eval_info = json.load(f)

class PredictReq(BaseModel):
    symbol: str
    candles: list

@app.post("/predict")
def predict(req: PredictReq):
    # compute features for latest sample only
    try:
        features = compute_features_from_last(req.candles)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    if model is None or not eval_info.get("validated", False):
        # honest behavior: if model missing or not validated, return neutral
        return {"status": "not_validated", "reason": "model_not_validated", "data_age": "unknown"}
    prob = float(model.predict_proba(features)[0, 1])
    pred = 1 if prob > 0.5 else 0
    return {
      "status": "ok",
      "direction": "bullish" if pred==1 else "bearish",
      "probability_up": prob,
      "confidence": prob,
      "supporting_reasons": [],
      "data_age": "latest",
      "model_info": {"eval": eval_info}
    }
