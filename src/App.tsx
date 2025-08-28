import { useState } from "react";
import { scanWithNative } from "./scanner/nativeScanner";
import "./App.css";

function App() {
  const [status, setStatus] = useState<string>("Idle");
  const [value, setValue] = useState<string>("");

  const handleScan = async () => {
    setStatus("Opening scanner...");
    setValue("");
    try {
      const result = await scanWithNative();
      setStatus("Success");
      setValue(result);
    } catch (err: any) {
      setStatus(err?.message ?? "Failed");
    }
  };

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h1>Native Scanner Demo</h1>

      <button onClick={handleScan} style={{ padding: "8px 16px" }}>
        Scan QR / Barcode
      </button>

      <div style={{ marginTop: 16 }}>
        <div><b>Status:</b> {status}</div>
        {value && <div style={{ marginTop: 8 }}>
          <b>Scanned:</b> <code>{value}</code>
        </div>}
      </div>

      {!window.Android && (
        <p style={{ marginTop: 24, color: "gray" }}>
          Tip: window.Android not found. This page needs to run inside the Android app WebView.
        </p>
      )}
    </div>
  );
}

export default App;
