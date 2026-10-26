export default function Footer() {
    return (
        <footer className="bg-dark text-light pt-4 pb-2 mt-auto pie">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 mb-3">
                        <h5 className="text-success">Almacén Cecilia</h5>
                        <p>Tu tienda de barrio de confianza.</p>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <h5 className="text-success">Enlaces Útiles</h5>
                        <ul className="list-unstyled">
                            <li><a href="https://www.duoc.cl/" target="_blank" rel="noopener noreferrer">Duoc UC</a></li>
                            <li><a href="https://www.sii.cl/" target="_blank" rel="noopener noreferrer">SII</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <h5 className="text-success">Contacto Directo</h5>
                        <p className="mb-1">Teléfono: 999999999</p>
                        <p className="mb-0">Correo: cecilia@almacen.cl</p>
                    </div>
                </div>
                <hr />
                <p className="text-center small mb-0">&copy; 2026 Almacén Cecilia. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
