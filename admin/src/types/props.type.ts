import { IHandleCloseOptions } from '../hooks';

export interface IComponentProps {
  slug: string;
}

export interface IModalProps {
  handleClose: (options?: IHandleCloseOptions) => void;
}
