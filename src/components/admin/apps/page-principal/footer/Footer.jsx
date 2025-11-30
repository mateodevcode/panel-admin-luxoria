import BreadCrumb from "@/components/admin/components/breadcrumb/BreadCrumb";
import FormDataFooter from "./FormDataFooter";

const Footer = () => {
  return (
    <div className="font-montserrat mt-20">
      <BreadCrumb titulo="Editar footer" />

      <div className="w-full flex mt-6 gap-6 flex-col">
        <FormDataFooter />
      </div>
    </div>
  );
};

export default Footer;
