import React from 'react';

interface ConfirmationModalProps {
    title?: string;
    description?: string;
    buttonText?: string;
    onButtonClick: () => void;
    cancelButtonText?: string;
    onCancelButtonClick?: () => void;
}

const SimpleConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                       title,
                                                                       description,
                                                                       buttonText,
                                                                       onButtonClick,
                                                                       cancelButtonText,
                                                                       onCancelButtonClick
                                                                   }) => {
    return (
        <div>
            <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <div
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-base font-semibold text-gray-900"
                                            id="dialog-title">{title}</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">{description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={onButtonClick} type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto">{buttonText}
                                </button>
                                <button onClick={onCancelButtonClick} type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">{cancelButtonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SimpleConfirmationModal;