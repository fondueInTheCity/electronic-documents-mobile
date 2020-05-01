import {DocumentInfo} from './document-info';

export class UserDocumentsInfo {
    heapDocuments: DocumentInfo[];
    waitingDocuments: DocumentInfo[];
    progressDocuments: DocumentInfo[];
    answeredDocuments: DocumentInfo[];
    joinToMeDocuments: DocumentInfo[];
}
