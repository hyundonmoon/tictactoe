export default function ResetBtn({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      className="w-14 h-14 p-4 bg-rose-500 rounded-lg overflow-hidden flex justify-center items-center hover:bg-rose-600"
      onClick={handleClick}
    >
      <svg viewBox="0 0 21 21" className="text-white stroke-current">
        <g
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 3.5c2.414 1.377 4 4.022 4 7a8 8 0 1 1-8-8" />
          <path d="M14.5 7.5v-4h4" />
        </g>
      </svg>
    </button>
  );
}
