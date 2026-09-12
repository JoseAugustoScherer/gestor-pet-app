export interface INewTutor {
    name: string;
    phone: string;
    email?: string | null;
    address?: string | null;
}

export interface ITutor extends INewTutor{
    id: number
}