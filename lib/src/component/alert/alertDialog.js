import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useAlert } from './alertContext';
import { AlertButton, AlertButtonsContainer, AlertButtonText, AlertMessage, AlertTitle, Container, } from './styles';
export default function AlertDialog(params) {
    var _a, _b, _c;
    const { isShown, alertParams } = useAlert();
    const { height } = Dimensions.get('window');
    const translateY = useRef(new Animated.Value(height)).current;
    useEffect(() => {
        Animated.timing(translateY, {
            toValue: isShown ? 0 : height,
            duration: (params === null || params === void 0 ? void 0 : params.transationDuration) || 200,
            useNativeDriver: true,
        }).start();
    }, [isShown]);
    return (<Container style={{
            transform: [
                {
                    translateY: translateY.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, height],
                        extrapolate: 'clamp',
                    }),
                },
            ],
        }}>
      {(alertParams === null || alertParams === void 0 ? void 0 : alertParams.icon) || (params === null || params === void 0 ? void 0 : params.defaultIcon)}
      {(alertParams === null || alertParams === void 0 ? void 0 : alertParams.title) && (<AlertTitle {...params.titleStyle}>{alertParams.title}</AlertTitle>)}
      <AlertMessage {...params.messageStyle}>
        {alertParams.message}
      </AlertMessage>
      <AlertButtonsContainer>
        {alertParams.alertType === 'Ok' ? (<AlertButton {...params.okConfirmButtonStyle}>
            <AlertButtonText {...params.okConfirmButtonStyle} onPress={alertParams.okConfirmButtonCallback}>
              {(alertParams === null || alertParams === void 0 ? void 0 : alertParams.okConfirmButtonText) ||
                ((_a = params.okConfirmButtonStyle) === null || _a === void 0 ? void 0 : _a.defaultText) ||
                'Ok'}
            </AlertButtonText>
          </AlertButton>) : (<>
            <AlertButton {...params.okConfirmButtonStyle} onPress={alertParams.okConfirmButtonCallback}>
              <AlertButtonText {...params.okConfirmButtonStyle}>
                {(alertParams === null || alertParams === void 0 ? void 0 : alertParams.okConfirmButtonText) ||
                ((_b = params.okConfirmButtonStyle) === null || _b === void 0 ? void 0 : _b.defaultText) ||
                'Ok'}
              </AlertButtonText>
            </AlertButton>
            <AlertButton style={{ marginLeft: 13 }} onPress={alertParams === null || alertParams === void 0 ? void 0 : alertParams.cancelButtonCallback} {...params.cancelButtonStyle}>
              <AlertButtonText {...params.cancelButtonStyle}>
                {(alertParams === null || alertParams === void 0 ? void 0 : alertParams.cancelButtonText) ||
                ((_c = params.cancelButtonStyle) === null || _c === void 0 ? void 0 : _c.defaultText) ||
                'Cancel'}
              </AlertButtonText>
            </AlertButton>
          </>)}
      </AlertButtonsContainer>
    </Container>);
}
