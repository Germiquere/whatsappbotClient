import { useState } from 'react'
import QRCode from 'react-qr-code';
import './App.css'
import { IQrData, IWhatsappWebResponse } from './interfaces/whatsapp-web';

function App() {
	const [qrData, setQrData] = useState<IQrData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// function to fetch the qr code
	const fetchQr = async () => {
    setLoading(true);
    try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/whatsapp-web/generate-qr`);
        const { data } : IWhatsappWebResponse = await response.json();
        setQrData(data);
        setError(null);

        expirationTimer(data)

    } catch ( error: any ) {
        setError(error.message);
        setQrData(null);
    } finally {
        setLoading(false);
    }
  };

    // function to calculate the expiration time and delete the qr code
    const expirationTimer = ( data: IQrData ) => {
        const expirationTime = data.expirationTime;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        setTimeout(() => {
        setQrData(null);
        }, timeUntilExpiration);
    }

	return (
		<div className="App">
            <header>
            <h1>Connect your whatsapp with an AI AGENT</h1>
            </header>
            <main>
                <section>
					<div>
						<ol>
							<li>Open WhatsApp on your phone.</li>
							<li>Tap <strong>Menu</strong> on Android or <strong>Settings</strong> on iPhone.</li>
							<li>Tap <strong>Linked Devices</strong>, then <strong>Link a Device.</strong></li>
							<li>Click on Generate Qr button on this screen to generate the QR code</li>
							<li>Point your phone at this screen to scan the QR code.</li>
						</ol>
                        <div className="qr-container">
                            <button onClick={fetchQr} disabled={loading}>
                                {loading ? 'Loading...' : 'Generate QR'}
                            </button>
                            {error && <p>Error: {error}</p>}
                            {qrData && (
                            <div>
                                <QRCode value={qrData.qr} />
                            </div>
                            )}
                        </div>
					</div>
                </section>
            </main>
        </div>
    )
}

export default App
