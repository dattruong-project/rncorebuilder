import { useCallback } from 'react';
import { useAlert } from './alertContext';
import { AlertProps } from './type';
import { ModalBackground } from './styles';
import AlertDialog from './alertDialog';

export default function AlertBuilder({ ...params }: AlertProps) {
  const { isShown, closeAlert } = useAlert();

  const handleModalClose = useCallback(() => {
    closeAlert();
    return true;
  }, [closeAlert]);

  return (
    <>
      <ModalBackground
        isShown={isShown}
        onStartShouldSetResponder={handleModalClose}
      >
        <AlertDialog {...params} />
      </ModalBackground>
    </>
  );
}