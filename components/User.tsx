import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

export default function User() {
    return (
        <div className='flex flex-row md:flex-col'>
            <SignedOut>
                <SignInButton>
                    <button>Sign In</button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
};