Check out the [blog post](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WB3zyeErJE4).

## Want to use this project?

1. Install dependencies - `npm install`
1. Install gulp - `npm install -g gulp`
1. Compile - `npm run build`
1. Watch for changes - `npm run watch`
1. Run the development server - `npm start`
1. Test - `npm test`

localhost:3000


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

