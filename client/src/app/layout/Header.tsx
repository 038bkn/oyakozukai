import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
  back?: boolean;
};

export const Header = ({ title, back = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-center px-4 py-3 border-b border-[var(--color-border)] sticky top-0 z-50 bg-[var(--color-background)] backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
      {back && (
        <button type="button" onClick={() => navigate(-1)} className="absolute left-4">
          <ArrowUturnLeftIcon className="w-5 h-5 text-gray-700" />
        </button>
      )}
      <h1 className="text-base font-semibold text-gray-800">{title}</h1>
    </header>
  );
};
