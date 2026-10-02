
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';

import {
  addProfile,
  getProfiles,
  deleteProfile
} from '../database/database';


export default function FamilyScreen() {

  // Store the name typed by the user
  const [name, setName] = useState('');

  // Store all family members
  const [profiles, setProfiles] = useState([]);


  // Load family members from SQLite
  async function loadProfiles() {

    const data = await getProfiles();

    setProfiles(data);

  }


  // Run when the screen opens
  useEffect(() => {

    loadProfiles();

  }, []);


  // Add a family member
  async function handleAdd() {

    // Check if the name is empty
    if (name.trim() === '') {

      Alert.alert(
        'Error',
        'Please enter a name.'
      );

      return;
    }


    // Save the family member
    await addProfile(

      name.trim(),

      'Child',

      120

    );


    // Clear the input
    setName('');


    // Reload the family members
    await loadProfiles();


    // Show success message
    Alert.alert(
      'Success',
      'Family member added!'
    );

  }


  // Delete a family member
  async function handleDelete(id) {

    // Delete from SQLite
    await deleteProfile(id);


    // Reload the list
    await loadProfiles();

  }


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Family Members
      </Text>


      <TextInput

        style={styles.input}

        placeholder="Enter name"

        value={name}

        onChangeText={setName}

      />


      <Button

        title="Add Family Member"

        onPress={handleAdd}

      />


      <Text style={styles.heading}>
        Members
      </Text>


      <FlatList

        data={profiles}

        keyExtractor={(item) =>
          String(item.id)
        }


        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.memberInfo}>

              <Text style={styles.name}>
                {item.name}
              </Text>


              <Text>
                Role: {item.role}
              </Text>


              <Text>
                Daily Limit: {item.daily_limit} minutes
              </Text>

            </View>


            <Button

              title="Delete"

              onPress={() =>
                handleDelete(item.id)
              }

            />

          </View>

        )}


        ListEmptyComponent={

          <Text style={styles.emptyText}>
            No family members yet.
          </Text>

        }

      />

    </View>

  );

}


const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 20,

    paddingTop: 60

  },


  title: {

    fontSize: 28,

    fontWeight: 'bold',

    marginBottom: 20

  },


  input: {

    borderWidth: 1,

    borderColor: '#AAAAAA',

    padding: 12,

    borderRadius: 8,

    marginBottom: 10

  },


  heading: {

    fontSize: 20,

    fontWeight: 'bold',

    marginTop: 30,

    marginBottom: 10

  },


  card: {

    padding: 15,

    borderWidth: 1,

    borderColor: '#DDDDDD',

    borderRadius: 10,

    marginBottom: 10,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center'

  },


  memberInfo: {

    flex: 1,

    marginRight: 10

  },


  name: {

    fontSize: 18,

    fontWeight: 'bold',

    marginBottom: 5

  },


  emptyText: {

    marginTop: 10,

    color: '#666666'

  }

});

