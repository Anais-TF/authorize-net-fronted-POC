This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, you need to install the dependencies:

```bash
npm install
```

Then, you need to create a `.env.development` file in the root of the project with the following content:

```bash
NEXT_PUBLIC_API_URL=https://9h1mrdwv-3001.use2.devtunnels.ms/api
AUTHORIZENET_API_LOGIN_KEY=78J2buVt
AUTHORIZENET_TRANSACTION_KEY=67Aac5AhF4h82T3Q
```

The `NEXT_PUBLIC_API_URL` is the URL of your local API. It **MUST** be in an https environment, otherwise the POC won't work. The `AUTHORIZENET_API_LOGIN_KEY` and `AUTHORIZENET_TRANSACTION_KEY` are the keys that you can use to test the Authorize.net integration.

## Running the server
In order to be able to test the Authorize.net integration, you need to run the server in HTTPS mode. To do this, you can run the following command:

```bash
next dev --experimental-https
```

Open [https://127.0.0.1:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

