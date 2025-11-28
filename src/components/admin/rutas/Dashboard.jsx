import BreadCrumb from "../components/breadcrumb/BreadCrumb";

const Dashboard = () => {
  return (
    <div className="font-montserrat mt-20">
      <BreadCrumb titulo="Dashboard" />

      <div className="w-full flex mt-6 gap-4">
        <div className="w-full flex gap-4 h-[25vh]">
          {/* Card izquierda */}
          <div className="w-1/2 bg-gradient-to-r from-violet-600 via-blue-500 to-pink-600 rounded-lg flex items-center justify-center">
            5
          </div>

          {/* Card derecha */}
          <div className="w-1/2 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg flex items-center justify-center"></div>
            <div className="bg-white rounded-lg flex items-center justify-center"></div>
            <div className="bg-white rounded-lg flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
