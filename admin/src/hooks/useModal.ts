import { useState } from 'react';

interface IOptions {
  confirmClose?: boolean;
  isOpen?: boolean;
}

export interface IHandleCloseOptions {
  withConfirmation?: boolean;
}

const defaultOptions: Required<IOptions> = {
  confirmClose: false,
  isOpen: false,
};

export const useModal = (
  options?: IOptions
): [boolean, (options?: IHandleCloseOptions) => void, () => void] => {
  const { confirmClose, isOpen } = {
    ...defaultOptions,
    ...options,
  };

  const [isModalOpened, setIsModalOpened] = useState(isOpen);

  const handleOpenModal = () => setIsModalOpened(true);
  const handleCloseModal = (options?: IHandleCloseOptions) => {
    const { withConfirmation = confirmClose } = options || {};
    if (
      withConfirmation === true &&
      !confirm('Are you sure you want to close this modal? You may lose your data')
    )
      return;

    setIsModalOpened(false);
  };

  return [isModalOpened, handleCloseModal, handleOpenModal];
};
