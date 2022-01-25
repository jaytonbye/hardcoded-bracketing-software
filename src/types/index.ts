// for table users

export interface IUser {
  id?: number;
  email: string;
  password: string;
  role?: string;
  real_email?: string;
  date_created?: Date;
  tenant?: string;
}

// for table personal_info
export interface IPerson {
  id: number;
  first_name: string;
  last_name: string;
  notes: string;
  user_id: number;
  date_created: Date;
}

export interface mysqlResponse {
  affectedRows: number;
  insertId: number;
}
