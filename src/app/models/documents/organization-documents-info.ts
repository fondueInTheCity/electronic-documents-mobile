import {DocumentInfo} from './document-info';

export class OrganizationDocumentsInfo {
    heapDocuments: DocumentInfo[];
    waitingDocuments: DocumentInfo[];
    progressDocuments: DocumentInfo[];
    joinToMeDocuments: DocumentInfo[];
    answeredDocuments: DocumentInfo[];
}
