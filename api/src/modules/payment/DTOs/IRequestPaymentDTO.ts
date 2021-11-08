export interface IRequestPaymentDTO {
    delivery_id: string;
    credor_id: string;
    ente_devedor_id?: string;
    start_value: number;
    end_value: number;
    date: Date;
}
