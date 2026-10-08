import { IQueryResult } from "../../@types/queryResult";
import { ITutorPet } from "../../@types/tutorPet";
import { TABLE_PET, TABLE_TUTOR_PET } from "../../constants/tables";
import showError from "../log/showError";
import dataBase from "../openDataBase";

const table = TABLE_TUTOR_PET;
const tablePet = TABLE_PET;

// CRUD
export const assignPetToTutor = (tutorPet: ITutorPet): IQueryResult<number> =>
{
    const sql =
    `
    INSERT INTO ${table} (
        tutor_id_prov, 
        pet_id_prov
    ) VALUES ( ?, ? )
    `

    try {
        const values =
        [
            tutorPet.tutor_id_prov,
            tutorPet.pet_id_prov
        ];

        const result = dataBase.runSync( sql, values );

        return{
            success: true,
            data: result.lastInsertRowId
        }
    } catch (error) {
        showError({
            file: "tutorPetDAO",
            operation: "assignPetToTutor",
            error
        });
        return {
            success: false,
            error
        }
    }
}

export const getPetsByTutor = (tutor_id_prov: number): IQueryResult<ITutorPet[]> => {
    
    const sql = 
    `
        SELECT p.*
        FROM ${tablePet} p
        JOIN  ${table} tp 
        ON tp.pet_id_prov = p.id_prov
        WHERE tp.tutor_id_prov = ?
    `;

    try {
        const values = [ tutor_id_prov ];

        const result = dataBase.getAllSync<ITutorPet>( sql, values );

        return {
            success: true,
            data: result
        }
    } catch (error) {
        showError({
            file: "tutorPetDAO",
            operation: "getPetsByTutor",
            error
        });
        return {
            success: false,
            error
        };
    }
};

export const removePetFromTutor = (tutor_id_prov: number, pet_id_prov: number): IQueryResult<number> => {
    
    const sql = 
    `
        DELETE FROM ${TABLE_TUTOR_PET} 
        WHERE tutor_id_prov = ? AND pet_id_prov = ?
    `
     try {   
        const values = 
        [ 
            tutor_id_prov, 
            pet_id_prov 
        ];

        const result = dataBase.runSync( sql, values );

        return {
            success: true,
            data: result.changes as number
        };
    } catch (error) {
       showError({
            file: "tutorPetDAO",
            operation: "removePetFromTutor",
            error
        });
        return {
            success: false,
            error
        };
    }
};