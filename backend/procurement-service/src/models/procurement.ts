import { ProcurementStatus } from './ProcurementStatus';

export interface Procurement {
    id: string;
    title: string;
    description: string;
    items: { itemName: string; quantity: number }[];
    status: ProcurementStatus;
    createdAt: string;
}