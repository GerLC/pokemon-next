import { useEvolutionChain } from "@/features/pokedex/hooks/use-pokemon";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PokemonEvolutionProps {
  name: string;
}

export function PokemonEvolution({ name }: PokemonEvolutionProps) {
  const { data: chain, isLoading } = useEvolutionChain(name);

  if (isLoading) {
    return (
      <div className="col-span-1 lg:col-span-2 bg-surface-card border border-border rounded-[var(--radius-card)] p-6 flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!chain || chain.length <= 1) return null;

  return (
    <div className="col-span-1 lg:col-span-2 bg-surface-card border border-border rounded-[var(--radius-card)] p-6 flex flex-col gap-6">
      <h3 className="text-xl font-bold text-on-surface">Evolution Chain</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full">
        {chain.map((evo, index) => (
          <div key={evo.id} className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
            <Link 
              href={`/pokedex/${evo.name}`}
              className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
            >
              <div className={`w-32 h-32 md:w-40 md:h-40 relative rounded-full bg-surface border-2 ${evo.name === name ? 'border-primary' : 'border-border group-hover:border-primary/50'} flex items-center justify-center p-4 transition-colors`}>
                <Image
                  src={evo.artwork}
                  alt={evo.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain drop-shadow-md transition-transform group-hover:scale-110"
                />
              </div>
              <span className={`font-bold capitalize ${evo.name === name ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
                {evo.name}
              </span>
            </Link>

            {index < chain.length - 1 && (
              <div className="text-border mx-2 rotate-90 md:rotate-0">
                <ArrowRight className="w-8 h-8" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
