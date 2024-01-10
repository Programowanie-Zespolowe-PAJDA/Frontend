import "./App.css";
import Index from "./Pages/Index";
import Tests from "./Pages/Tests";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Pages/Navigation";

export function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigation />}>
                        <Route index element={<Index />} />
                        <Route path="tests" element={<Tests />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
