export interface TicketResponse {
  payInResponse: string;
  message: string;
  expressTicket: boolean;
  transactionErrorMessages: null;
  messageCode: number;
  messageParams: number[];
  ticket: Ticket;
}

export interface Ticket {
  code: string;
  pin: string;
  uuid: string;
}
