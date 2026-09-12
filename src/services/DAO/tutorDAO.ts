import { IInsertResult } from "../../@types/insertResult";
import { ITutorProps } from "../../@types/tutor";
import { TABLE_TUTOR } from "../../constants/tables";
import showError from "../log/showError";
import dataBase from "../openDataBase";

// CRUD
export const insertTutor = (tutor: ITutorProps) : IInsertResult => 
{
    const sql = 
    `INSERT INTO ${TABLE_TUTOR}(
        name,
        phone,
        email,
        address
    ) VALUES ( ?, ?, ?, ? );`

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
            id: result.lastInsertRowId,
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