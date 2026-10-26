import type { VitalTrend } from "lib/fitbit/trend";
import { formatCount } from "lib/format";

type VitalsHudProps = {
  restingHeartRate: number | undefined;
  averageDailySteps: number;
  heartTrend?: VitalTrend;
  stepsTrend?: VitalTrend;
};

function TrendMark({ trend, label }: { trend?: VitalTrend; label: string }) {
  if (!trend || trend === "flat") {
    return (
      <span className="home-vitals__trend home-vitals__trend--flat" aria-hidden>
        ·
      </span>
    );
  }

  const up = trend === "up";
  return (
    <span
      className={
        up
          ? "home-vitals__trend home-vitals__trend--up"
          : "home-vitals__trend home-vitals__trend--down"
      }
      aria-label={`${label} trending ${trend}`}
      title={`${label} ${trend}`}
    >
      {up ? "↑" : "↓"}
    </span>
  );
}

/** Compact game-style vitals readout — Fitbit as HUD, not a marketing strip. */
export function VitalsHud({
  restingHeartRate,
  averageDailySteps,
  heartTrend,
  stepsTrend,
}: VitalsHudProps) {
  const hasHeart = restingHeartRate != null && restingHeartRate > 0;
  const hasSteps = averageDailySteps > 0;

  if (!hasHeart && !hasSteps) return null;

  // Soft caps for the meter fills — lived-in, not gamified grind.
  const heartFill = hasHeart
    ? Math.min(100, Math.round(((restingHeartRate ?? 0) / 90) * 100))
    : 0;
  const stepsFill = hasSteps
    ? Math.min(100, Math.round((averageDailySteps / 10000) * 100))
    : 0;

  return (
    <div className="home-vitals" aria-label="Fitbit vitals">
      <p className="home-vitals__label">Vitals</p>
      <div className="home-vitals__panel">
        {hasHeart ? (
          <div className="home-vitals__row">
            <span className="home-vitals__key">HR</span>
            <div
              className="home-vitals__bar"
              role="meter"
              aria-valuenow={restingHeartRate}
              aria-valuemin={0}
              aria-valuemax={90}
              aria-label={`Resting heart rate ${restingHeartRate} bpm`}
            >
              <span
                className="home-vitals__fill home-vitals__fill--heart"
                style={{ width: `${heartFill}%` }}
              />
            </div>
            <span className="home-vitals__val">
              {restingHeartRate}
              <span className="home-vitals__unit">bpm</span>
              <TrendMark trend={heartTrend} label="Resting heart rate" />
            </span>
          </div>
        ) : null}

        {hasSteps ? (
          <div className="home-vitals__row">
            <span className="home-vitals__key">STP</span>
            <div
              className="home-vitals__bar"
              role="meter"
              aria-valuenow={averageDailySteps}
              aria-valuemin={0}
              aria-valuemax={10000}
              aria-label={`Average daily steps (7 day) ${averageDailySteps}`}
            >
              <span
                className="home-vitals__fill home-vitals__fill--steps"
                style={{ width: `${stepsFill}%` }}
              />
            </div>
            <span className="home-vitals__val">
              {formatCount(averageDailySteps)}
              <span className="home-vitals__unit">steps</span>
              <TrendMark trend={stepsTrend} label="Daily steps (7 day)" />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
