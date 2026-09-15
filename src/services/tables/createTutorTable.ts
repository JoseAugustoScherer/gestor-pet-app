import { TABLE_TUTOR } from '../../constants/tables';
import showError from '../log/showError';
import dataBase from '../openDataBase'

const createTutorTable = () => {
    try {
        dataBase.runSync(
            `CREATE TABLE IF NOT EXISTS ${TABLE_TUTOR}(
                id INTEGER,
                id_prov INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT,
                address TEXT,
                is_sync INTEGER DEFAULT 0 NOT NULL
            )`
        );

        return true;
    } catch (error: unknown) {
        showError({ file: 'createTutorTable.ts', operation: 'createTableTutor', error });
        return false;
    }
}

export default createTutorTable;