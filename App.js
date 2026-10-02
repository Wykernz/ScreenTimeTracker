
import React, { useEffect } from 'react';

import {
  View
} from 'react-native';

import {
  setupDatabase
} from './src/database/database';

import FamilyScreen from './src/screens/familyScreen';


export default function App() {

  // Prepare the SQLite database
  useEffect(() => {
    setupDatabase();
  }, []);


  return (
    <View style={{ flex: 1 }}>

      <FamilyScreen />

    </View>
  );
}

