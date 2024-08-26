import { useNavigate } from 'react-router-dom';

interface ErrorAlertProps {
  title: string;
  message: string;
}

export default function ErrorAlert({ title, message }: ErrorAlertProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        </header>

        <div className="mb-6 text-gray-700">
          <p>{message}</p>
        </div>

        <footer className="text-right">
          <button
            onClick={() => {
              navigate('../lobby');
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            OK
          </button>
        </footer>
      </div>
    </div>
  );
}
