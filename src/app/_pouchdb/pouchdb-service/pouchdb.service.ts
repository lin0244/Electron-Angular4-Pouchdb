import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// the pouchdb-adapter file/class in the same folder
import { PouchDbAdapterCitation, PouchDbAdapterReference } from './pouchdb-adapter';
import { ConfigService, Configuration } from '../../config.service';

@Injectable()
export class PouchdbService {

	// URL of CouchDB (hardwired above)
	static remoteCouchDBAddress: string;
	static remoteCouchCitationDBName: string;
	static remoteCouchReferenceDBName: string;
	static pouchDbDebugMode: boolean;
	static fakeUserNameForDB: string;

	// handler for the adapter class
	static _pouchDbAdapterRef: PouchDbAdapterReference;
	static _pouchDbAdapterCit: PouchDbAdapterCitation;
	
	// rxjs observables to broadcast sync status
	static syncStatusRef: Observable<boolean>;
	static couchdbUpRef: Observable<boolean>;
	static syncStatusCit: Observable<boolean>;
	static couchdbUpCit: Observable<boolean>;

	// initiate adapter class and hook up the observables
	constructor(private config: ConfigService) {

	}

	initializeConfig(config) {
		console.log(config);
		PouchdbService.remoteCouchDBAddress = config.RemoteCouchDBUrl.toLowerCase();
		PouchdbService.remoteCouchCitationDBName = config.RemoteCouchCitationDBName.toLowerCase();
		PouchdbService.remoteCouchReferenceDBName = config.RemoteCouchReferenceDBName.toLowerCase();
		PouchdbService.pouchDbDebugMode = config.PouchDBDebugMode;
		PouchdbService.fakeUserNameForDB = config.FakeUserName.toLowerCase();
		console.log('FakeUserName = ', PouchdbService.fakeUserNameForDB);

		console.log(PouchdbService.remoteCouchDBAddress, PouchdbService.remoteCouchCitationDBName);
		// Reference Data Setup
		PouchdbService._pouchDbAdapterRef = new PouchDbAdapterReference
			(PouchdbService.remoteCouchDBAddress + PouchdbService.remoteCouchReferenceDBName, PouchdbService.pouchDbDebugMode);
		PouchdbService.syncStatusRef = PouchdbService._pouchDbAdapterRef.syncStatusRef.asObservable();
		PouchdbService.couchdbUpRef = PouchdbService._pouchDbAdapterRef.couchDbUpRef.asObservable();

		// Citation Data Setup
		PouchdbService._pouchDbAdapterCit = new PouchDbAdapterCitation
			(PouchdbService.remoteCouchDBAddress +
			PouchdbService.remoteCouchCitationDBName + '_' +
			PouchdbService.fakeUserNameForDB, PouchdbService.pouchDbDebugMode);
		PouchdbService.syncStatusCit = PouchdbService._pouchDbAdapterCit.syncStatusCit.asObservable();
		PouchdbService.couchdbUpCit = PouchdbService._pouchDbAdapterCit.couchDbUpCit.asObservable();
	}

	destroy_citdb() {
		return Promise.resolve(PouchdbService._pouchDbAdapterCit.destroy());
	}
	getReferenceDocs(howmany: number): Promise<any> {
		return Promise.resolve(PouchdbService._pouchDbAdapterRef.getDocs(howmany));
	}

	// wrapper for the get 20docs method in the adpater class
	getCitationDocs(howmany: number): Promise<any> {
		return Promise.resolve(PouchdbService._pouchDbAdapterCit.getDocs(howmany));
	}

	postCitationDoc(doc): Promise<any> {
		return Promise.resolve(PouchdbService._pouchDbAdapterCit.post(doc));
	}

}


