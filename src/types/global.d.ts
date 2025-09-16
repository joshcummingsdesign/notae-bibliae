declare global {
  interface Window {
    BGLinks?: {
      version: string;
      linkVerses: () => void;
    };
  }
}

export {};
