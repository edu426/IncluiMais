import { Outlet } from 'react-router-dom';
import './MainHeader.css'

function MainHeader() {
    return (
        <div>
            <nav className="navbar">
                    <span className="logo-text">SPHelp</span>
                <div className="nav-right">
                    <a className="nav-link">Ajuda</a>
                    <a className="btn btn-outline">Entrar</a>
                    <a className="btn btn-primary">Criar Conta</a>
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