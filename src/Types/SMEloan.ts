// import { IUser } from "./User";

export interface ISMELoan {
    id: string;
    business_name: string;
    user_id: string;
    business_address: string;
    RC_number: string;
    TIN_number: string;
    business_up_time: string;
    purpose_of_loan: string;
    type: number;
    status: number;
    draft: boolean
    created_at: string;
    phone: string;
    email: string;
}