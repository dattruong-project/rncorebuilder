import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useAlert } from './alertContext';
import { AlertProps } from './type';
import {   AlertButton,
    AlertButtonsContainer,
    AlertButtonText,
    AlertMessage,
    AlertTitle,
    Container, } from './styles';

export default function AlertDialog(params: AlertProps) {
  const { isShown, alertParams } = useAlert();
  const { height } = Dimensions.get('window');
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isShown ? 0 : height,
      duration: params?.transationDuration || 200,
      useNativeDriver: true,
    }).start();
  }, [isShown]);

  return (
    <Container
      style={{
        transform: [
          {
            translateY: translateY.interpolate({
              inputRange: [0, 100],
              outputRange: [0, height],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      {alertParams?.icon || params?.defaultIcon}
      {alertParams?.title && (
        <AlertTitle {...params.titleStyle}>{alertParams.title}</AlertTitle>
      )}
      <AlertMessage {...params.messageStyle}>
        {alertParams.message}
      </AlertMessage>
      <AlertButtonsContainer>
        {alertParams.alertType === 'Ok' ? (
          <AlertButton {...params.okConfirmButtonStyle}>
            <AlertButtonText
              {...params.okConfirmButtonStyle}
              onPress={alertParams.okConfirmButtonCallback}
            >
              {alertParams?.okConfirmButtonText ||
                params.okConfirmButtonStyle?.defaultText ||
                'Ok'}
            </AlertButtonText>
          </AlertButton>
        ) : (
          <>
            <AlertButton
              {...params.okConfirmButtonStyle}
              onPress={alertParams.okConfirmButtonCallback}
            >
              <AlertButtonText {...params.okConfirmButtonStyle}>
                {alertParams?.okConfirmButtonText ||
                  params.okConfirmButtonStyle?.defaultText ||
                  'Ok'}
              </AlertButtonText>
            </AlertButton>
            <AlertButton
              style={{ marginLeft: 13 }}
              onPress={alertParams?.cancelButtonCallback}
              {...params.cancelButtonStyle}
            >
              <AlertButtonText {...params.cancelButtonStyle}>
                {alertParams?.cancelButtonText ||
                  params.cancelButtonStyle?.defaultText ||
                  'Cancel'}
              </AlertButtonText>
            </AlertButton>
          </>
        )}
      </AlertButtonsContainer>
    </Container>
  );
}