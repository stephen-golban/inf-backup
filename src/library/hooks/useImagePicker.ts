import { useState } from 'react';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import ImageResizer, { Response } from '@bam.tech/react-native-image-resizer';
import { PermissionStatus, PERMISSIONS, request } from 'react-native-permissions';
import { ImagePickerResponse, Asset, launchImageLibrary } from 'react-native-image-picker';

export type ReactNativeFileType = { uri: string; name?: string; type?: string };

type useImagePickerReturnType = {
  imageUri: Asset | null;
  base64Image: string | null;
  permissionStatus: PermissionStatus | null;
  createReactNativeFile: (asset: Asset) => ReactNativeFileType;
  selectImage: () => Promise<{ asset: Asset | null; base64: string | null }>;
};

export const createReactNativeFile = (asset: Asset) => {
  const uri = asset.uri;
  const extension = uri?.split('.').pop();
  const file = {
    uri,
    type: asset.type || `image/${extension}`,
    name: asset?.fileName || `filename.${extension}`,
  } as ReactNativeFileType;

  return file;
};

export default function useImagePicker(): useImagePickerReturnType {
  const [imageUri, setImageUri] = useState<Asset | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);

  console.log('imageUri', base64Image);

  const requestPermission = async () => {
    const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    const status = await request(permissionType);
    setPermissionStatus(status);
    return status;
  };

  const convertToBase64 = async (uri: string) => {
    try {
      const base64String = await RNFS.readFile(uri, 'base64');
      const img = `data:image/jpeg;base64,${base64String}`;
      setBase64Image(img);
      return img;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const resizeImage = async (uri: string) => {
    try {
      const response: Response = await ImageResizer.createResizedImage(uri, 800, 600, 'JPEG', 80, 0, undefined, false, {
        mode: 'contain',
        onlyScaleDown: false,
      });
      if (response.uri) {
        return await convertToBase64(response.uri);
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const openImagePicker = () => {
    return new Promise<{ asset: Asset | null; base64: string | null }>(resolve => {
      launchImageLibrary({ mediaType: 'photo', includeBase64: false }, async (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          resolve({ asset: null, base64: null });
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          resolve({ asset: null, base64: null });
        } else if (response.assets && response.assets[0]?.uri) {
          const asset = response.assets[0];
          setImageUri(asset);
          if (asset.base64) {
            const base64 = `data:image/jpeg;base64,${asset.base64}`;
            setBase64Image(base64);
            resolve({ asset, base64 });
          } else if (asset.uri) {
            const base64 = await resizeImage(asset.uri);
            resolve({ asset, base64 });
          }
        }
      });
    });
  };

  const selectImage = async (): Promise<{ asset: Asset | null; base64: string | null }> => {
    const status = await requestPermission();
    if (status === 'granted') {
      return await openImagePicker();
    }
    return { asset: null, base64: null };
  };

  return {
    imageUri,
    base64Image,
    selectImage,
    permissionStatus,
    createReactNativeFile,
  };
}
