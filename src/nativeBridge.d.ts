declare global {
  interface Window {
    Android?: { openScanner: () => void };
    onScanResult?: (data: string) => void;
    onScanCancel?: () => void;
  }
}
export {};
