import { INewPet, IPet } from "../../@types/pet";
import { IQueryResult } from "../../@types/queryResult";
import { TABLE_PET } from "../../constants/tables";
import showError from "../log/showError";
import dataBase from "../openDataBase";

const table = TABLE_PET;

// CRUD
export const insertPet = (pet: INewPet): IQueryResult<number> =>
{
    const sql = 
    `
    INSERT INTO ${table}(
        name,
        birth_date,
        race,
        height,
        weight,
        observation
    ) VALUES ( ?, ?, ?, ?, ?, ? );
    `;

    try {
        const values = 
        [
            pet.name,
            pet.birth_date || null,
            pet.race,
            pet.height || null,
            pet.weight || null,
            pet.observation || null
        ];

        const result = dataBase.runSync( sql, values );

        return{
            success: true,
            data: result.lastInsertRowId
        }
    } catch (error) {
        showError({
            file: "petDAO",
            operation: "insertPet",
            error
        });
        return {
            success: false,
            error
        }
    }
}

export const getAllPets = (): IQueryResult<IPet[]> =>
{
    try {
        const sql = 
        `
            SELECT * FROM ${table};
        `;

        const result = dataBase.getAllSync<IPet>(sql);

        return {
            success: true,
            data: result
        }
    } catch (error) {
        showError({
             file: "petDAO",
            operation: "getAllPets",
            error
        });
        return {
            success: false,
            error
        };
    }
}

export const updatePet = (pet: IPet): IQueryResult<number> =>
{
    const sql = 
    `
    UPDATE TABLE ${table} SET
        name = ?,
        birth_date = ?,
        race = ?,
        height = ?,
        weight = ?,
        observation  = ?,
        is_sync = 0
    WHERE id_prov = ?;
    `;

    try {
        const values = 
        [
            pet.name,
            pet.birth_date || null,
            pet.race,
            pet.height || null,
            pet.weight || null,
            pet.observation || null,
            pet.id_prov
        ];

        const result = dataBase.runSync( sql, values );

        return {
            success: true,
            data: result.changes
        };
    } catch (error) {
        showError({
            file: "petDAO",
            operation: "updatePet",
            error
        });
        return {
            success: false,
            error
        };
    }
}

export const deletePet = (id_prov: number): IQueryResult<number> =>
{
    const sql = 
    `
        DELETE FROM ${table} WHERE id_prov = ? 
    `;

    try {
        const values = [ id_prov ];

        const result = dataBase.runSync( sql, values );

        return {
            success: true,
            data: result.changes as number
        };
    } catch (error) {
        showError({
            file: "petDAO",
            operation: "deletePet",
            error
        });
        return {
            success: false,
            error
        };
    }
}