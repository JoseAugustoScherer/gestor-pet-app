import { TABLE_TUTOR } from '../../constants/tables';
import showError from '../log/showError';
import dataBase from '../openDataBase'

const createTutorTable = () => {
    try {
        dataBase.runSync(
            `CREATE TABLE IF NOT EXISTS ${TABLE_TUTOR}(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT,
                address TEXT
            )`
        );

        return true;
    } catch (error: unknown) {
        showError({ file: 'tutor.ts', operation: 'createTableTutor', error });
        return false;
    }
}

export default createTutorTable;