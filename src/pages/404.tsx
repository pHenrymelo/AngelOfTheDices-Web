import { Link } from 'react-router';
import criticalFailure from '@/assets/critcal-failure.svg';

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="flex flex-col gap-4 text-4xl font-bold justify-center items-center">
        <div className="w-40 h-40 bg-red-500 dark:bg-red-400 rounded-full">
          <img src={criticalFailure} alt="" />
        </div>
        Ops... Falha crítica.
      </h1>
      <p className="text-accent-foreground">
        Back to{' '}
        <Link to="/" className="text-violet-500 dark:text-violet-400">
          Home
        </Link>{' '}
      </p>
    </div>
  );
}
