import React, { useState } from 'react';
import {
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import axios from '../config/axios';
import { isAxiosError } from 'axios';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import apiPath from '../config/api-path';

// Define the type for the status response
type StatusResponse = {
  status?: string;
  avatar_id?: string;
  start_time?: string;
};

export default function AvatarTrainingPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [avatarId, setAvatarId] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState('');

  // Dropzone setup
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setMessage('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [] },
    multiple: false,
  } as unknown as DropzoneOptions);

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setMessage('');
    setStatus(null);
    setStatusError('');
    try {
      const formData = new FormData();
      formData.append('video', selectedFile);
      // Adjust the endpoint as needed
      const response = await axios.post(apiPath.avatar_train, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data && response.data.success) {
        setMessage(response.data.response.message);
        setAvatarId(response.data.response.avatar_id);
      } else {
        setMessage('Upload failed.');
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Upload error.');
      } else {
        setMessage('Upload error.');
      }
    } finally {
      setUploading(false);
    }
  };

  // Fetch training status
  const fetchStatus = async () => {
    if (!avatarId) return;
    setStatusLoading(true);
    setStatusError('');
    try {
      // Adjust the endpoint as needed
      const response = await axios.get(
        `${apiPath.avatar_train_status}?avatar_id=${avatarId}`
      );
      setStatus(response.data);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setStatusError(
          err.response?.data?.message || 'Failed to fetch status.'
        );
      } else {
        setStatusError('Failed to fetch status.');
      }
    } finally {
      setStatusLoading(false);
    }
  };

  // Optionally, auto-fetch status when avatarId changes
  React.useEffect(() => {
    if (avatarId) {
      fetchStatus();
    }
    // eslint-disable-next-line
  }, [avatarId]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Avatar Training
      </Typography>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Static image or max 10 second loop video
          </Typography>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #1976d2',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: isDragActive ? '#e3f2fd' : 'background.paper',
              mb: 2,
            }}
          >
            {/* @ts-expect-error react-dropzone typing issue */}
            <input {...getInputProps({ refKey: 'ref' })} />
            <CloudUploadIcon sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="body1" sx={{ mt: 1 }}>
              {isDragActive
                ? 'Drop the file here...'
                : selectedFile
                  ? `Selected: ${selectedFile.name}`
                  : 'Drag & drop an image or video here, or click to select'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            sx={{ ml: 2 }}
          >
            {uploading ? <CircularProgress size={24} /> : 'Train'}
          </Button>
          {message && (
            <Alert severity="info" sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
          {avatarId && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              <b>Current Avatar ID:</b> {avatarId}
            </Typography>
          )}
        </CardContent>
      </Card>
      {avatarId && (
        <Card variant="outlined">
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Training Status</Typography>
              <Button onClick={fetchStatus} disabled={statusLoading}>
                Refresh
              </Button>
            </Box>
            {statusLoading ? (
              <CircularProgress sx={{ mt: 2 }} />
            ) : statusError ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {statusError}
              </Alert>
            ) : status ? (
              <Box sx={{ mt: 2 }}>
                <Typography>
                  <b>Status:</b> {status.status}
                </Typography>
                <Typography>
                  <b>Avatar ID:</b> {status.avatar_id}
                </Typography>
                <Typography>
                  <b>Started At:</b>{' '}
                  {status.start_time
                    ? new Date(status.start_time).toLocaleString()
                    : ''}
                </Typography>
              </Box>
            ) : (
              <Typography sx={{ mt: 2 }}>No status available.</Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
