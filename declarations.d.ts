declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'google-translate-api-browser' {
  interface ITranslateOptions {
    to: string;
    from: string;
    corsUrl: string;
  }

  interface ITranslationResult {
    text: string;
    pronunciation: string;
    from: {
      language: {
        didYouMean: boolean;
        iso: string;
      };
      text: {
        autoCorrected: boolean;
        value: string;
        didYouMean: string;
      };
    };
    raw?: any;
  }

  export function translate(text: string, options?: ITranslateOptions): Promise<ITranslationResult>;
}
