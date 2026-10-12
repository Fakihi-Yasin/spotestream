export const metadata = {
  title: "Siden finnes ikke | SpoteStream",
  description: "Vi finner ikke siden du leter etter. Gå til SpoteStreams forside for informasjon om abonnement, oppsett og kontakt.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
    <h1 className="font-orbitron text-3xl mb-6">Siden finnes ikke</h1>
    <p className="mb-6">Lenken kan være feil, eller siden kan være flyttet.</p>
    <a href="/" className="btn-no rounded-full px-6 py-3">Gå til forsiden</a>
  </main>;
}
