'use client'

import Link from "next/link";
import Button from "./components/Button";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-24">
            <h1 className="text-4xl font-bold">Welcome to the Book Store</h1>
            <Button className="mt-4">
                <Link href="/book">Go to Book Page</Link>
            </Button>
        </div>
    );
}
