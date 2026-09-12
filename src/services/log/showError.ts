import * as Sentry from '@sentry/react-native';

interface ShowErrorParams {
  file: string;
  operation: string;
  error: unknown;
}

const showError = ({ file, operation, error }: ShowErrorParams): void => {
  if (__DEV__) {
    console.error(`[${file}] ${operation}:`, error);
  } else {
    Sentry.captureException(error, {
      tags: { file, operation },
    });
  }
};

export default showError;