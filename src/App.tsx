import { ConsentProvider } from "./features/consent/ConsentContext";
import AppRouter from "./routes/AppRouter";

const App = () => (
  <ConsentProvider>
    <AppRouter />
  </ConsentProvider>
);

export default App;
