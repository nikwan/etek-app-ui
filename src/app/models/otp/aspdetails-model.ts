import { EccConfModel } from "./ecc-conf-model"

export interface ASPDetailsModel {
    aspName: string,
    aspId: string,
    txn: string,
    ctx: string,
    v1: string,v2: string,v3: string,v4: string,
    success: boolean,
    am: number
    conf: EccConfModel
}
