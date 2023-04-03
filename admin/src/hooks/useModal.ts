import { useState } from 'react';

export const useModal = (initialState = false): [boolean, () => void, () => void] => {
  const [isModalOpened, setIsModalOpened] = useState(initialState);

  const handleOpenModal = () => setIsModalOpened(true);
  const handleCloseModal = (withConfirmation = true) => {
    if (
      withConfirmation &&
      !confirm('Are you sure you want to close this modal? You may lose your data')
    )
      return;

    setIsModalOpened(false);
  };

  return [isModalOpened, handleCloseModal, handleOpenModal];
};
