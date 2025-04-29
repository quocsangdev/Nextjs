'use client'

import React from 'react'
import clsx from 'clsx'

type Color = 'primary' | 'edit' | 'secondary' | 'danger'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: Color
}

export default function Button({
    children,
    color = 'primary',
    className = '',
    ...props
}: ButtonProps) {
    const variantClasses: Record<Color, string> = {
        primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300',
        edit: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        secondary: 'text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-100',
        danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300'
    }

    const baseClasses = 'font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition-colors duration-200'

    return (
        <button
            className={clsx(baseClasses, variantClasses[color], className)}
            {...props}
        >
            {children}
        </button>
    )
}
