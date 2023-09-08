import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
export default function support() {
    return (
        <div>
        
        {/* NAVIGATION */}
        <NavBar/>

        {/* HEADER */}
        <Header/>

        {/* NAVIGATION */}
        <Footer/>

       

        </div>
    );
}