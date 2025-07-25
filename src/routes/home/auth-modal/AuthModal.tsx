import { Dialog } from 'radix-ui';

export default function AuthModal() {
  return (
    <>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title></Dialog.Title>
        <Dialog.Description></Dialog.Description>
      </Dialog.Content>
    </>
  );
}
