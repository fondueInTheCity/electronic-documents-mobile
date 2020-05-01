import {Injectable} from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite';
import {BehaviorSubject, Observable} from 'rxjs';
import {Platform} from '@ionic/angular';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {HttpClient} from '@angular/common/http';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {LocalUser} from '../models/user/local-user';
import {PropertiesService} from './properties.service';

@Injectable({
    providedIn: 'root'
})
export class DbService {

    private storage: SQLiteObject;
    localUsers = new BehaviorSubject([]);
    private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private platform: Platform,
                private sqlite: SQLite,
                private httpClient: HttpClient,
                private sqlPorter: SQLitePorter,
                private properties: PropertiesService) {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'electronic_documents_local.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                this.storage = db;
                this.createTables();
            }).catch(error => {
                this.properties.getErrorAlertOpts(error);
            });
        });
    }

    dbState() {
        return this.isDbReady.asObservable();
    }

    fetchSongs(): Observable<LocalUser[]> {
        return this.localUsers.asObservable();
    }

    // Render fake data
    createTables() {
        this.httpClient.get('assets/create-tables.sql', {responseType: 'text'}).subscribe(data => {
            this.sqlPorter.importSqlToDb(this.storage, data).then(_ => {
                this.getSongs();
                this.isDbReady.next(true);
            }).catch(error => this.properties.getErrorAlertOpts(error));
        });
    }

    // Get list
    getSongs() {
        return this.storage.executeSql('SELECT * FROM users', []).then(res => {
            const items: LocalUser[] = [];
            if (res.rows.length > 0) {
                for (let i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        firstName: res.rows.item(i).firstName,
                        middleName: res.rows.item(i).middleName,
                        lastName: res.rows.item(i).lastName
                    });
                }
            }
            this.localUsers.next(items);
        }).catch(error => this.properties.getErrorAlertOpts(error));
    }

    // Add
    // addSong(artist_name, song_name) {
    //     let data = [artist_name, song_name];
    //     return this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES (?, ?)', data)
    //         .then(res => {
    //             this.getSongs();
    //         });
    // }
    //
    // // Get single object
    // getSong(id): Promise<Song> {
    //     return this.storage.executeSql('SELECT * FROM songtable WHERE id = ?', [id]).then(res => {
    //         return {
    //             id: res.rows.item(0).id,
    //             artist_name: res.rows.item(0).artist_name,
    //             song_name: res.rows.item(0).song_name
    //         };
    //     });
    // }
    //
    // // Update
    // updateSong(id, song: Song) {
    //     let data = [song.artist_name, song.song_name];
    //     return this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
    //         .then(data => {
    //             this.getSongs();
    //         });
    // }
    //
    // // Delete
    // deleteSong(id) {
    //     return this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id])
    //         .then(_ => {
    //             this.getSongs();
    //         });
    // }
}
