'use client';

import Image from "next/image";
import {RiAddFill, RiDeleteBinFill, RiSubtractFill} from '@remixicon/react';

export default function Home() {
  return (
      <main
          className="grid grid-cols-4 bg-white items-center min-h-screen">
          <section className="h-full col-span-3 py-14 px-28">
             <div className="flex justify-between items-center pb-8 border-b border-neutral-gray text-deep-blue font-bold text-2xl">
                 <h1>
                     Shopping Cart
                 </h1>

                 <h1>
                     1 item
                 </h1>
             </div>

            <div className="pt-10 pb-3 grid grid-cols-6 gap-24 text-deep-blue/70">
                <div className="col-span-3">
                    <span className="uppercase font-bold">Product details</span>
                </div>

                <div className="col-span-1">
                    <span className="uppercase font-bold">Quantity</span>
                </div>

                <div className="col-span-1">
                    <span className="uppercase font-bold">Price</span>
                </div>

                <div className="col-span-1">
                    <span className="uppercase font-bold">Total</span>
                </div>
            </div>

              <div className="pt-6 pb-4 grid grid-cols-6 gap-24 text-neutral-gray">
                  <div className="col-span-3 flex">
                      <Image width={120} height={140} className="rounded-md" src='/cap.webp' alt="cap" />

                      <div className="ml-6 relative">
                          <span className="font-bold text-lg text-deep-blue">Product name</span>
                          <span className="block text-sm">Product description can go here, and <br /> it can be a long text or a short text</span>

                          <button className="text-red flex uppercase items-center gap-2 cursor-pointer absolute bottom-0 text-xs font-bold bg-red/20 hover:bg-red/30 py-2 px-4 rounded-2xl">
                              <RiDeleteBinFill className="cursor-pointer" size={16} />
                              Remove
                          </button>
                      </div>
                  </div>

                  <div className="col-span-1 flex items-start">
                      <RiSubtractFill color="neutral-gray" className="mt-1 cursor-pointer" size={26} />

                      <span className="px-5 py-1 rounded-2xl border border-neutral-gray mx-2">1</span>

                      <RiAddFill color="neutral-gray" className="mt-1 cursor-pointer" size={26} />
                  </div>

                  <div className="col-span-1">
                      <span className="uppercase font-bold">$40.00</span>
                  </div>

                  <div className="col-span-1">
                      <span className="uppercase font-bold">$40.00</span>
                  </div>
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

                        <a href="https://127.0.0.1:3000/payment-details">
                            <button
                                className="rounded-lg bg-cerulean-blue text-white hover:bg-cerulean-blue/90 cursor-pointer transition-colors flex items-center justify-center text-sm sm:text-base h-8 sm:h-10 px-4 sm:px-5 w-full"
                            >

                                Checkout
                            </button>
                        </a>
                      </div>
                </div>
          </section>
      </main>
  );
}
