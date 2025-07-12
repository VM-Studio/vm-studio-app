'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  return (
    <div className="bg-black text-white py-10 px-6 sm:px-10 min-h-screen">
        {/* LOGO arriba a la derecha */}
      <div className="absolute top-6 right-6">
        <img src="/mi-logo.png" alt="Logo" className="w-16 h-auto" />
        {/* o con next/image si lo preferís */}
        {/* <Image src="/logo.svg" alt="Logo" width={64} height={64} /> */}
      </div>
      <div className="max-w-6xl mx-auto">
        <Card className="bg-black border border-white text-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Servicios Adicionales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Servicio obligatorio */}
              <div className="bg-gray-900 border-2 border-blue-500 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mantenimiento Básico</h3>
                  <p className="text-gray-300 mb-4">
                    Actualizaciones mensuales, solución de errores y chequeos de seguridad básicos.
                  </p>
                  <ul className="text-sm text-gray-400 mb-4 list-disc list-inside space-y-1">
                    <li>Backup mensual</li>
                    <li>Actualización de plugins</li>
                    <li>Monitoreo de errores</li>
                  </ul>
                  <p className="font-semibold text-blue-400 mb-2">Costo mensual: $15.000</p>
                </div>
                <div className="mt-4">
                  <Badge className="bg-blue-700 text-white">Obligatorio</Badge>
                </div>
              </div>

              {/* Servicio 1 */}
              <div className="bg-gray-900 border border-blue-500 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pack Seguridad Avanzada</h3>
                  <p className="text-gray-300 mb-4">
                    Protección contra malware, escaneo diario y firewall personalizado.
                  </p>
                  <ul className="text-sm text-gray-400 mb-4 list-disc list-inside space-y-1">
                    <li>Firewall de aplicación web</li>
                    <li>Escaneo automático diario</li>
                    <li>Soporte ante ataques</li>
                  </ul>
                  <p className="font-semibold text-blue-400 mb-2">Costo mensual: $10.000</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">Contratar</Button>
              </div>

              {/* Servicio 2 */}
              <div className="bg-gray-900 border border-blue-500 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pack de Velocidad</h3>
                  <p className="text-gray-300 mb-4">
                    Optimización del rendimiento y carga rápida en todos los dispositivos.
                  </p>
                  <ul className="text-sm text-gray-400 mb-4 list-disc list-inside space-y-1">
                    <li>Optimización de imágenes</li>
                    <li>Minificación de recursos</li>
                    <li>Mejoras en Core Web Vitals</li>
                  </ul>
                  <p className="font-semibold text-blue-400 mb-2">Costo mensual: $8.000</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">Contratar</Button>
              </div>

              {/* Servicio 3 */}
              <div className="bg-gray-900 border border-blue-500 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pack Premium UX</h3>
                  <p className="text-gray-300 mb-4">
                    Revisión mensual de diseño y experiencia de usuario con mejoras sugeridas.
                  </p>
                  <ul className="text-sm text-gray-400 mb-4 list-disc list-inside space-y-1">
                    <li>Análisis de navegación</li>
                    <li>Propuestas de mejora</li>
                    <li>Informe de comportamiento de usuarios</li>
                  </ul>
                  <p className="font-semibold text-blue-400 mb-2">Costo mensual: $12.000</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">Contratar</Button>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
