export interface Client {
    name: string,
    cpf: string,
    phone1: string,
    phone2: string,
    address: {
        place: string,
        city: string,
        zipCode: string,
        number: number,
        neighborhood: string,
        info: string
    }
}