import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

type CustomImagePickerProps = {
    onSelectImage: (image: ImagePicker.ImagePickerResult) => void;
    onImagePickerCancel: () => void;
    onImagePickerError: (error: string) => void;
    customView: React.ReactNode;
};

const CustomImagePicker: React.FC<CustomImagePickerProps> = (props: CustomImagePickerProps) => {
    const { onSelectImage, onImagePickerCancel, onImagePickerError, customView } = props;
    const openImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted) {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                onSelectImage(result);
            } else {
                onImagePickerCancel();
            }
        } else {
            onImagePickerError('Permission not granted');
        }
    };

    return (
        <>
            <TouchableOpacity onPress={() => openImagePicker()}>
                {customView}
            </TouchableOpacity>
        </>
    );
};

export default CustomImagePicker;