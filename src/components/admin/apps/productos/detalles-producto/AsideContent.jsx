import BotonesColeccion from "./BotonesProducto";
import SeleccionarColeccion from "./SeleccionarProducto";

const AsideContent = ({ id }) => {
  return (
    <div className="w-full md:w-[35%] flex flex-col gap-2">
      <SeleccionarColeccion />
      <BotonesColeccion id={id} />
    </div>
  );
};

export default AsideContent;
