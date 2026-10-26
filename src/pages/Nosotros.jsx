import Acordeon from "../components/Acordeon.jsx";

const preguntas = [
    { titulo: "¿Hacen despacho a domicilio?", contenido: "Sí, entregamos en el barrio y comunas cercanas. Coordinamos la hora por WhatsApp o por el formulario de contacto." },
    { titulo: "¿Qué medios de pago aceptan?", contenido: "Débito, crédito y transferencia. El pago en línea de esta tienda es demostrativo." },
    { titulo: "¿Cuál es el horario de atención?", contenido: "De lunes a sábado, de 9:00 a 20:00 horas." }
];

export default function Nosotros() {
    return (
        <>
            <section className="card card-body mx-auto mb-4" style={{ maxWidth: "800px" }}>
                <h2 className="text-center texto-cecilia">Nuestra Historia</h2>
                <p><strong>Almacén Cecilia</strong> nació como un emprendimiento familiar con el objetivo de acercar productos de primera necesidad, abarrotes, helados y bebidas a los vecinos de nuestro barrio. Con el paso de los años, nos hemos caracterizado por brindar una atención cercana, rápida y con los precios más convenientes.</p>
                <p className="mb-0">Hoy damos un gran paso hacia adelante llevando nuestro almacén al mundo digital para que nuestros clientes puedan revisar los productos y contactarnos cómodamente desde cualquier dispositivo.</p>
            </section>

            <section className="card card-body mx-auto mb-4" style={{ maxWidth: "800px" }}>
                <h2 className="text-center texto-cecilia">Preguntas frecuentes</h2>
                <Acordeon id="preguntas" items={preguntas} />
            </section>

            <section className="card card-body mx-auto" style={{ maxWidth: "800px" }}>
                <h2 className="text-center texto-cecilia">Equipo de Desarrollo</h2>
                <p className="text-center text-muted">Proyecto desarrollado para la asignatura de Desarrollo Full Stack II:</p>
                <ul className="list-unstyled mb-0">
                    <li className="mb-2"><strong>Desarrolladores:</strong> Alvaro Ramirez y Fernando Reyes</li>
                    <li className="mb-2"><strong>Tecnologías utilizadas:</strong> HTML5, JavaScript, React, Bootstrap</li>
                    <li><strong>Institución:</strong> Duoc UC - DSY1104</li>
                </ul>
            </section>
        </>
    );
}
