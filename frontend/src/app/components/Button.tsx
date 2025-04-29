'use client'

import React from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: Variant
    size?: Size
}
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded transition-colors duration-200'

    const variantClasses: Record<Variant, string> = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    }

    const sizeClasses: Record<Size, string> = {
        sm: 'text-sm py-1 px-2',
        md: 'text-base py-2 px-4',
        lg: 'text-lg py-3 px-6',
    }

    return (
        <button
            className={clsx(
                baseStyles,
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
