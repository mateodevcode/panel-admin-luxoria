import { LuUserSearch } from "react-icons/lu";

const EditarVacio = ({ id }) => {
  if (!id) {
    return (
      <div className="bg-primero rounded-lg p-6 w-full md:w-[65%] aspect-square flex flex-col font-poppins h-[50svh] items-center justify-center text-segundo">
        <div className="w-20 h-20 rounded-full bg-cuarto/10 flex items-center justify-center mb-2">
          <LuUserSearch className="text-4xl text-cuarto" />
        </div>
        <span className="font-medium text-xl md:text-2xl text-segundo/70">
          Selecciona un producto.
        </span>
      </div>
    );
  }
};

export default EditarVacio;
