import {RiShieldCheckLine} from '@remixicon/react';

export default function PaymentSuccesPage()
{
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <RiShieldCheckLine className="text-green-500" size={80} />
            <h1 className="mt-5 text-4xl font-bold text-center">Payment Completed <br /> Successfully</h1>

            <p className="mt-5 text-lg text-center">
                Thank you for your purchase! <br /> Have a great day :)
            </p>

          <a
              href="https://127.0.0.1:3000/"
              className="mt-10 bg-indigo-900 hover:bg-indigo-800 cursor-pointer font-bold py-3 px-10 rounded-full">
              Return home
          </a>
        </main>
    )
}
