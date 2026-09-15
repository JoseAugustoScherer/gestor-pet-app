import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Sentry from '@sentry/react-native';
import { View, Text } from 'react-native';
import createTutorTable from '../src/services/tables/createTutorTable';
import createPetTable from '../src/services/tables/createPetTable';
import createTutorPetTable from '../src/services/tables/createTutorPetTable';
import showError from '../src/services/log/showError';

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 1.0,
  });
} else {
  console.warn('[Sentry] EXPO_PUBLIC_SENTRY_DSN não definido em .env.local — captura de erros desativada.');
}

const createTable = () => {
  try {
    const tutorOk = createTutorTable();
    const petOk = createPetTable();
    const tutorPetOk = createTutorPetTable();

    return tutorOk && petOk && tutorPetOk;
  } catch (error) {
    showError({ file: '_layout.tsx', operation: 'createTable', error });
    return false;
  }
}

const createAllTables = createTable()

function RootLayout() {
  if (!createAllTables) {
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
