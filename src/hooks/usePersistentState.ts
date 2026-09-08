import { useEffect, useState } from "react";
import type { StorageRepository } from "../services/storage";
export function usePersistentState<T>(repository: StorageRepository<T>, fallback: T) {
  const [value, setValue] = useState<T>(() => repository.read(fallback));
  useEffect(() => repository.write(value), [repository, value]);
  return [value, setValue] as const;
}
