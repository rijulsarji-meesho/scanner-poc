export function scanWithNative(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.Android?.openScanner) {
      reject(
        new Error(
          "Native scanner unavailable (window.Android.openScanner missing)"
        )
      );
      return;
    }

    const cleanup = () => {
      delete window.onScanResult;
      delete window.onScanCancel;
    };

    window.onScanResult = (data: string) => {
      cleanup();
      resolve(data);
    };
    window.onScanCancel = () => {
      cleanup();
      reject(new Error("Scan cancelled"));
    };

    try {
      window.Android.openScanner();
    } catch (e) {
      cleanup();
      reject(e instanceof Error ? e : new Error(String(e)));
    }
  });
}
