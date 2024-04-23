import React from 'react';
import "./index.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import FormulasComponent from "./components/formulas-container/FormulasComponent";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
        <div className="app-container">
            <FormulasComponent/>
        </div>
        </QueryClientProvider>
    );
}

export default App;
