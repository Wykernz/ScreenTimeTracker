import * as SQLite from 'expo-sqlite';


// Open the database
export const dbPromise = SQLite.openDatabaseAsync('family.db');


// Create the family members table
export async function setupDatabase() {

  const db = await dbPromise;

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      daily_limit INTEGER NOT NULL DEFAULT 120
    );
  `);

  console.log('Database is ready!');
}


// Add a family member
export async function addProfile(name, role, dailyLimit) {

  const db = await dbPromise;

  await db.runAsync(
    `INSERT INTO profiles
     (name, role, daily_limit)
     VALUES (?, ?, ?)`,
    name,
    role,
    dailyLimit
  );

  console.log('Family member added!');
}


// Get all family members
export async function getProfiles() {

  const db = await dbPromise;

  const profiles = await db.getAllAsync(
    `SELECT * FROM profiles ORDER BY id DESC`
  );

  return profiles;
}