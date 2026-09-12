import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Sentry from '@sentry/react-native';
import { View, Text } from 'react-native';
import createTutorTable from '../src/services/tables/createTutorTable';

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 1.0,
  });
} else {
  console.warn('[Sentry] EXPO_PUBLIC_SENTRY_DSN não definido em .env.local — captura de erros desativada.');
}

const tabelaCriada = createTutorTable();

function RootLayout() {
  if (tabelaCriada === false) {
    return <View>
            <Text>
              Não foi possível iniciar o app.
            </Text>
          </View>;
  }

  return (
    <>
      <Stack />
      <StatusBar style="auto" />
    </>
  );
}

export default dsn ? Sentry.wrap(RootLayout) : RootLayout;
