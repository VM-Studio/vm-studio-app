'use client';

export default function Page() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Título y botón en la misma línea */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Gestión de Pagos del Servicio</h1>
            <p className="text-gray-300 mt-1">Aquí puedes ver el estado de tus pagos y completarlos.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
            Método de Pago
          </button>
        </div>

        {/* Resumen del servicio */}
        <div className="bg-gray-900 shadow rounded-xl p-6 border border-blue-500">
          <h2 className="text-xl font-semibold text-white mb-4">Resumen del Servicio</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div><strong>Servicio:</strong> Mantenimiento Anual</div>
            <div><strong>Cliente:</strong> Juan Pérez</div>
            <div><strong>Total a pagar:</strong> $120.000</div>
            <div><strong>Pagado hasta ahora:</strong> $60.000</div>
          </div>
        </div>

        {/* Tarjeta: Primer Pago */}
        <div className="bg-gray-900 shadow rounded-xl p-6 border border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Primer Pago</h3>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">Pagado</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div><strong>Monto:</strong> $60.000</div>
            <div><strong>Fecha de pago:</strong> 10/07/2025</div>
            <div><strong>Método:</strong> Transferencia</div>
            <div><strong>Comprobante:</strong> #AB12345</div>
          </div>
        </div>

        {/* Tarjeta: Pago Restante */}
        <div className="bg-gray-900 shadow rounded-xl p-6 border border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Pago Restante</h3>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">Pendiente</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
            <div><strong>Monto:</strong> $60.000</div>
            <div><strong>Fecha límite:</strong> 10/08/2025</div>
            <div><strong>Estado:</strong> Aún no pagado</div>
            <div><strong>Método sugerido:</strong> Tarjeta de crédito</div>
          </div>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
            Pagar Ahora
          </button>
        </div>

      </div>
    </div>
  );
}
