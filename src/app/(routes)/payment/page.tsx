'use client';

import {useEffect, useRef, useState} from 'react';
import AxiosInstance from '@/utils/axios';
import { AcceptHosted } from 'react-acceptjs';

export default function PaymentPage() {
    const [token, setToken] = useState('');

    const ExecuteGetForm = () => {
        AxiosInstance.post('/v1/authorizenet/generate-form', {
            amount: 45
        })
            .then((response) => {
                console.log(">>>>>>>>>>>>", response.data);
                setToken(response.data.data.token);
            })
            .catch((error) => {
                console.error(error);
            })
    };

    useEffect(() => {
        const interval = setInterval(() => {
        const button = document.getElementsByClassName('iframe-btn')[0];
            console.log('>> here', button);
            if (button) {
               button.click();
                clearInterval(interval);
            }
        }, 900); // Check every 900ms

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        ExecuteGetForm();
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            { token ? (
                <AcceptHosted formToken={token}
                              integration="iframe"
                              onCancel={() => {
                                  console.log('cancelled');
                              }}
                              onTransactionResponse={(response) =>
                                  console.log("Transaction Response: ", response)
                              }>
                    <AcceptHosted.Button className="btn btn-primary iframe-btn">
                        <div
                            className="animate-spin inline-block size-10 border-4 border-current border-t-transparent text-white rounded-full"
                            role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </AcceptHosted.Button>
                    <AcceptHosted.IFrameContainer>
                        <AcceptHosted.IFrame />
                    </AcceptHosted.IFrameContainer>
                </AcceptHosted>
            ) : (
                <div
                    className="animate-spin inline-block size-10 border-4 border-current border-t-transparent text-white rounded-full"
                    role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            )
            }
        </main>
    )
}
