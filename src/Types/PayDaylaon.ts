import { EMPLOYMENT_STATUS } from "./enums/Employmentstatus";
import { IUser } from "./User";

export interface IPaydayLoan {

      id: string;
    
      user_id: string;
    
      BVN: string;
    
      DOB: Date;
    
      Means_of_ID: string;
    
      ID_number: string;
    
      date_issued: Date;
    
      expiry_date: Date;
    
      alt_number: string;
    
      home_address: string;

      landmark: string;
    
      LGA_of_residence: string;
    
      state: string;
    
      length_of_time_at_current_address: number;
    
      marital_status: number;
    
      employment_status: EMPLOYMENT_STATUS;
    
      current_employer: string;

      current_employer_address: string;
    
      current_employer_landmark: string;
    
      current_employer_LGA: string;
    
      current_employer_state: string;
    
      current_employer_office_number: string;

      staff_id: string;

      department: string;
    
      job_title: string;
    
      date_employed: Date;

      previous_employer: string;
    
      previous_employer_address: string;

      length_of_time_with_previous_employer: number;

      jobs_in_past_5_years: number;
    
      current_paydate: Date;
    
      existing_loan: boolean;
    
      existing_loan_type: number;

      next_of_kin_surname: string;
    
      next_of_kin_firstname: string;
    
      next_of_kin_relationship: string;

      next_of_kin_phone: string;
    
      next_of_kin_address: string;
    
      loan_amount: number;
    
      loan_tenure: number;
    
      account_number: string;
    
      account_name: string;

      bank_name: string;
    
      hear_about_us: string;
 
      passport: string;
    
      government_ID: string;
    
      // @ApiProperty({
      //   required: true,
      // })
      // @Column({
      //   nullable: false,
      // })
      // bank_statement: string;
    
      company_id: string;
    
      letter_of_employment: string;
    
      HR_letter_of_confirmation: string;

      utility_bill: string;

      type: number;
    
      status: number;
    
      created_at: string;
    
      draft: boolean;
    
      user: IUser;
}