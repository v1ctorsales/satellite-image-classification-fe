import { useState } from "react";
import DropZone from "../components/DropZone";
import SettingsModal from "../components/SettingsModal";
import ResultCard from "../components/ResultCard";
import { classifyImage } from "../services/api";
import styles from "./Home.module.css";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [model, setModel] = useState("blackbox");
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(files) {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const responses = await Promise.all(
        files.map(async (file) => {
          const data = await classifyImage(file, model);
          return { ...data, preview: URL.createObjectURL(file) };
        }),
      );
      setResults(responses);
    } catch {
      setError("Error contacting server. Check if the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  const MODEL_LABELS = {
    blackbox: "Black Box",
    whitebox: "White Box",
    compare: "Compare",
  };

  return (
    <div className={styles.page}>
      {" "}
      <header className={styles.header}>
        <div className={styles.badge}>ML · Remote Sensing</div>{" "}
        <h1 className={styles.title}>
          Satellite Image <br /> Classification{" "}
        </h1>{" "}
        <p className={styles.subtitle}>
          Upload satellite images to get automatic terrain classification.{" "}
        </p>{" "}
      </header>{" "}
      <main className={styles.main}>
        {" "}
        <DropZone
          onSubmit={handleSubmit}
          loading={loading}
          model={model}
          onOpenSettings={() => setShowModal(true)}
        />
        {error && <div className={styles.error}>{error}</div>}{" "}
        {results.length > 0 && (
          <section className={styles.results}>
            {" "}
            <h2 className={styles.resultsTitle}>
              Results ·{" "}
              <span style={{ fontWeight: 400 }}>
                {MODEL_LABELS[model]}
              </span>{" "}
            </h2>{" "}
            <div className={styles.resultsList}>
              {" "}
              {results.map((r, i) => (
                <ResultCard key={i} result={r} />
              ))}{" "}
            </div>{" "}
          </section>
        )}{" "}
      </main>{" "}
      <footer className={styles.footer}>
        satellite-image-classification · {new Date().getFullYear()}{" "}
      </footer>{" "}
      {showModal && (
        <SettingsModal
          selected={model}
          onChange={setModel}
          onClose={() => setShowModal(false)}
        />
      )}{" "}
    </div>
  );
}
