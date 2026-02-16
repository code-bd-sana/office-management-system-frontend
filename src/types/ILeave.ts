/** A single leave record */
export interface ILeave {
  id: string;
  rowNumber: number;
  leaveType: string;
  from: string;
  to: string;
  duration: string;
  fileUrl: string; //remove next time
  status: string;
}
