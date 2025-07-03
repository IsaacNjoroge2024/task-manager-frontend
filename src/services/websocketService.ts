import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';

class WebSocketService {
    private stompClient: CompatClient | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectInterval = 1000;

    connect(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const socket = new SockJS('http://localhost:8080/ws');
            this.stompClient = Stomp.over(socket);

            // Disable debug logs in production
            this.stompClient.debug = (str) => {
                if (import.meta.env.DEV) {
                    console.log(str);
                }
            };

            this.stompClient.connect(
                { Authorization: `Bearer ${token}` },
                (frame: any) => {
                    console.log('Connected to WebSocket:', frame);
                    this.reconnectAttempts = 0;
                    resolve();
                },
                (error: any) => {
                    console.error('WebSocket connection error:', error);
                    this.handleReconnect(token);
                    reject(error);
                }
            );
        });
    }

    disconnect(): void {
        if (this.stompClient) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
    }

    subscribe(destination: string, callback: (message: any) => void): void {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.subscribe(destination, (message) => {
                const data = JSON.parse(message.body);
                callback(data);
            });
        }
    }

    private handleReconnect(token: string): void {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
                console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
                this.connect(token);
            }, this.reconnectInterval * Math.pow(2, this.reconnectAttempts));
        }
    }

    sendMessage(destination: string, message: any): void {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(destination, {}, JSON.stringify(message));
        }
    }
}

export const websocketService = new WebSocketService();