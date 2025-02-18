interface ModalTitleProps {
  children: React.ReactNode;
}

export default function ModalTitle({ children }: ModalTitleProps) {
  return <h2 className="px-6 pt-6 text-xl font-bold text-black">{children}</h2>;
}
