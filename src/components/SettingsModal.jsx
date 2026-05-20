import styles from "./SettingsModal.module.css";

const OPTIONS = [
  {
    id: "blackbox",
    label: "Black Box",
    description: "Random Forest — high accuracy, opaque decision",
  },
  {
    id: "whitebox",
    label: "White Box",
    description: "Interpretable model — explainable decision",
  },
  {
    id: "compare",
    label: "Compare both",
    description: "Runs both models and shows the results side by side",
  },
];

export default function SettingsModal({ selected, onChange, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      {" "}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {" "}
        <div className={styles.header}>
          <span className={styles.title}>Classification model</span>{" "}
          <button className={styles.close} onClick={onClose}>
            ×{" "}
          </button>{" "}
        </div>{" "}
        <div className={styles.options}>
          {" "}
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`${styles.option} ${selected === opt.id ? styles.active : ""}`}
              onClick={() => {
                onChange(opt.id);
                onClose();
              }}
            >
              <span className={styles.optLabel}>{opt.label}</span>{" "}
              <span className={styles.optDesc}>{opt.description}</span>{" "}
            </button>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
