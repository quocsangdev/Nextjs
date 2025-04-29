import React from 'react'
import clsx from 'clsx'

export interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}

const CustomTextarea = ({
    label = '',
    className = '',
    id,
    name,
    placeholder = '',
    ...props
}: CustomTextareaProps) => {
    const baseClasses =
        'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none h-30'

    const textareaId = id || name || 'custom-textarea'

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                name={name}
                placeholder={placeholder}
                className={clsx(baseClasses, className)}
                {...props}
            />
        </div>
    )
}

export default CustomTextarea
