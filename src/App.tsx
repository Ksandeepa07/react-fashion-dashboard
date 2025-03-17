import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./auth/Login.tsx";
import {Toaster} from "react-hot-toast";


function App() {

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Routes>
                </main>
                <Toaster position="top-right" />
            </div>
        </Router>


    )
}

export default App;