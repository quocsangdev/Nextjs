'use client';

import { useEffect } from "react";
type Blogs = {
    id: number;
    title: string;
    body: string;
};
const Book = () => {
    const fetchData = async () => {

    }

    useEffect(() => {
        fetchData();
    });

    const url = fetch('http://localhost:8000/blogs')
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Book Page</h1>
        </div>
    );
}
export default Book;