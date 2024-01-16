'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
    const session = useSession();
    if (!session || !session.data) {
        redirect('/api/auth/signin');
    }

    const [key, setKey] = useState('');

    const registerKey = async () => {
        if (key.length === 0) {
            toast.error('Je hebt geen key ingevuld!');
            return;
        }

        const success = await fetch('/api/key', {
            method: 'POST',
            body: JSON.stringify({ key }),
        }).then((res) => res.status === 200);

        if (!success) {
            toast.error('Er is iets misgegaan bij het toevoegen van de key!');
            return;
        }

        if (success) {
            toast.success('Key succesvol toegevoegd!');
            setKey('');
        }
    };

    const deleteExistingKeys = async () => {
        const success = await fetch('/api/key', {
            method: 'DELETE',
        }).then((res) => res.status === 200);

        if (!success) {
            toast.error(
                'Er is iets misgegaan bij het verwijderen van de keys!'
            );
            return;
        }

        if (success) {
            toast.success('Keys succesvol verwijderd!');
            setKey('');
        }
    };

    return (
        <main className='flex min-h-screen flex-col space-y-24'>
            <nav className='h-[64px] bg-gray-100 w-full'>
                <div className='mx-24 flex justify-between h-full'>
                    <div className='flex items-center'>
                        Oefensysteem Examen DevOps
                    </div>
                    <div
                        className='flex items-center hover:bg-gray-200 rounded-lg px-4 my-4'
                        onClick={() => signOut()}
                    >
                        Afmelden
                    </div>
                </div>
            </nav>
            {/* Section with some information about the machine */}
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='flex flex-col items-center justify-center w-1/2'>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <h1 className='text-4xl font-bold'>
                            Informatie over de machine
                        </h1>
                        <p className='text-xl'>
                            Hieronder vind je informatie over de machine waarop
                            je moet inloggen.
                        </p>
                    </div>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <div className='flex flex-col items-center justify-center w-full'>
                            <p className='text-2xl font-bold'>
                                IP:{' '}
                                <span className='font-normal'>
                                    s140024.devops-ap.be
                                </span>
                            </p>
                            <p className='text-2xl font-bold'>
                                Poort: <span className='font-normal'>80</span>
                                <span className='text-gray-500 text-sm font-thin ml-2'>
                                    Opmerking: gebruik de{' '}
                                    <code className='bg-gray-200 p-1 rounded-lg'>
                                        -p 80
                                    </code>{' '}
                                    vlag om een poort mee te geven aan je
                                    commando. Ik kon hier niet omheen!
                                </span>
                            </p>
                            <p className='text-2xl font-bold'>
                                Gebruikersnaam:{' '}
                                <span className='font-normal'>
                                    {session.data.user?.name}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section with an input field to input a public key and a submit button to add the key*/}
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='flex flex-col items-center justify-center w-1/2'>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <h1 className='text-4xl font-bold'>
                            Voeg een public key toe
                        </h1>
                        <p className='text-xl'>
                            Vul hieronder je public key in en klik op de knop om
                            deze toe te voegen aan de server.
                        </p>
                    </div>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <div className='flex flex-col items-center justify-center w-full'>
                            <textarea
                                className='w-full p-2 border-2 border-red-500 rounded-md h-40'
                                placeholder='Public key'
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col items-center justify-center w-full'>
                            <button
                                className='w-full p-2 mt-2 bg-red-500 rounded-md'
                                onClick={() => registerKey()}
                            >
                                Voeg toe
                            </button>
                            <button
                                className='w-full p-2 mt-2 bg-blue-500 rounded-md'
                                onClick={() => deleteExistingKeys()}
                            >
                                Verwijder bestaande sleutels
                            </button>
                            <Toaster
                                position='top-center'
                                reverseOrder={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
