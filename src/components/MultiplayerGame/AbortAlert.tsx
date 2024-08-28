import { useNavigate } from 'react-router-dom';

interface AbortAlertProps {
  handleSubmit: () => void;
}

export default function AbortAlert({ handleSubmit }: AbortAlertProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        onSubmit={(e) => {
          console.log('submitted');
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Victory by Default! 🏆</h2>
        <p className="mb-4">
          Looks like your opponent couldn't handle the heat and made a quick
          escape! Guess that makes you the winner by default. 🎉
        </p>
        <p className="mb-4">
          Do you want to stick around and wait for another brave soul to
          challenge you, or take this sweet victory and head back to the lobby?
        </p>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              navigate('../lobby');
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300"
          >
            Leave Room
          </button>

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300"
          >
            Wait
          </button>
        </div>
      </form>
    </div>
  );
}
