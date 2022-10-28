import './components/RootComponent';
import './registerServiceWorker';

declare global {
    interface Process {
        env: {
            NODE_ENV: string;
            BUILD_FILES: string[];
            CACHE_NAME: string;
        };
    }
    var process: Process;
}