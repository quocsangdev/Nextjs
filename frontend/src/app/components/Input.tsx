import React from 'react'
import clsx from 'clsx'

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const CustomInput = ({
    label = '',
    className = '',
    id,
    name,
    placeholder = '',
    ...props
}: CustomInputProps) => {
    const baseClasses =
        'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 mb-3'

    const inputId = id || name || 'custom-input'

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type="text"
                id={inputId}
                name={name}
                placeholder={placeholder}
                className={clsx(baseClasses, className)}
                {...props}
            />
        </div>
    )
}

export default CustomInput
