import './App.css'
import { RouterProvider } from "react-router-dom";
import routes from './routes.jsx';

function App() {

    return (
        <>
            <RouterProvider router={routes}></RouterProvider>
        </>
    )
}

export default App
