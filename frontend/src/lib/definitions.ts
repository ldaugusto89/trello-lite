
export type SignInFormProps = {
  panelActive: boolean;
  register: any;
  handleSubmit: any;
  onSubmit: (data: any) => void;
};

export type SignUpFormProps = {
  panelActive: boolean;
  register: any;
  handleSubmit: any;
  onSubmit: (data: any) => void;
};

export type OverlayProps = {
  panelActive: boolean;
  onClick: (value: boolean) => void;
}