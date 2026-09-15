import { TABLE_PET, TABLE_TUTOR, TABLE_TUTOR_PET } from "../../constants/tables"
import showError from "../log/showError";
import dataBase from "../openDataBase"

const createTutorPetTable = () => {
    try {
        dataBase.runSync(
            `CREATE TABLE IF NOT EXISTS ${TABLE_TUTOR_PET}(
                id INTEGER,
                tutor_id_prov INTEGER NOT NULL,
                pet_id_prov INTEGER NOT NULL,
                PRIMARY KEY (tutor_id_prov, pet_id_prov),
                FOREIGN KEY (tutor_id_prov) REFERENCES ${TABLE_TUTOR}(id_prov),
                FOREIGN KEY (pet_id_prov ) REFERENCES ${TABLE_PET}(id_prov),
                is_sync INTEGER DEFAULT 0 NOT NULL
            )`
        );

        return true;
    } catch (error: unknown) {
        showError({ file: 'createTutorPetTable.ts', operation: 'createTutorPetTable', error });
        return false;
    }
}

export default createTutorPetTable;