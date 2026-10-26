import { Link } from "react-router-dom";

export default function Migas({ items }) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {items.map((item, i) =>
                    i === items.length - 1 ? (
                        <li key={item.texto} className="breadcrumb-item active" aria-current="page">{item.texto}</li>
                    ) : (
                        <li key={item.texto} className="breadcrumb-item"><Link to={item.a}>{item.texto}</Link></li>
                    )
                )}
            </ol>
        </nav>
    );
}
