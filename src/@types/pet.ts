export interface INewPet {
    name: string;
    birth_date?: string | null;
    race: string;
    height?: number | null;
    weight?: number | null;
    observation?: string | null;
}

export interface IPet extends INewPet {
    id?: number | null;
    id_prov: number;
}