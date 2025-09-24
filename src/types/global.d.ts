declare global {
  interface Window {
    BGLinks?: {
      version: string;
      linkVerses: () => void;
    };
    mermaid?: {
      initialize: (config: any) => void;
      contentLoaded: () => void;
    };
  }
}

export {};
