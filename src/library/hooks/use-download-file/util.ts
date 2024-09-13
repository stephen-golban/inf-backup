import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';

import { isIos } from '@library/method';

import type { ToastType } from 'react-native-toast-notifications';
import { MMKV_KEY } from '@library/constants';
import { loadString } from '@library/storage';
import { translate } from '@translations/translate';

const headers = {
  Authorization: `Bearer ${loadString(MMKV_KEY.APP_TOKEN)}`,
};

function createFileName(fileUrl: string, id: string) {
  const splitted = fileUrl.split('/');
  return splitted.slice(3).join('-');
}

function onDownloadResponse(localFilePath: string, fileName: string, toast: ToastType, showToast: boolean) {
  if (isIos) {
    const options = {
      url: `file://${localFilePath}`,
      failOnCancel: false,
    };

    return Share.open(options)
      .then(shareResponse => {
        if (shareResponse.success) {
          showToast && toast.show(translate('ui:success'), { type: 'success' });
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.error('Error sharing the file: ', err);
        toast.show(translate('validation:error:have_error'), { type: 'danger' });
        return false;
      });
  } else {
    showToast && toast.show(`${translate('ui:success')} \n${fileName}`, { type: 'success' });
    return true;
  }
}

async function createDownloadConfig(fileUrl: string, fileName: string) {
  const { dirs } = ReactNativeBlobUtil.fs;

  return ReactNativeBlobUtil.config({
    fileCache: true,
    path: `${dirs.DocumentDir}/${fileName}`,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: fileName,
      description: 'File downloaded by download manager.',
    },
  }).fetch('GET', fileUrl, headers);
}

export { createFileName, onDownloadResponse, createDownloadConfig };
