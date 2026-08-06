// 1. Guardamos la función de copia original de tu HTML
const copiarOriginal = window.copyOutput;

// 2. Redefinimos la función para que haga lo de antes Y ADEMÁS envíe a n8n
window.copyOutput = function() {
    
    // Ejecuta tu código original (seleccionar, copiar y mostrar el mensaje "¡Copiado!")
    if (typeof copiarOriginal === 'function') {
        copiarOriginal();
    }

    // Captura el texto del prompt generado desde el elemento con ID 'output'
    const promptTexto = document.getElementById('output')?.value;
    
    if (!promptTexto) {
        console.error('No se encontró texto en el campo "output" para enviar a n8n.');
        return;
    }

    // --- CONFIGURACIÓN DE URL N8N ---
    // MODO TEST: Mantener 'webhook-test'
    // MODO PRODUCCIÓN: Cambiar 'webhook-test' por 'webhook'
    const urlWebhookN8n = 'https://n8n.cloud';

    // 3. Enviamos el prompt al webhook de n8n en segundo plano
    fetch(urlWebhookN8n, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            prompt: promptTexto,
            fecha_envio: new Date().toISOString()
        })
    })
    .then(respuesta => {
        if (respuesta.ok) {
            console.log('¡Prompt enviado con éxito a n8n!');
        } else {
            console.error('n8n recibió la petición pero devolvió un error:', respuesta.status);
        }
    })
    .catch(error => {
        console.error('Error de red o conexión con n8n:', error);
    });
};
