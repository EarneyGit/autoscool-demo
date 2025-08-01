declare module 'instafeed.js' {
  interface InstafeedOptions {
    accessToken: string;
    target: HTMLElement;
    limit?: number;
    template?: string;
    transform?: (item: Record<string, unknown>) => Record<string, unknown>;
    success?: () => void;
    error?: (message: string) => void;
  }

  class Instafeed {
    constructor(options: InstafeedOptions);
    run(): void;
    destroy(): void;
  }

  export default Instafeed;
}