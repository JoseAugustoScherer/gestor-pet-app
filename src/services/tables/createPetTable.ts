import { TABLE_PET } from "../../constants/tables"
import showError from "../log/showError";
import dataBase from "../openDataBase"

const createPetTable = () => {
    try {
        dataBase.runSync(
            `CREATE TABLE IF NOT EXISTS ${TABLE_PET}(
                id INTEGER,
                id_prov INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                birth_date DATE,
                race TEXT NOT NULL,
                height FLOAT,
                weight FLOAT,
                observation TEXT,
                is_sync INTEGER DEFAULT 0 NOT NULL
            )
            `
        );

        return true;
    } catch (error: unknown) {
        showError({ file: 'createPetTable.ts', operation: 'createPetTable', error });
        return false;
    }
}

export default createPetTable;