import * as SQLite from "expo-sqlite";

const dataBase = SQLite.openDatabaseSync('gestor_pet.db');
dataBase.execSync('PRAGMA foreign_keys = ON;');

export default dataBase;