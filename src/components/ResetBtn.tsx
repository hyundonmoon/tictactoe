export default function ResetBtn() {
  return (
    <button className="w-20 h-20 p-4 bg-teal-600 rounded-3xl overflow-hidden flex justify-center items-center">
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
