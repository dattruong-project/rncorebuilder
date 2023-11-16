export type AlertDialogParams = {
  icon?: React.ReactNode;
  title?: string;
  message: string;
  alertType?: 'Ok' | 'Confirm';
  okConfirmButtonText?: string;
  okConfirmButtonCallback(): void;
  cancelButtonText?: string;
  cancelButtonCallback?(): void;
};

export type AlertProviderProps = {
  children: React.ReactNode;
};

export type AlertContextData = {
  isShown: boolean;
  alertParams: AlertDialogParams;
  showAlert(alertParams: AlertDialogParams): void;
  closeAlert(): void;
};

export type TextStyle = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
};

export type ButtonStyle = {
  textStyle?: TextStyle;
  defaultText?: string;
  borderRadius?: number;
  backgroundColor?: string;
};

export type AlertProps = {
  defaultIcon?: React.ReactNode;
  generalFontStyle?: TextStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  okConfirmButtonStyle?: ButtonStyle;
  cancelButtonStyle?: ButtonStyle;
  transationDuration?: number;
};

