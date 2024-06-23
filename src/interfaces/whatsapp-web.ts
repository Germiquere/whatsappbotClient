export interface IWhatsappWebResponse {
    title:   string;
    message: string;
    data:    IQrData;
}

export interface IQrData {
    qr:             string;
    expirationTime: number;
}