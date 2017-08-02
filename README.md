# Pizzeria Management System in Angular 2 and NodeJS

This a sample pizzeria managemet system made with [Node](https://nodejs.org) ([ExpressJs](http://expressjs.com/pt-br/) + [TypeScript](https://www.typescriptlang.org/)) and [Angular 2](https://angular.io/) (with [CoreUI](http://coreui.io/)).

## Main features

* User authentication
* Clients CRUD
* Products CRUD
* Orders CRUD

![login]()
![main]()
![order]()

## Prerequisites

* [Node](https://nodejs.org) >= 6
* [MySQL](https://www.mysql.com/)

## How to run

### Database

1. Create database schema running the file `backend/database.sql`

### Backend

1. `cd backend`
1. `npm install`
1. `npm install -g gulp`
1. `npm run build`
1. `npm start`
1. `npm run watch` for watch source changes

Runs on localhost:3000

### Frontend

1. `cd frontend`
1. `npm install`
1. `npm install -g @angular/cli`
1. `npm start`

Runs on localhost:4200

Default system user/password: admin1/senha

## Authors

* [Roberto Luiz Debarba](https://github.com/RobertoDebarba)
* [Matheus Hoeltgebaum Pereira](https://github.com/matheushoeltgebaum)
* [Matheus Adriano Pereira](https://github.com/Itatakaru)

## API documentation

### Client

    name:string,
    cpf:number,
    phone1:number,
    phone2:number,
    address:{
        place:string,
        city:string,
        zipCode:number,
        number:number,
        neighborhood:string,
        info:string
    }

### Product

    {
        id: number,
        name: string,
        price: number
    }

### Order

    {
        id: number,
        date: string,
        status: string,
        client: Client,
        products: {
            product: Product,
            amount: number
        }[]
    }

### GET /api/client

Response body:

    Client[]

### GET /api/client/:cpf

Response body:

    Client

### POST /api/client

Request body:

    Client

### GET /api/product

Response body:

    Product[]

### GET /api/product/:id

Response body:

    Product

### DELETE /api/product/:id

### POST /api/product

Request body:

    Product

### GET /api/order

Response body:

    Order[]

### GET /api/order/:id

Response body:

    Order

### POST /api/order

### POST /api/order/complete/:id

### POST /api/order/cancel/:id

Request body:

    {
        id: number,
        date: string,
        status: string,
        client: number[],
        products: {
            id: number,
            amount: number
        }[]

    }

