import "./components/RootComponent";
import "./registerServiceWorker";
import type { MichiProcessType } from "@michijs/dev-server";

declare global {
  const michiProcess: MichiProcessType;
}
