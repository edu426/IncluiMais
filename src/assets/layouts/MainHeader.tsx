import { Outlet } from 'react-router-dom';
import './MainHeader.css'
import { SignInButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
function MainHeader() {
    return (
        <div>
            <nav className="navbar">
                <Link to="/dashboard" className="logo-text">SPHelp</Link>
                <div className="nav-right">
                    <a className="nav-link">Ajuda</a>
                    <SignInButton>
                        <a className="btn btn-primary">Entrar</a>
                    </SignInButton>
                </div>
            </nav>

            <main style={{ padding: "2rem" }}>
                <Outlet />
            </main>

            <footer className="footer">
                <div className="footer-links">
                    <a href="#" className="footer-link">Ajuda e Suporte</a>
                    <a href="#" className="footer-link">Política de Privacidade</a>
                    <a href="#" className="footer-link">Contacto</a>
                </div>
                <div className="footer-credit">
                    Desenvolvido por Eduardo Ramos
                </div>
            </footer>
        </div>
    );
}

export default MainHeader;