import * as SQLite from "expo-sqlite";

const dataBase = SQLite.openDatabaseSync('gestor_pet.db')

export default dataBase;