import React, { useState } from "react";
import ApiService from "../../service/ApiService";

const PrediccionPage = () => {
  const [form, setForm] = useState({
    numAdultos: 2,
    numNinos: 1,
    tipoHabitacion: "Doble",
    precioHabitacion: 100.0,
    duracionEstadia: 3,
    diaSemanaCheckIn: "Friday",
    mesCheckIn: 4,
    antiguedadReserva: 60,
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      ["tipoHabitacion", "diaSemanaCheckIn"].includes(name) ? value : Number(value);
    setForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handlePredecir = async () => {
    try {
      setLoading(true);
      const resultadoPrediccion = await ApiService.predecirCancelacion(form);
      setResultado(resultadoPrediccion); // resultadoPrediccion = { cancelara: true/false, confianza: 0.9 }
    } catch (error) {
      alert("Error al obtener la predicción.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="icon">🔮</span> Predicción de Cancelación
      </h1>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Número de Adultos</label>
            <input
              name="numAdultos"
              type="number"
              value={form.numAdultos}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Número de Niños</label>
            <input
              name="numNinos"
              type="number"
              value={form.numNinos}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Tipo de Habitación</label>
            <select
              name="tipoHabitacion"
              value={form.tipoHabitacion}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              {["Doble", "Simple", "Suite"].map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Precio de Habitación</label>
            <input
              name="precioHabitacion"
              type="number"
              step="0.01"
              value={form.precioHabitacion}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Duración de Estancia (días)</label>
            <input
              name="duracionEstadia"
              type="number"
              value={form.duracionEstadia}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Día de la Semana del Check-In</label>
            <select
              name="diaSemanaCheckIn"
              value={form.diaSemanaCheckIn}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((dia) => (
                <option key={dia} value={dia}>{dia}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Mes del Check-In</label>
            <input
              name="mesCheckIn"
              type="number"
              min="1"
              max="12"
              value={form.mesCheckIn}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Antigüedad de la Reserva (días)</label>
            <input
              name="antiguedadReserva"
              type="number"
              value={form.antiguedadReserva}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handlePredecir}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Predecir Cancelación"}
        </button>
      </form>

      {resultado && (
  <div className="mt-6 p-4 border rounded bg-gray-50 text-center">
    {/** Conversión segura del valor recibido del backend */}
    <p className="text-xl font-bold mb-2">
  ¿Cancelará?{" "}
  {resultado.resultado?.toLowerCase() === "si"
    ? <span className="text-red-600">❌ Sí</span>
    : <span className="text-green-600">✅ No</span>}
</p>

    <p className="text-md text-gray-800">
      Confianza del modelo: <strong>{Math.round(parseFloat(resultado.confianza) * 100)}%</strong>
    </p>
  </div>
)}




    </div>
  );
};

export default PrediccionPage;