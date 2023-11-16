import React from 'react';
import * as ImagePicker from 'expo-image-picker';
type CustomImagePickerProps = {
    onSelectImage: (image: ImagePicker.ImagePickerResult) => void;
    onImagePickerCancel: () => void;
    onImagePickerError: (error: string) => void;
    customView: React.ReactNode;
};
declare const CustomImagePicker: React.FC<CustomImagePickerProps>;
export default CustomImagePicker;
