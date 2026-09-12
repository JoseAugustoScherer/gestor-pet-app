import { IQueryResult } from "../../@types/queryResult";
import { INewTutor, ITutor } from "../../@types/tutor";
import { TABLE_TUTOR } from "../../constants/tables";
import showError from "../log/showError";
import dataBase from "../openDataBase";

const table = TABLE_TUTOR;

// CRUD
export const insertTutor = (tutor: INewTutor): IQueryResult<number> => 
{
    const sql = 
    `
    INSERT INTO ${table}(
        name,
        phone,
        email,
        address
    ) VALUES ( ?, ?, ?, ? );
    `

    try {
        const values = 
        [
            tutor.name,
            tutor.phone,
            tutor.email || null,
            tutor.address || null
        ];

        const result = dataBase.runSync( sql, values );

        return {
            success: true,
            data: result.lastInsertRowId
        }
    } catch (error) {
        showError({
            file: "tutorDAO",
            operation: "insertTutor",
            error
        });
        return {
            success: false,
        };
    }
}

export const getAllTutors = (): IQueryResult<ITutor[]> =>
{
    try {
        const sql = `SELECT * FROM ${table};`

        const result = dataBase.getAllSync<ITutor>(sql);

        return {
            success: true,
            data: result
        };
    } catch (error) {
        showError({
            file: "tutorDAO",
            operation: "getAllTutors",
            error
        });
        return {
            success: false,
        };
    }
}

export const updateTutor = (tutor: ITutor): IQueryResult<number> =>
{
    const sql = 
    `
    UPDATE ${table} set
        name = ?,
        phone = ?,
        email = ?,
        address = ?,
        isSync = 0
    WHERE id_prov = ?;
    `

    try {
        const values = 
        [
            tutor.name,
            tutor.phone,
            tutor.email || null,
            tutor.address || null,
            tutor.id_prov
        ];

        const result = dataBase.runSync( sql, values );

        return {
            success: true,
            data: result.changes
        };
    } catch (error) {
        showError({
            file: "tutorDAO",
            operation: "updateTutor",
            error
        });
        return {
            success: false,
        };
    }
}

export const deleteTutor = (id_prov: number): IQueryResult<number> =>
{
    const sql = 
        `
        DELETE FROM ${table} WHERE id_prov = ?
        `

    try {
        
        const values = [ id_prov ]

        const result = dataBase.runSync( sql, values );

        return {
            success: true,
            data: result.changes
        };
    } catch (error) {
        showError({
            file: "tutorDAO",
            operation: "deleteTutor",
            error
        });
        return {
            success: false,
        };
    }
}