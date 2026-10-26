import { Link } from "react-router-dom";

export default function MenuCategorias({ abierto, onCerrar, categorias }) {
    return (
        <>
            <div className={"offcanvas offcanvas-start" + (abierto ? " show" : "")} tabIndex={-1} aria-labelledby="menu-categorias-titulo" aria-hidden={!abierto}>
                <div className="offcanvas-header">
                    <h2 className="offcanvas-title h5" id="menu-categorias-titulo">Categorías</h2>
                    <button type="button" className="btn-close" aria-label="Cerrar menú" onClick={onCerrar}></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="list-group list-group-flush">
                        {categorias.map((categoria) => (
                            <li key={categoria} className="list-group-item">
                                <Link className="link-none d-block" to={"/categorias?cat=" + encodeURIComponent(categoria)} onClick={onCerrar}>{categoria}</Link>
                            </li>
                        ))}
                        <li className="list-group-item">
                            <Link className="link-none d-block fw-bold texto-cecilia" to="/categorias" onClick={onCerrar}>Ver todas</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {abierto && <div className="offcanvas-backdrop fade show" onClick={onCerrar}></div>}
        </>
    );
}
