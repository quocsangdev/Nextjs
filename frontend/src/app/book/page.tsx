'use client';

import api from '@/config/api';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal'
import CustomInput from '../components/Input';
import CustomTextarea from '../components/Textarea';
import { toast } from 'react-toastify';
import { useSearchParams, useRouter } from 'next/navigation';

type Blog = {
    id: number;
    title: string;
    content: string;
    author: string;
};

export default function Book() {
    const [data, setData] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const [idUpdate, setIdUpdate] = useState<number | null>(null);

    const [titleDelete, setTitleDelete] = useState("");

    const searchParams = useSearchParams();
    const router = useRouter();

    const [inputValue, setInputValue] = useState("");
    const searchKeyword = searchParams.get('search') || "";

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (inputValue.trim()) {
            params.set('search', inputValue);
        } else {
            params.delete('search');
        }
        router.push(`?${params.toString()}`);
    };
    const filteredData = data.filter(blog =>
        blog.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const handleSubmit = async () => {
        const formData = {
            title: title,
            author: author,
            content: content
        }
        if (!title || !author || !content) {
            toast.warning("Vui lòng điền đầy đủ thông tin");
            return
        }
        try {
            const res = await api.post("blogs", formData);
            if (res.status == 201) {
                console.log(res)
                toast.success('Thêm thành công')
                setIsOpenModal(false);
                setTitle("");
                setAuthor("");
                setContent("");
                const response = await api.get<Blog[]>('blogs');
                setData(response.data.reverse());
            } else {
                console.error("Thêm thất bại:");
            }
        } catch (e) {
            console.error("Lỗi khi thêm blog:", e);
        }
    }

    const handleUpdate = async () => {
        if (!title || !author || !content) {
            toast.warning("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const res = await api.put(`blogs/${idUpdate}`, {
                title,
                author,
                content
            });

            if (res.status === 201) {
                toast.success('Cập nhật thành công');
                setIsOpenModalUpdate(false);
                setIdUpdate(null);
                setTitle("");
                setAuthor("");
                setContent("");
                const response = await api.get<Blog[]>('blogs');
                setData(response.data);
            } else {
                toast.error('Cập nhật thất bại');
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật blog:", error);
            toast.error('Có lỗi xảy ra khi cập nhật');
        }
    }

    const handleDelete = async () => {
        if (!idUpdate) {
            toast.warning("Blog này không tồn tại");
            return;
        }

        try {
            const res = await api.delete(`blogs/${idUpdate}`);
            if (res.status === 201) {
                toast.success("Xóa blog thành công");
                setIsOpenModalDelete(false);
                const response = await api.get<Blog[]>('blogs');
                setData(response.data);
            } else {
                toast.error("Xóa blog thất bại");
            }
        } catch (error) {
            console.error("Lỗi khi xóa blog:", error);
            toast.error("Có lỗi xảy ra khi xóa blog");
        }
    }

    const openUpdateModal = (blog: Blog) => {
        setIdUpdate(blog.id);
        setTitle(blog.title);
        setAuthor(blog.author);
        setContent(blog.content);
        setIsOpenModalUpdate(true);
    }

    const openDeleteModal = (blog: Blog) => {
        setIdUpdate(blog.id);
        setTitleDelete(blog.title);
        setIsOpenModalDelete(true);
    }

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await api.get<Blog[]>('blogs');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    });

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-lg">Loading...</span>
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-8">
            <Button className='mb-3' onClick={() => router.back()}>Trở lại</Button>
            <div className='flex justify-between'>
                <h1 className="text-4xl font-bold mb-6">Danh sách Blogs</h1>
                <h1 className="text-4xl font-bold mb-6">
                    <Button color='primary' onClick={() => setIsOpenModal(true)}>Thêm Mới</Button>
                </h1>
            </div>
            <div className="flex w-full mb-4">
                <div className="flex-grow">
                    <CustomInput
                        placeholder="Tìm kiếm blog..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="rounded-r-none"
                    />
                </div>
                <Button className="rounded-l-none h-10" onClick={handleSearch}>
                    Tìm
                </Button>
            </div>
            <table className="min-w-full bg-white shadow-md">
                <thead className="bg-red-300">
                    <tr>
                        <th className="px-6 py-3 uppercase whitespace-nowrap">
                            #
                        </th>
                        <th className="px-6 py-3 uppercase whitespace-nowrap">
                            Tiêu đề
                        </th>
                        <th className="px-6 py-3 uppercase whitespace-nowrap">
                            Content
                        </th>
                        <th className="px-6 py-3 uppercase whitespace-nowrap">
                            Tác giả
                        </th>
                        <th className="px-6 py-3 uppercase whitespace-nowrap">
                            Aciton
                        </th>
                    </tr>
                </thead>

                <tbody className="">
                    {filteredData.map((value, index) => (
                        <tr
                            key={value.id}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {value.id}
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-800 whitespace-wrap">
                                {value.title}
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-800">
                                {value.content}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {value.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <Button color='primary' className='mx-2' onClick={() => openUpdateModal(value)}>Sửa</Button>
                                <Button color='danger' onClick={() => openDeleteModal(value)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                title="Thêm blog mới"
                size='xl'
            >
                <div>
                    <CustomInput
                        label='Tiêu đề'
                        placeholder='Nhập vào tiêu đề nào'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <CustomInput
                        label='Tác giả'
                        placeholder='Nhập vào tác giả nào'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                    <CustomTextarea
                        label='Nội Dung'
                        placeholder='Nhập vào nội dung nào'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button color="secondary" onClick={() => setIsOpenModal(false)}>
                        Hủy
                    </Button>
                    <Button color="primary" onClick={() => handleSubmit()}>
                        Thêm Mới
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={isOpenModalUpdate}
                onClose={() => setIsOpenModalUpdate(false)}
                title="Cập nhật blog"
                size='xl'
            >
                <div>
                    <CustomInput
                        label='Tiêu đề'
                        placeholder='Nhập vào tiêu đề'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <CustomInput
                        label='Tác giả'
                        placeholder='Nhập vào tác giả'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                    <CustomTextarea
                        label='Nội Dung'
                        placeholder='Nhập vào nội dung'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button color="secondary" onClick={() => setIsOpenModalUpdate(false)}>
                        Hủy
                    </Button>
                    <Button color="primary" onClick={() => handleUpdate()}>
                        Cập nhật
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={isOpenModalDelete}
                onClose={() => setIsOpenModalUpdate(false)}
                title="Xóa blog"
                size='xl'
            >
                <div className='mb-3'>
                    <span>Bạn chắc chắn muốn xóa "{titleDelete}" này không</span>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button color="secondary" onClick={() => setIsOpenModalDelete(false)}>
                        Hủy
                    </Button>
                    <Button color="primary" onClick={() => handleDelete()}>
                        Xóa Ngay
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
