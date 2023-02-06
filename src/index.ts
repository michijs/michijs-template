import './components/RootComponent';
import './registerServiceWorker';
import type { ProcessType } from '@michijs/dev-server';

declare global {
  var process: ProcessType;
}