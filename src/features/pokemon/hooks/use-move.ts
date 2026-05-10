import { useQuery } from "@tanstack/react-query";
import { getMoveDetailUseCase } from "../use-cases/get-move-detail.use-case";

export const useMoveDetail = (moveName: string | null) => {
  return useQuery({
    queryKey: ["move", moveName],
    queryFn: () => (moveName ? getMoveDetailUseCase(moveName) : null),
    enabled: !!moveName,
    staleTime: 1000 * 60 * 60,
  });
};
