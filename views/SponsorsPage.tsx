import { Link } from "react-router-dom";
import { routes } from "../routes";

export default function SponsorsPage() {
    return (
        <main className="max-w-6xl mx-auto px-6 py-12">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold">Sponsorzy</h1>
                <p className="mt-2 text-slate-600">
                    Dziękujemy partnerom za wsparcie. Dołącz i pomóż nam tworzyć dostępne wydarzenia.
                </p>
            </header>

            <section className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl bg-white/70 p-6 shadow">
                    <h3 className="font-semibold">Pakiet Brąz</h3>
                    <p className="text-sm text-slate-600">Logo na stronie i w materiałach.</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-6 shadow">
                    <h3 className="font-semibold">Pakiet Srebro</h3>
                    <p className="text-sm text-slate-600">Logo + wzmianka w social media.</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-6 shadow">
                    <h3 className="font-semibold">Pakiet Złoto</h3>
                    <p className="text-sm text-slate-600">Widoczność na wydarzeniach.</p>
                </div>
            </section>

            <section className="mt-12">
                <div className="rounded-2xl bg-cyan-50 p-6">
                    <h2 className="text-2xl font-bold mb-2">Zostań Sponsorem</h2>
                    <p className="mb-4">Napisz do nas – przygotujemy propozycję współpracy.</p>
                    <Link to={routes.contact} className="inline-block rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700">
                        Kontakt
                    </Link>
                </div>
            </section>
        </main>
    );
}
