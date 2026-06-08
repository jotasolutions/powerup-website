export default class WhatsappRepository {
    static sendWhatsappMessage(phone: string, message: string) {
        return new Promise((resolve, reject) => {
            const url = `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE_NAME}`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': process.env.EVOLUTION_API_KEY ? process.env.EVOLUTION_API_KEY : ''
                },
                body: JSON.stringify({
                    number: phone,
                    text: message
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('status:', data.status);
                    if (data.status !== "PENDING") {
                        if (data.response && data.response.message && data.response.message[0] && data.response.message[0].exists == false) {
                            reject("invalid_whatsapp_number");
                        } else {
                            reject(data);
                        }
                    } else {
                        resolve(data);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    static async doesWhatsappNumExists(phone: string) {
        const url = `${process.env.EVOLUTION_API_URL}/chat/whatsappNumbers/${process.env.EVOLUTION_INSTANCE_NAME}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.EVOLUTION_API_KEY ? process.env.EVOLUTION_API_KEY : ''
            },
            body: JSON.stringify({
                numbers: [phone]
            })
        });
        
        const data = await response.json();
        if (data.error) {
            throw new Error('Evolution error: ' + data.response.message);
        }
        
        return data[0].exists;
    }
}