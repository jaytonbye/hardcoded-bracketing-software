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

export interface mysqlResponse {
  affectedRows: number;
  insertId: number;
}

//This interface is my first in the bracketing software, lets see if I use it.
export interface IEvent {
  id: number;
  created_by_user: number;
  name_of_event: string;
  date_of_event: Date;
  location_of_event: string;
  created_at: Date;
}
