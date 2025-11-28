// hooks/useProducto.js
import { apiServer } from "@/app/actions/apiServer";
import { AppContext } from "@/context/AppContext";
import { productoValidate } from "@/validations/producto";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";
import useResetForm from "./useResetForm";

const useProducto = () => {
  const { setProductos, formDataProducto, setFormDataProducto } =
    useContext(AppContext);
  const router = useRouter();
  const { resetFormDataProducto } = useResetForm();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormDataProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeFile = (e, setFile, setPreview) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("El archivo pesa más de 10MB");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChangeMultipleFiles = (
    e,
    setMultipleFiles,
    setMultiplePreviews
  ) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) return;

    const validFiles = [];
    const newPreviews = [];

    for (const file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} no es una imagen`);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} pesa más de 10MB`);
        continue;
      }
      validFiles.push(file);
      newPreviews.push({
        url: URL.createObjectURL(file),
        name: file.name,
      });
    }

    if (validFiles.length === 0) return;

    setMultipleFiles((prevFiles) => {
      const totalFiles = prevFiles.length + validFiles.length;
      if (totalFiles > 10) {
        toast.error("Máximo 10 imágenes permitidas");
        return prevFiles;
      }
      return [...prevFiles, ...validFiles];
    });

    setMultiplePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleDeletePreviewImage = (
    index,
    setMultipleFiles,
    setMultiplePreviews
  ) => {
    setMultipleFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setMultiplePreviews((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[index].url);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const handleAgregarProducto = async (
    e,
    setLoading,
    setFile,
    setPreview,
    file,
    productoId,
    multipleFiles,
    setMultipleFiles,
    setMultiplePreviews,
    imagesToDelete = []
  ) => {
    e.preventDefault();

    const errores = productoValidate(formDataProducto);

    if (errores.length > 0) {
      toast.error(errores[0], {
        position: "top-center",
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();

    // Archivo principal (si es nuevo)
    if (file) {
      formData.append("file", file);
    }

    // Nuevas imágenes para la galería
    if (multipleFiles && multipleFiles.length > 0) {
      multipleFiles.forEach((file) => {
        formData.append("files", file);
      });
    }

    // IDs de imágenes a eliminar
    if (imagesToDelete && imagesToDelete.length > 0) {
      formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
    }

    formData.append("nombre", formDataProducto.nombre);
    formData.append("coleccionId", formDataProducto.coleccionId);
    formData.append("descripcion", formDataProducto.descripcion);
    formData.append("detalles", formDataProducto.detalles);
    formData.append("frase", formDataProducto.frase);
    formData.append("precio", formDataProducto.precio);
    formData.append("stock", formDataProducto.stock);
    formData.append("size", JSON.stringify(formDataProducto.size));
    formData.append("isActive", formDataProducto.isActive);
    formData.append("opcion", formDataProducto.opcion);

    if (formDataProducto.opcion === "editar") {
      formData.append("productoId", productoId);
    }

    try {
      const res = await fetch("/api/upload/producto", {
        method: "POST",
        body: formData,
      });

      const { data: productoRes, message, success, error } = await res.json();

      if (success === true) {
        setProductos((productos) => {
          const index = productos.findIndex(
            (producto) => producto._id === productoRes._id
          );

          if (index !== -1) {
            const actualizadas = [...productos];
            actualizadas[index] = productoRes;
            return actualizadas;
          } else {
            return [...productos, productoRes];
          }
        });
        toast.success(message, {
          position: "top-right",
        });
        resetFormDataProducto();
        setFile(null);
        setPreview(null);
        setMultipleFiles([]);
        setMultiplePreviews([]);
        router.push("/admin/apps/productos/lista-productos");
      } else {
        console.warn("⚠️ No se pudo guardar el producto:", error);
        toast.error("No se pudo guardar el producto:", {
          description: error,
        });
      }
    } catch (error) {
      console.error("🚨 Error al guardar el producto:", error);
      toast.error("Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarProducto = async (id) => {
    if (!id) {
      toast.error("No se agregó el id", { position: "bottom-right" });
      return;
    }

    try {
      const res = await apiServer(`/api/productos/${id}`, "DELETE");
      const { message, success, error } = res;
      if (success === true) {
        setProductos((prev) =>
          prev.filter((productos) => productos._id !== id)
        );
        toast.success(message, {
          position: "bottom-right",
        });
        router.push("/admin/apps/productos/lista-productos");
      } else {
        console.warn("⚠️ No se pudo eliminar el producto:", error);
        toast.error("No se pudo eliminar el producto:", {
          description: error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("🚨 Error al eliminar el producto:", error);
    }
  };

  const handleSizeClick = (size) => {
    setFormDataProducto((prev) => {
      const currentSizes = Array.isArray(prev.size) ? prev.size : [];
      const sizeIndex = currentSizes.indexOf(size);

      if (sizeIndex > -1) {
        // Remover si ya existe
        return {
          ...prev,
          size: currentSizes.filter((_, i) => i !== sizeIndex),
        };
      } else {
        // Agregar si no existe
        return {
          ...prev,
          size: [...currentSizes, size],
        };
      }
    });
  };

  const handlePublicar = async (id, isActive) => {
    if (!id) {
      toast.error("No se agregó el id", { position: "bottom-right" });
      return;
    }

    try {
      const res = await apiServer(`/api/productos/${id}`, "PUT", {
        isActive: !isActive,
      });
      const { data: productoRes, message, success, error } = res;
      if (success === true) {
        setProductos((prev) =>
          prev.map((productos) =>
            productos._id === id
              ? { ...productos, isActive: productoRes.isActive }
              : productos
          )
        );
        toast.success(message, {
          position: "bottom-right",
        });
      } else {
        console.warn("⚠️ No se pudo publicar el producto:", error);
        toast.error("No se pudo publicar el producto:", {
          description: error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("🚨 Error al publicar el producto:", error);
    }
  };

  return {
    handleChange,
    handleChangeFile,
    handleChangeMultipleFiles,
    handleDeletePreviewImage,
    handleEliminarProducto,
    handleAgregarProducto,
    handleSizeClick,
    handlePublicar,
  };
};

export default useProducto;
