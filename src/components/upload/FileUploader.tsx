
import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, X, FileType, FileImage, FileVideo } from 'lucide-react';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
}

const FileUploader = ({ 
  onFileSelected, 
  acceptedFileTypes = "image/*,video/*", 
  maxSizeMB = 20 
}: FileUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSizeBytes) {
      toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return false;
    }
    
    // Check file type
    const fileType = file.type;
    if (!fileType.includes('image/') && !fileType.includes('video/')) {
      toast.error('Only image and video files are accepted.');
      return false;
    }
    
    return true;
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setCurrentFile(file);
        onFileSelected(file);
        toast.success('File uploaded successfully.');
      }
    }
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setCurrentFile(file);
        onFileSelected(file);
        toast.success('File uploaded successfully.');
      }
    }
  };
  
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  const removeFile = () => {
    setCurrentFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  
  const renderFileIcon = () => {
    if (!currentFile) return <Upload className="w-10 h-10 text-primary" />;
    
    const fileType = currentFile.type;
    if (fileType.includes('image/')) {
      return <FileImage className="w-10 h-10 text-blue-500" />;
    } else if (fileType.includes('video/')) {
      return <FileVideo className="w-10 h-10 text-purple-500" />;
    }
    
    return <FileType className="w-10 h-10 text-gray-500" />;
  };

  return (
    <Card 
      className={`border-2 border-dashed rounded-lg ${dragActive ? 'border-primary bg-primary/5' : 'border-border'} 
        transition-all duration-200 hover:border-primary/50`}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept={acceptedFileTypes}
        onChange={handleChange}
      />
      
      <div
        className="p-8 flex flex-col items-center justify-center gap-4"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {currentFile ? (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full bg-secondary p-3 rounded-lg mb-3">
              <div className="flex items-center gap-3">
                {renderFileIcon()}
                <div className="flex flex-col">
                  <span className="font-medium truncate max-w-[300px]">{currentFile.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={removeFile}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <Button variant="default" className="mt-2" onClick={handleButtonClick}>
              Upload Another File
            </Button>
          </div>
        ) : (
          <>
            <div className="p-4 rounded-full bg-primary/10">
              {renderFileIcon()}
            </div>
            <div className="text-center">
              <h3 className="font-medium text-lg mb-1">Upload Evidence File</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Drag and drop or click to upload an image or video file for analysis
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                Supported formats: JPG, PNG, MP4, MOV (Max {maxSizeMB}MB)
              </p>
              <Button onClick={handleButtonClick}>
                Select File
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default FileUploader;
