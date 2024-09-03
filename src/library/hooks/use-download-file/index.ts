import ReactNativeBlobUtil from 'react-native-blob-util';
import { useState } from 'react';

import { useToast } from 'react-native-toast-notifications';

import { createDownloadConfig, createFileName, onDownloadResponse } from './util';
import { translate } from '@translations/translate';

const useDownloadFile = (showToast: boolean = true) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const downloadDocument = async (fileUrl?: string, id?: string, name?: string, base64Data?: string) => {
    setLoading(true);

    const fileName = name ? name : createFileName(fileUrl || '', id || '');
    try {
      let localFilePath: string;

      if (base64Data) {
        // Convert base64 to PDF
        const dirs = ReactNativeBlobUtil.fs.dirs;
        localFilePath = `${dirs.DocumentDir}/${fileName}`;
        await ReactNativeBlobUtil.fs.writeFile(localFilePath, base64Data, 'base64');
      } else if (fileUrl) {
        // Download file from URL
        const downloadResult = await createDownloadConfig(fileUrl, fileName);
        if (!downloadResult) {
          throw new Error('Download failed');
        }
        localFilePath = downloadResult.path();
      } else {
        throw new Error('No file URL or base64 data provided');
      }

      const response = await onDownloadResponse(localFilePath, fileName, toast, showToast);
      if (response) {
        setIsDownloaded(true);

        // Set timeout to reset isDownloaded to false after 2.5 seconds
        setTimeout(() => {
          setIsDownloaded(false);
        }, 2500);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.show(translate('validation:error:have_error'), { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return { downloadDocument, loading, isDownloaded };
};

export default useDownloadFile;
