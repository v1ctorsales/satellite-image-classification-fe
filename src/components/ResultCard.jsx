import styles from "./ResultCard.module.css";

const CLASS_COLORS = {
  Agriculture: "#b48a00",
  Vegetation: "#15803d",
  Urban: "#a10000",
  Water: "#0891b2",
};

function ProbBars({ probabilities, winner }) {
  return (
    <div className={styles.probs}>
      {Object.entries(probabilities)
        .sort(([, a], [, b]) => b - a)
        .map(([cls, prob]) => (
          <div className={styles.probRow} key={cls}>
            <span className={styles.probLabel}>{cls}</span>
            <div className={styles.probBarBg}>
              <div
                className={styles.probBar}
                style={{
                  width: `${(prob * 100).toFixed(1)}%`,
                  background: cls === winner ? CLASS_COLORS[cls] : "#d1d5db",
                }}
              />
            </div>
            <span className={styles.probValue}>{(prob * 100).toFixed(1)}%</span>
          </div>
        ))}
    </div>
  );
}

function ModelResult({ result, title }) {
  return (
    <div className={styles.modelBlock}>
      {title && <span className={styles.modelTitle}>{title}</span>}
      <div
        className={styles.badge}
        style={{
          background: CLASS_COLORS[result.label] + "18",
          color: CLASS_COLORS[result.label],
        }}
      >
        {result.label} · {(result.confidence * 100).toFixed(1)}%
      </div>
      {result.probabilities && (
        <ProbBars probabilities={result.probabilities} winner={result.label} />
      )}
    </div>
  );
}

export default function ResultCard({ result }) {
  const isCompare = !!(result.blackbox && result.whitebox);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={result.preview}
          alt={result.filename}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <span className={styles.filename}>{result.filename}</span>

        {isCompare ? (
          <div className={styles.compareGrid}>
            <ModelResult result={result.blackbox} title="Black Box" />
            <ModelResult result={result.whitebox} title="White Box" />
          </div>
        ) : (
          <ModelResult result={result} />
        )}
      </div>
    </div>
  );
}
