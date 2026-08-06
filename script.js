// Esperamos a que la página cargue por completo
document.addEventListener('DOMContentLoaded', () => {
    // Buscamos el elemento interactivo en tu HTML que ejecuta la copia
    const botonCopiar = document.querySelector('[onclick*="copyOutput"]') || document.getElementById('copied-msg')?.parentElement;

    if (botonCopiar) {
        botonCopiar.addEventListener('click', () => {
            // Le damos 100 milisegundos para que el script original actúe primero
            setTimeout(enviarAn8n, 100);
        });
    } else {
        // Respaldo automático: si el botón no responde, interceptamos la función copyOutput directamente
        const originalCopyOutput = window.copyOutput;
        window.copyOutput = function() {
            if (typeof originalCopyOutput === 'function') originalCopyOutput();
            setTimeout(enviarAn8n, 100);
        };
    }
});

function enviarAn8n() {
    // Captura el texto generado en la caja con ID 'output'
    const promptTexto = document.getElementById('output')?.value;
    
    if (!promptTexto) {
        console.warn('El campo "output" está vacío o no se encontró en este momento.');
        return;
    }

    // --- CONFIGURACIÓN DE ENLACE N8N ---
    // MODO TEST: Mantener 'webhook-test'
    // MODO PRODUCCIÓN: Reemplazar 'webhook-test' por 'webhook' cuando actives el flujo definitivo
    const urlWebhookN8n = 'https://fc-automation.app.n8n.cloud/webhook-test/respuestaformulario220293';

    // Formateamos los datos para evitar bloqueos de CORS del navegador
    const datosEnvio = new URLSearchParams();
    datosEnvio.append('prompt', promptTexto);
    datosEnvio.append('fecha', new Date().toISOString());

    // Ejecutamos el envío silencioso a tu webhook
    fetch(urlWebhookN8n, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: datosEnvio.toString()
    })
    .then(respuesta => {
        if (respuesta.ok) {
            console.log('¡Conectado! El prompt llegó correctamente a n8n.');
        } else {
            console.error('n8n rechazó la petición. Código de estado:', respuesta.status);
        }
    })
    .catch(error => {
        console.error('Error de red al intentar contactar a n8n:', error);
    });
}
