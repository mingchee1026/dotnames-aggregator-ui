type Props = {
  children?: React.ReactNode;
  onCloseReset: () => void;
};

function RegistrationModal({ children, onCloseReset }: Props) {
  return (
    <div>
      <button
        className="w-fit px-6 py-2.5 bg-primary mt-10 border text-white rounded-3xl"
        onClick={() => {
          try {
            typeof window !== "undefined" &&
              // @ts-ignore
              window?.modal__register_domain?.showModal();
          } catch (error) {
            console.log(`🚀 ~ file: RegistrationModal.tsx:30 ~ error:`, error);
          }
        }}
      >
        Register{" "}
      </button>
      <dialog
        id="modal__register_domain"
        className="modal backdrop-brightness-50"
      >
        <form
          method="dialog"
          className="modal-box border-[0.5px] border-gray-400/50"
        >
          <button
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            onClick={() => {
              onCloseReset();
            }}
          >
            ✕
          </button>
          {children}
        </form>
      </dialog>
    </div>
  );
}

export default RegistrationModal;
