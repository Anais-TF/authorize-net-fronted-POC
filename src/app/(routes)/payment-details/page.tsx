'use client';

import { useAcceptJs } from 'react-acceptjs';
import {useEffect, useState} from 'react';
import {RiArrowRightLongLine} from '@remixicon/react';
import Image from 'next/image';
import { withMask } from 'use-mask-input';
import AxiosInstance from '@/utils/axios';

const authData = {
    apiLoginID: '78J2buVt',
    clientKey: '4Q3uFRg72853pRxg6L6dxjwP6Sx87hkH8mAxQJJ67XXHQCQnzz286S8n6z3zKr8d',
};

type BasicCardInfo = {
    cardNumber: string;
    cardCode: string;
    month: string;
    year: string;
};

export default function PaymentDetailsPage() {
    const { dispatchData, error } = useAcceptJs({ authData });
    const [montAndYear, setMonthAndYear] = useState('');
    const [name, setName] = useState('');
    const [cardData, setCardData] = useState<BasicCardInfo>({
        cardNumber: '',
        month: '',
        year: '',
        cardCode: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const submitToBackend = async(nonce: string) => {
        AxiosInstance.post('/v1/authorizenet/accept-transaction', {
            nonce,
            order: {
                number: "INV-2134",
                items: [
                    {
                        id: "1",
                        name: "Product 1",
                        description: "Product 1",
                        quantity: 2,
                        price: 20
                    }
                ],
                total: 45,
                tax: 0
            },
            billingInfo: {
                firstName: "John",
                lastName: "Doe",
                company: "Acme Inc",
                address: "1234 Main St",
                city: "Springfield",
                state: "IL",
                zip: "62701",
                country: "USA"
            }
        })
            .then((response) => {
                console.log(">>>>>>>>>>>>", response.data);
                if (response.data.data.messages.message[0]?.code === "I00001") {
                    setLoading(false);
                    alert('Payment successful!');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Payment failed, we are sorry :(');
            })
            .finally(() => setLoading(false));
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setLoading(true);
        // Dispatch CC data to Authorize.net and receive payment nonce for use on your server
        const response = await dispatchData({ cardData });
        console.log('Received response:', response);
        submitToBackend(response.opaqueData.dataValue)
    };

    useEffect(() => {
        if (montAndYear.length === 7)
        {
            const [month, year] = montAndYear.split(' / ');
            setCardData({ ...cardData, month, year });
        }
    }, [montAndYear]);

    return (
        <main
            className="grid grid-cols-4 bg-white items-center min-h-screen font-manrope">
            <section className="h-full col-span-3 py-14 px-28">
                <div className="flex justify-between items-center pb-8 border-b border-neutral-gray text-deep-blue font-bold text-2xl">
                    <h1>
                        Payment details
                    </h1>
                </div>

                <div className="pt-10 pb-3 text-neutral-gray">
                    <form className="w-6/12 border rounded-2xl p-7 border-[#E0E0E0] grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
                        <div className="flex items-center gap-3 col-span-2 text-deep-blue font-semibold text-2xl relative">
                            <div className="bg-[#D6EAFF] size-5.5 block border border-cerulean-blue rounded-lg relative">
                                <span className="bg-cerulean-blue size-2 absolute top-3/10 left-3/10 rounded-full" />
                            </div>
                            Credit card

                            <Image className="absolute right-0 top-[20%]" width={160} height={30} src='/banks.png' alt="banks" />
                        </div>
                        <div className="col-span-2 flex flex-col gap-1">
                            <label className="font-semibold text-[#4F5B76]" htmlFor="cardNumber">Card number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                ref={withMask(["9999 9999 9999 9999","99999 9999 9999 9999"])}
                                placeholder="1234 1234 1234 1234"
                                className="border-2 text-neutral-gray placeholder-[#A5ACB8] font-medium focus:outline-cerulean-blue focus:border-cerulean-blue border-[#E0E0E0] rounded-lg p-3 shadow-md shadow-black/7 w-full"
                                value={cardData.cardNumber}
                                onChange={(event) =>
                                    setCardData({ ...cardData, cardNumber: event.target.value.replace(/_/g, '').replace(/ /g, '') })
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[#4F5B76]" htmlFor="month">Expiry</label>
                            <input
                                type="text"
                                name="expiry"
                                placeholder="MM / YY"
                                ref={withMask("99 / 99")}
                                className="border-2 text-neutral-gray placeholder-[#A5ACB8] font-medium focus:outline-cerulean-blue focus:border-cerulean-blue border-[#E0E0E0] rounded-lg p-3 shadow-md shadow-black/7 w-full"
                                value={montAndYear}
                                onChange={(event) => {
                                    setMonthAndYear(event.target.value);
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[#4F5B76]" htmlFor="cardCode">CVC</label>
                            <input
                                type="text"
                                name="cardCode"
                                placeholder="CVC"
                                ref={withMask("(999)|(9999)")}
                                className="border-2 text-neutral-gray placeholder-[#A5ACB8] font-medium focus:outline-cerulean-blue focus:border-cerulean-blue border-[#E0E0E0] rounded-lg p-3 shadow-md shadow-black/7 w-full"
                                value={cardData.cardCode}
                                onChange={(event) =>
                                    setCardData({ ...cardData, cardCode: event.target.value })
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-1 col-span-2">
                            <label className="font-semibold text-[#4F5B76]" htmlFor="cardName">Name on card</label>
                            <input
                                type="text"
                                name="cardName"
                                placeholder="Jonh Doe"
                                className="border-2 text-neutral-gray placeholder-[#A5ACB8] font-medium focus:outline-cerulean-blue focus:border-cerulean-blue border-[#E0E0E0] rounded-lg p-3 shadow-md shadow-black/7 w-full"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </div>

                        <button className="col-span-2 rounded-lg bg-cerulean-blue text-white hover:bg-cerulean-blue/90 cursor-pointer transition-colors flex items-center mt-2 justify-center text-lg h-8 sm:h-13 px-4 sm:px-5 w-full font-bold" type="submit" disabled={loading || error}>
                            {
                                loading ? (
                                    <div
                                        className="animate-spin inline-block size-6 border-4 border-current border-t-transparent text-white rounded-full"
                                        role="status" aria-label="loading">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                   <>
                                       Pay $45.00
                                       <RiArrowRightLongLine className="ml-2" color="white" size={24}  />
                                   </>
                                )
                            }

                        </button>

                        <p className="col-span-2 text-black px-7 font-light leading-6 text-lg">
                            After your subscription ends, you will be charged $129.00 per year starting Mar 31, 2025. You can always cancel before then.
                        </p>


                        <div className="col-span-2 border-dashed border-t border-b py-4 border-[#E0E0E0] flex items-center gap-3 text-deep-blue font-semibold text-2xl relative">
                            <span className="block size-5.5 border border-[#E0E0E0] rounded-md cursor-pointer" />

                            ACH

                            <Image className="absolute right-0 top-[25%]" width={70} height={40} src='/ach.png' alt="ach" />
                        </div>

                        <div className="col-span-2 border-dashed  flex items-center gap-3 py-1.5 text-deep-blue font-semibold text-2xl relative">
                            <span className="block size-5.5 border border-[#E0E0E0] rounded-md cursor-pointer" />

                            Paypal

                            <Image className="absolute right-0 top-[20%]" width={70} height={40} src='/paypal.png' alt="paypal" />
                        </div>

                        <div className="col-span-2 border-dashed border-t pt-4 border-[#E0E0E0] flex items-center gap-3 text-deep-blue font-semibold text-2xl relative">
                            <span className="block size-5.5 border border-[#E0E0E0] rounded-md cursor-pointer" />

                            BNPL

                            <Image className="absolute right-0 top-[35%]" width={70} height={30} src='/sezzle.png' alt="sezzle" />
                        </div>
                    </form>
                </div>

            </section>

            <section className="h-full bg-neutral-off-white py-14 px-12 text-neutral-gray">
                <h1 className="pb-8 border-b border-neutral-gray font-bold text-2xl text-deep-blue">
                    Order Summary
                </h1>

                <div className="flex flex-col gap-5 py-10 font-bold text-sm relative h-11/12">
                    <div className="flex items-center justify-between">
                        <span className="uppercase text-zinc-400">Total items</span>
                        1
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="uppercase text-zinc-400">Subtotal</span>
                        $40.00
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="uppercase text-zinc-400">Shipping</span>
                        $5.00
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="uppercase text-zinc-400">Tax</span>
                        $0.00
                    </div>


                    <div className="border-t border-zinc-600 absolute bottom-0 w-full">
                        <div className="flex items-center justify-between py-8">
                            <span className="uppercase text-zinc-400">Total cost</span>
                            $45.00
                        </div>

                    {/*    <a href="https://127.0.0.1:3000/payment-details">
                            <button
                                className="rounded-lg bg-cerulean-blue text-white hover:bg-cerulean-blue/90 cursor-pointer transition-colors flex items-center justify-center text-sm sm:text-base h-8 sm:h-10 px-4 sm:px-5 w-full"
                            >

                                Checkout
                            </button>
                        </a>*/}
                    </div>
                </div>
            </section>
        </main>
    );
}

