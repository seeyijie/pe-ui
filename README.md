# Private Market Fund Management UI

A proof-of-concept (POC) web application for creating and subscribing to private market funds.

## Features

- Create private market funds with customizable parameters
- Switch between different user roles (Fund Manager, Investors A, B, and C)
- Subscribe to available funds as an investor
- View fund details and subscription information

## Fund Creation Parameters

When creating a fund, you can specify the following parameters:

1. Management Fee (%)
2. Performance Fee (%)
3. Performance Fee Calculation Methodology (Hard Hurdle, Soft Hurdle, High Water Mark)
4. Fund Level Transparency (Low, Medium, High)
5. Hurdle Rate (%)

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone <repository-url>
cd fund-management-ui
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## User Roles

The application supports four different user roles:

1. **Fund Manager** - Can create and manage funds
2. **Investor A, B, C** - Can view and subscribe to available funds

You can switch between roles using the user switcher in the top-right corner of the application.

## Technologies Used

- Next.js
- React
- TypeScript 
- Tailwind CSS

## License

[MIT](https://choosealicense.com/licenses/mit/)
