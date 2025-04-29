'use client'

import React from 'react'

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
    if (!isOpen) return null

    const getSizeClass = (size: string) => {
        switch (size) {
            case 'sm':
                return 'max-w-sm'
            case 'md':
                return 'max-w-md'
            case 'lg':
                return 'max-w-lg'
            case 'xl':
                return 'max-w-xl'
            default:
                return 'max-w-md'
        }
    }

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`relative z-50 bg-white bg-opacity-90 rounded-2xl shadow-2xl w-full mx-4 p-6 animate-fadeIn transition-all duration-300 ${getSizeClass(size)}`}>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {title && <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>}
                <div className="mb-4">{children}</div>
            </div>
        </div>
    )
}
