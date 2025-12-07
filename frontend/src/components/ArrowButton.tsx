import React from 'react';

interface ArrowButtonProps {
    name: string;
    onClick?: () => void;
    href?: string;
}

export default function ArrowButton({ name, onClick, href }: ArrowButtonProps) {

    const baseClasses =
        'inline-flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition';
    if (href) {
        return (
            <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
                <span>{name}</span>
                <span className="ml-2">→</span>
            </a>
        );
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            <span>{name}</span>
            <span className="ml-2">→</span>
        </button>
    );
}
