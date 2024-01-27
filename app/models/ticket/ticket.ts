import {IUser} from "../user/user";
import {stringify} from "qs";

export interface ITicket {
    id?: string
    name: string
    price: string
    tourOperator: string
    location: {
        x: string
        y: string
    }
    hotel:string
    description: string
}

export interface IVipTicket extends ITicket {
    vipNumber: number
    vipStatus: string
}

export type TicketType = ITicket | IVipTicket

export interface IPostTicketData {
    ticket: TicketType
    user: IUser
}