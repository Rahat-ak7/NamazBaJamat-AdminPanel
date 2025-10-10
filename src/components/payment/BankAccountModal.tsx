// 'use client';

// import { useState } from 'react';
// import { BankAccountFormData } from '@/types/payment';
// import { XMarkIcon } from '@heroicons/react/24/outline';

// interface BankAccountModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: BankAccountFormData) => void;
//   isLoading?: boolean;
// }

// const defaultFormData: BankAccountFormData = {
//   bankLogo: '',
//   bankName: '',
//   accountHolderName: '',
//   accountNumber: '',
//   iban: ''
// };

// export default function BankAccountModal({ 
//   isOpen, 
//   onClose, 
//   onSubmit, 
//   isLoading = false 
// }: BankAccountModalProps) {
//   const [formData, setFormData] = useState<BankAccountFormData>(defaultFormData);
//   const [errors, setErrors] = useState<Partial<BankAccountFormData>>({});

//   const resetForm = () => {
//     setFormData(defaultFormData);
//     setErrors({});
//   };

//   if (!isOpen) return null;

//   const validateForm = (): boolean => {
//     const newErrors: Partial<BankAccountFormData> = {};

//     if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
//     if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required';
//     if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
//     if (!formData.iban.trim()) newErrors.iban = 'IBAN is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSubmit(formData);
//       resetForm();
//     }
//   };

//   const handleInputChange = (field: keyof BankAccountFormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }));
//     }
//   };

//   const handleClose = () => {
//     resetForm();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-md w-full">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-primary">
//             Register New Bank Account
//           </h2>
//           <button
//             onClick={handleClose}
//             disabled={isLoading}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
//           >
//             <XMarkIcon className="h-6 w-6 text-gray-400" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {/* Bank Logo */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Bank Logo 
//             </label>
//             <div className="flex items-center space-x-4">
//               <div className="flex-1">
//                 <input
//                   type="file"
//                   placeholder="Choose bank logo"
//                   value={formData.bankLogo}
//                   onChange={(e) => handleInputChange('bankLogo', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Bank Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Bank Name *
//             </label>
//             <input
//               type="text"
//               placeholder="Enter bank name..."
//               value={formData.bankName}
//               onChange={(e) => handleInputChange('bankName', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               disabled={isLoading}
//             />
//             {errors.bankName && (
//               <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
//             )}
//           </div>

//           {/* Account Holder Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Account Holder Name *
//             </label>
//             <input
//               type="text"
//               placeholder="Enter account holder name..."
//               value={formData.accountHolderName}
//               onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               disabled={isLoading}
//             />
//             {errors.accountHolderName && (
//               <p className="text-red-500 text-sm mt-1">{errors.accountHolderName}</p>
//             )}
//           </div>

//           {/* Account Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Account Number *
//             </label>
//             <input
//               type="text"
//               placeholder="Enter account number..."
//               value={formData.accountNumber}
//               onChange={(e) => handleInputChange('accountNumber', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               disabled={isLoading}
//             />
//             {errors.accountNumber && (
//               <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
//             )}
//           </div>

//           {/* IBAN */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               IBAN *
//             </label>
//             <input
//               type="text"
//               placeholder="Enter IBAN..."
//               value={formData.iban}
//               onChange={(e) => handleInputChange('iban', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               disabled={isLoading}
//             />
//             {errors.iban && (
//               <p className="text-red-500 text-sm mt-1">{errors.iban}</p>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-4 pt-4">
//             <button
//               type="button"
//               onClick={handleClose}
//               disabled={isLoading}
//               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               ) : (
//                 'Create Account'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// src/components/payment/BankAccountModal.tsx
'use client';

import { useState, useRef } from 'react';
import { BankAccountFormData } from '@/types/payment';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Create a separate interface for errors since they should be strings
interface FormErrors {
  bankLogo?: string;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  iban?: string;
}

interface BankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BankAccountFormData) => void;
  isLoading?: boolean;
}

const defaultFormData: BankAccountFormData = {
  bankLogo: null,
  bankName: '',
  accountHolderName: '',
  accountNumber: '',
  iban: ''
};

export default function BankAccountModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading = false 
}: BankAccountModalProps) {
  const [formData, setFormData] = useState<BankAccountFormData>(defaultFormData);
  const [errors, setErrors] = useState<FormErrors>({}); // Use FormErrors interface
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormData(defaultFormData);
    setErrors({});
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}; // Use FormErrors instead of Partial<BankAccountFormData>

    if (!formData.bankLogo) newErrors.bankLogo = 'Bank logo is required';
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.iban.trim()) newErrors.iban = 'IBAN is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof BankAccountFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, bankLogo: 'Please select an image file' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, bankLogo: 'File size must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, bankLogo: file }));
      
      // Create preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      if (errors.bankLogo) {
        setErrors(prev => ({ ...prev, bankLogo: undefined }));
      }
    } else {
      setFormData(prev => ({ ...prev, bankLogo: null }));
      setPreviewUrl(null);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Clean up preview URL when component unmounts
  const removeFilePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-primary">
            Register New Bank Account
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <XMarkIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Bank Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Logo *
            </label>
            
            {/* File input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="bankLogo"
              disabled={isLoading}
            />
            
            <label
              htmlFor="bankLogo"
              className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors text-center"
            >
              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={previewUrl}
                    alt="Bank logo preview"
                    className="h-16 w-16 object-contain mb-2 rounded"
                    onLoad={removeFilePreview}
                  />
                  <span className="text-sm text-gray-600">Click to change image</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Click to upload bank logo</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                </div>
              )}
            </label>
            
            {errors.bankLogo && (
              <p className="text-red-500 text-sm mt-1">{errors.bankLogo}</p>
            )}
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Name *
            </label>
            <input
              type="text"
              placeholder="Enter bank name..."
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            {errors.bankName && (
              <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
            )}
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Holder Name *
            </label>
            <input
              type="text"
              placeholder="Enter account holder name..."
              value={formData.accountHolderName}
              onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            {errors.accountHolderName && (
              <p className="text-red-500 text-sm mt-1">{errors.accountHolderName}</p>
            )}
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number *
            </label>
            <input
              type="text"
              placeholder="Enter account number..."
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
            )}
          </div>

          {/* IBAN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IBAN *
            </label>
            <input
              type="text"
              placeholder="Enter IBAN..."
              value={formData.iban}
              onChange={(e) => handleInputChange('iban', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            {errors.iban && (
              <p className="text-red-500 text-sm mt-1">{errors.iban}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
