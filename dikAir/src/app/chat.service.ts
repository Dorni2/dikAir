import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { observable } from 'rxjs';
import { Booking } from './booking';

export class ChatService {
    private url = 'http://localhost:3001';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => { 
              observer.next(message);
            });
        });
    }

    public sendOrder(newOrder:Booking) {
        this.socket.emit('new-order', newOrder);
    }

    public getOrdersCount = () => {
        return Observable.create((observer) => {
            this.socket.on('new-order', (newOrder:Booking) => {
                observer.next(newOrder);
            });
        });
    }

    public deleteOrder(deletedOrder:Booking) {
        console.log(deletedOrder);
        this.socket.emit('delete-order', deletedOrder);
    }

    public getDeletedOrder = () => {
        return Observable.create((observer) => {
            this.socket.on('delete-order', (deletedOrder:Booking) => {
                observer.next(deletedOrder);
            });
        });
    }
}