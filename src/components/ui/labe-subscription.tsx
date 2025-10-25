import Link from "next/link";


export function LabelSubscription({ expired }: { expired: boolean }) {
  return (
    <div className="bg-red-400 text-white text-sm md:text-base px-3 py-2 my-4 rounded-md flex items-center justify-between">
      <div>
        {expired ? (
          <h3>
            Sua assinatura expirou ou você está no período de teste gratuito.{" "}
          </h3>
        ) : (
          <h3>
            Você excerceu o período de teste gratuito.{" "}
          </h3>
        )}
        <p>
          Acesse o seu plano para verificar
        </p>
      </div>

      <Link
        href="/dashboard/plans"
        className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition"
      >
        Ver planos
      </Link>
    </div>
  )
}
