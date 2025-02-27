import { json } from "sequelize"

export async function mountPagenation(filtes:any) {
    filtes.sortBy  = filtes.sortBy ? filtes.sortBy : "id"
    filtes.descending = filtes.descending ? JSON.parse(filtes.descending) : false 
    filtes.page = filtes.page ? +filtes.page : 1
    filtes.rowsPerPage = filtes.rowsPerPage ? +filtes.rowsPerPage : 10

    return +filtes.rowsPerPage > 0 ? {
        ofset: +filtes.rowsPerPage*(+filtes.page - 1),
        limet: +filtes.rowsPerPage
    }: {}
}