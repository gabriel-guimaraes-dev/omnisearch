import { Link } from 'react-router-dom';

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 min-h-screen bg-zinc-950 text-zinc-100">
            <h1 className="text-4xl font-bold text-zinc-100">404</h1>
            <p className="text-sm text-zinc-400 mb-4">
                The page you are looking for does not exist.
            </p>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 rounded-lg transition-colors duration-200 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go back to home
            </Link>
        </div>
    )
}