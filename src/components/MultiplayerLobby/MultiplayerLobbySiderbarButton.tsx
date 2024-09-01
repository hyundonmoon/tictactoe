interface MultiplayerLobbySiderbarButtonProps {
  baseColorClass: string;
  hoverColorClass: string;
  text: string;
  handleClick: () => void;
}

export default function MultiplayerLobbySidebarButton({
  baseColorClass,
  hoverColorClass,
  text,
  handleClick,
}: MultiplayerLobbySiderbarButtonProps) {
  return (
    <button
      className={`w-full text-white text-sm font-bold py-1 px-0 rounded-md shadow-sm transition-all duration-300 md:py-2 md:px-4 md:shadow-md md:text-base ${baseColorClass} hover:${hoverColorClass}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
