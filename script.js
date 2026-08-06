/**
 * Archivo: script.js
 * Descripción: Captura el prompt generado y lo envía a n8n al hacer clic en "Copiar".
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar el botón de copiar (Buscamos por el texto o clases comunes)
    // Nota: Ajustá el selector si tu botón tiene un ID específico como #btnCopiar
    const botonCopiar = document.querySelector('button, .btn, .button') || document.body; 

    // Interceptamos el clic en la página para encontrar la acción de copiar
    document.addEventListener('click', async (evento) => {
        // Verificamos si el elemento clickeado es el botón de copiar o contiene el texto
        if (evento.target.textContent.includes('Copiar')) {
            
            // 2. Capturar el texto del prompt generado
            // Buscamos el elemento que contiene el prompt listo (suele ser un textarea, input o div)
            // Modificá el selector si tu contenedor tiene un ID específico (ej: '#promptListo')
            const elementoPrompt = document.querySelector('textarea') || document.querySelector('.prompt-contenedor') || document.querySelector('#prompt');
            
            if (!elementoPrompt) {
                console.warn('No se encontró el elemento contenedor del prompt en el HTML.');
                return;
            }

            // Obtenemos el texto ya sea de un input/textarea (.value) o de un bloque de texto (.innerText)
            const promptTexto = elementoPrompt.value || elementoPrompt.innerText;

            if (!promptTexto || promptTexto.trim() === "") {
                console.warn('El prompt está vacío. No se enviará a n8n.');
                return;
            }

            // 3. Dirección de tu Webhook de n8n
            // ======================================================================================
            // LEYENDA DE REEMPLAZO PARA PRODUCCIÓN:
            // Actualmente usa la URL de TEST de n8n para tus pruebas en el editor.
            // Cuando vayas a pasar este formulario a PRODUCCIÓN y actives el workflow en n8n,
            // debés cambiar la palabra 'webhook-test' por 'webhook' en la siguiente URL.
            // Ejemplo final: 'https://n8n.cloud'
            // ======================================================================================
            const urlWebhookN8n = 'https://n8n.cloud';

            // 4. Envío de datos mediante POST en formato JSON
            try {
                const respuesta = await fetch(urlWebhookN8n, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        evento: 'prompt_copiado',
                        prompt: promptTexto.trim(),
                        fecha: new Date().toISOString()
                    })
                });

                if (respuesta.ok) {
                    console.log('✅ Prompt enviado con éxito a n8n.');
                } else {
                    console.error('❌ n8n recibió la petición pero devolvió un error:', respuesta.status);
                }
            } catch (error) {
                console.error('❌ Error de red o conexión al intentar enviar a n8n:', error);
            }
        }
    });
});
