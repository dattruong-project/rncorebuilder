import { Animated } from 'react-native';
import styled, { css } from 'styled-components/native';
import { ButtonStyle, TextStyle } from './type';

type ModalBackgroundProps = {
  isShown: boolean;
};

export const ModalBackground = styled.View<ModalBackgroundProps>`
  display: ${(props) => (props.isShown ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #232424;
  opacity: 0.95;
  flex: 1;
  justify-content: center;
  align-items: center
`;

export const Container = styled(Animated.View)`
  max-height: 600px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background: #ffffff;
  padding: 15px 11px 25px;
  border-radius: 13px;
  margin: 20px;
`;

export const AlertTitle = styled.Text<TextStyle>`
  ${(props) =>
    props.fontFamily &&
    css`
      font-family: ${props.fontFamily};
    `}

  font-size: ${(props) => props.fontSize || 19}px;
  font-weight: ${(props) => props.fontWeight || 'bold'};
  color: ${(props) => props.color || '#000'};
  margin-bottom: 11px;
`;

export const AlertMessage = styled.Text<TextStyle>`
  ${(props) =>
    props.fontFamily &&
    css`
      font-family: ${props.fontFamily};
    `}

  font-size: ${(props) => props.fontSize || 17}px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  color: ${(props) => props.color || '#333'};
`;

export const AlertButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 21px;
  padding: 0px 11px;
`;

type AlertButtonProps = ButtonStyle & {
  width?: number;
};
export const AlertButton = styled.TouchableOpacity<AlertButtonProps>`
  display: flex;
  width: ${(props) => props.width || 50}%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 11px;
  background: ${(props) => props.backgroundColor || '#ccc'};
  border-radius: ${(props) => props.borderRadius || 9}px;
`;

export const AlertButtonText = styled.Text<ButtonStyle>`
  ${(props) =>
    props.textStyle?.fontFamily &&
    css`
      font-family: ${props.textStyle.fontFamily};
    `}

  font-size: ${(props) => props.textStyle?.fontSize || 17}px;
  font-weight: ${(props) => props.textStyle?.fontWeight || 'normal'};
  color: ${(props) => props.textStyle?.color || '#000'};
`;