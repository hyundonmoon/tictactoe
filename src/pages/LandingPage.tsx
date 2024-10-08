import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import githubIcon from '../assets/github.svg';
import UserNicknameModal from '../components/modals/UserNicknameModal';

export default function LandingPage() {
  const navigate = useNavigate();
  const nicknameModalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <header className="mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-wide drop-shadow-lg">
            Tic Tac Toe!
          </h1>
        </header>

        <div className="flex flex-col space-y-6">
          <Link
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            to={'single-player'}
          >
            Single player
          </Link>

          <button
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => nicknameModalRef.current?.showModal()}
          >
            Multi player
          </button>
        </div>

        <footer className="mt-16">
          <a
            href="https://github.com/hyundonmoon/tictactoe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubIcon}
              alt="Link to this project's GitHub repo"
              className="w-8 h-8"
            />
          </a>{' '}
        </footer>
      </div>

      <UserNicknameModal
        ref={nicknameModalRef}
        onSubmit={() => {
          navigate('/multi-player/lobby');
        }}
        disableIfNotChanged={false}
      />
    </>
  );
}
