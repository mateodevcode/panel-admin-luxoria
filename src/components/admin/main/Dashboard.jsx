"use client";

import React, { useContext, useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
import {
  Package,
  Layers,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { AppContext } from "@/context/AppContext";

const Dashboard = () => {
  const { colecciones, productos } = useContext(AppContext);
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (colecciones && productos) {
      procesarDatos();
      setLoading(false);
    }
  }, [colecciones, productos]);

  const procesarDatos = () => {
    // Validaciones previas
    if (!productos || productos.length === 0) {
      setDatos({
        totalProductos: 0,
        productosActivos: 0,
        productosInactivos: 0,
        totalColecciones: 0,
        coleccionesActivas: 0,
        stockTotal: 0,
        valorInventario: 0,
        productosSinStock: 0,
        productosStockBajo: 0,
      });
      return;
    }

    const totalProductos = productos.length;
    const productosActivos = productos.filter(
      (p) => p.isActive === true
    ).length;
    const productosInactivos = productos.filter(
      (p) => p.isActive === false
    ).length;

    const totalColecciones = colecciones?.length || 0;
    const coleccionesActivas =
      colecciones?.filter((c) => c.isActive === true).length || 0;

    const stockTotal = productos.reduce((acc, p) => acc + (p.stock || 0), 0);
    const valorInventario = productos.reduce(
      (acc, p) => acc + (p.precio || 0) * (p.stock || 0),
      0
    );

    const productosSinStock = productos.filter((p) => p.stock === 0).length;
    const productosStockBajo = productos.filter(
      (p) => p.stock > 0 && p.stock < 5
    ).length;

    setDatos({
      totalProductos,
      productosActivos,
      productosInactivos,
      totalColecciones,
      coleccionesActivas,
      stockTotal,
      valorInventario,
      productosSinStock,
      productosStockBajo,
    });
  };

  if (loading || !datos) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-segundo/20 border-t-cuarto rounded-full"></div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-white to-segundo/5 rounded-2xl p-6 border border-segundo/10 shadow-lg hover:shadow-xl transition-all`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-segundo/60 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-segundo mt-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-segundo/50 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div
              className={`flex items-center gap-1 mt-2 text-xs font-semibold ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              {Math.abs(trend)}% {trend > 0 ? "↑" : "↓"}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-6 font-poppins mt-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="md:text-4xl text-3xl font-bold text-segundo mb-2">
          Dashboard
        </h1>
        <p className="text-segundo/60">Vista general de tu tienda</p>
      </motion.div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Package}
          title="Total Productos"
          value={datos.totalProductos}
          subtitle="Productos registrados"
          color="bg-blue-500"
        />
        <StatCard
          icon={CheckCircle2}
          title="Productos Activos"
          value={datos.productosActivos}
          subtitle="Publicados en la tienda"
          color="bg-green-500"
        />
        <StatCard
          icon={AlertCircle}
          title="Productos Inactivos"
          value={datos.productosInactivos}
          subtitle="No publicados"
          color="bg-red-500"
        />
        <StatCard
          icon={DollarSign}
          title="Valor Inventario"
          value={`$${datos.valorInventario.toLocaleString()}`}
          subtitle="Valor total del stock"
          color="bg-green-600"
        />
      </div>

      {/* Estadísticas de colecciones y stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Layers}
          title="Total Colecciones"
          value={datos.totalColecciones}
          subtitle="Colecciones creadas"
          color="bg-purple-500"
        />
        <StatCard
          icon={Zap}
          title="Colecciones Activas"
          value={datos.coleccionesActivas}
          subtitle={`de ${datos.totalColecciones} totales`}
          color="bg-yellow-500"
        />
        <StatCard
          icon={ShoppingBag}
          title="Stock Total"
          value={datos.stockTotal}
          subtitle="Unidades disponibles"
          color="bg-orange-500"
        />
        <StatCard
          icon={AlertCircle}
          title="Alertas de Stock"
          value={datos.productosSinStock + datos.productosStockBajo}
          subtitle={`${datos.productosSinStock} sin stock, ${datos.productosStockBajo} stock bajo`}
          color="bg-red-500"
        />
      </div>

      {/* Gráficas comentadas para implementación futura */}
      {/* 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg border border-segundo/10 p-6"
        >
          <h3 className="text-lg font-bold text-segundo mb-4">
            Productos por Colección
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productosPorColeccion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="productos" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg border border-segundo/10 p-6"
        >
          <h3 className="text-lg font-bold text-segundo mb-4">
            Estado de Productos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={estadoProductos}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {estadoProductos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      */}

      {/* Información adicional */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg border border-segundo/10 p-6"
        >
          <h3 className="text-lg font-bold text-segundo mb-4">
            Resumen del Inventario
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 font-medium mb-1">
                Productos Totales
              </p>
              <p className="text-2xl font-bold text-blue-700">
                {datos.totalProductos}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 font-medium mb-1">
                Stock Disponible
              </p>
              <p className="text-2xl font-bold text-green-700">
                {datos.stockTotal} unidades
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-600 font-medium mb-1">
                Valor Total
              </p>
              <p className="text-2xl font-bold text-orange-700">
                ${datos.valorInventario.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
