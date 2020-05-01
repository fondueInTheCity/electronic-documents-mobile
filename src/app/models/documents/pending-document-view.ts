import {ProgressDocumentResponse} from './progress-document-response';

export class PendingDocumentView {
    id: number;
    name: string;
    organizationName: string;
    answers: ProgressDocumentResponse[];
}
