import { Link } from 'react-router-dom';
import { routes } from '@/routes';

export function HomeHeroCTA(){
  return (
    <div className="relative z-10 flex flex-wrap gap-3 mt-6">
      <Link to={routes.book}
        className="px-5 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        aria-label="Zarezerwuj wydarzenie">
        Zarezerwuj wydarzenie
      </Link>
      <Link to={routes.events}
        className="px-5 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
        aria-label="Zobacz harmonogram">
        Zobacz harmonogram
      </Link>
    </div>
  );
}
