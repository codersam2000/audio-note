import './App.css'
import Router from './routers/Router'
import AuthContextProvider from './contexts/Auth'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
