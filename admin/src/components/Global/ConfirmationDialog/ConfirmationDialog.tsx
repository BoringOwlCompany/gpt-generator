import React from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Flex, Typography } from '@strapi/design-system';
import { ExclamationMarkCircle, Trash } from '@strapi/icons';

interface IProps {
  isVisible: boolean;
  handleClose: () => void;

  onConfirm: () => void;

  description?: string;
}

const ConfirmationDialog = ({
  isVisible,
  handleClose,
  onConfirm,
  description = 'Are you sure you want to delete this?',
}: IProps) => {
  return (
    <Dialog onClose={handleClose} title="Confirmation" isOpen={isVisible}>
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Flex direction="column" alignItems="center" gap={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">{description}</Typography>
          </Flex>
        </Flex>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={handleClose} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            variant="danger-light"
            startIcon={<Trash />}
            onClick={() => {
              onConfirm(), handleClose();
            }}
          >
            Confirm
          </Button>
        }
      />
    </Dialog>
  );
};

export default ConfirmationDialog;
