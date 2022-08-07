
import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: String;
    name: {
        firstName: String;
        middleName: String;
        lastName: String;
    };
    email: String;
    phoneNumber: String;
    gender: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}