import React from 'react';

import {AuthProvider} from './context/AuthContext';
import Router from './Routes/Router';

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
