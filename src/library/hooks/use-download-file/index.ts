import ReactNativeBlobUtil from 'react-native-blob-util';
import { useState } from 'react';

import { useToast } from 'react-native-toast-notifications';

import { createDownloadConfig, createFileName, onDownloadResponse } from './util';
import { translate } from '@translations/translate';

const useDownloadFile = (showToast: boolean = true) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const downloadDocument = async (fileName: string, base64Data?: string) => {
    setLoading(true);

    try {
      let localFilePath: string;

      if (base64Data) {
        // Convert base64 to PDF
        const dirs = ReactNativeBlobUtil.fs.dirs;
        localFilePath = `${dirs.DocumentDir}/${fileName}`;
        await ReactNativeBlobUtil.fs.writeFile(localFilePath, base64Data, 'base64');
      } else {
        throw new Error('No file URL or base64 data provided');
      }

      const response = await onDownloadResponse(localFilePath, fileName, toast, showToast);
      if (response) {
        setIsDownloaded(true);

        setTimeout(() => {
          setIsDownloaded(false);
        }, 500);
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
