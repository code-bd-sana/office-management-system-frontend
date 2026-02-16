/** A single leave record */
export interface IAttendance {
  id: string;
  rowNumber: number;
  date: string;
  day: string;
  checkIn?: string;
  checkOut?: string;
  status: string;
}
