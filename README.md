# PlaceMentor AI - ML Module

This folder contains the ML/intelligence layer for PlaceMentor AI.

## Current modules

- `readiness_model.py` - transparent placement-readiness score
- `placement_model.py` - conservative placement-probability estimate
- `skill_gap.py` - required-skill vs student-skill comparison
- `roadmap.py` - learning roadmap generated from skill gaps
- `xai.py` - feature-contribution explanation
- `ml_pipeline.py` - combines all ML outputs into one student report

## Run the complete ML report

From the project root:

```powershell
python mlmodel/ml_pipeline.py 1
```

For a company-specific report:

```powershell
python mlmodel/ml_pipeline.py 1 1
```

## Important limitation

The current SQLite database contains only a very small number of students and
applications. Therefore the placement-probability component is intentionally
implemented as a baseline estimate rather than being presented as a trained,
high-accuracy classifier.

When historical placement data becomes sufficiently large, replace the
baseline in `placement_model.py` with a trained scikit-learn classifier using
features such as CGPA, skill proficiency, project count, coding score,
resume score, and historical application outcomes.
