interface ModalContentProps {
  children: React.ReactNode;
}

export default function ModalContent({ children }: ModalContentProps) {
  return (
    <section className="flex flex-col gap-1 bg-white px-6 font-bold">
      {children}
    </section>
  );
}
