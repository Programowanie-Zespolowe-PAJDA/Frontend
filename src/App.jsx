import "./App.css";
import Index from "./Pages/Index";
import Tests from "./Pages/Tests";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Pages/Navigation";
import Tip from "./Pages/Tip";
import ThankYou from "./Pages/ThankYou";
import ReviewDisplay from "./components/ReviewDisplay";

export function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigation />}>
                        <Route index element={<Index />} />
                        <Route path="tests" element={<Tests />} />
                        <Route path="tip" element={<Tip />} />
                        <Route path="thankyou" element={<ThankYou />} />
                        <Route path="reviewList" element={<ReviewDisplay />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
