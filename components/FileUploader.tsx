import { Paperclip } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';

const MAX_FILE_SIZE_MB = 10;
// noinspection SpellCheckingInspection
const ACCEPTED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
];

interface FileUploaderProps {
    value?: File | null
    onFileSelect: (file: File | null) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({ value, onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (uploadedFile: File) => {
        // Validate file type
        if (!ACCEPTED_TYPES.includes(uploadedFile.type)) {
            toast.error('Invalid file type. Only PDF, DOC, DOCX, and TXT are allowed.');
            onFileSelect(null);
            return;
        }

        // Validate file size
        const fileSizeMB = uploadedFile.size / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            toast.error('File size exceeds 10MB limit.');
            onFileSelect(null);
            return;
        }
        onFileSelect(uploadedFile);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const uploadedFile = e.dataTransfer.files[0];
        if (uploadedFile) handleFile(uploadedFile);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) handleFile(uploadedFile);
    };

    return (
        <div className="w-full mx-auto">
            <div
                className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors group"
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
            >
                {value ? (
                    <>
                        <p className="text-lg font-medium">{value.name}</p>
                        <p className="text-sm ">
                            {(value.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Paperclip className='size-6 text-muted-foreground group-hover:text-primary' />
                        <p className="text-sm font-semibold mt-1">Click to select a PDF, DOC, or TXT file (max 10MB)</p>
                    </div>
                )}
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default FileUploader;
