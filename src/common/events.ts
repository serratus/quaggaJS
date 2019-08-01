export interface EventCallback {
    (data: any): void;
}

export interface EventSubscription {
    callback: EventCallback;
    async?: boolean;
    once?: boolean;
}

interface EventItem {
    subscriptions: Array<EventSubscription>
}

let events: { [name: string]: EventItem } = {};

export class Events {
    static subscribe(event: string, callback: EventSubscription | EventCallback, async?: boolean) {
        let subscription: EventSubscription;

        if (typeof callback === 'function') {
            subscription = {
                callback,
                async
            };
        } else {
            subscription = callback;
            if (!subscription.callback) {
                throw 'Callback was not specified on options';
            }
        }

        getEvent(event).subscriptions.push(subscription);
    }

    static publish(type: string, data?: any) {
        const eventItem = getEvent(type);
        const subscriptions = eventItem.subscriptions;

        // Publish one-time subscriptions
        subscriptions.filter(({ once }) => !!once).forEach(subscription => publishSubscription(subscription, data));

        // remove them from the subscription
        eventItem.subscriptions = subscriptions.filter(({ once }) => !once);

        // publish the rest
        eventItem.subscriptions.forEach(subscription => publishSubscription(subscription, data));
    }

    static once(event: string, callback: EventCallback, async?: boolean): void {
        Events.subscribe(event, { callback, async, once: true });
    }

    static unsubscribe(eventName?: string, callback?: EventCallback) {
        if (eventName) {
            const event = getEvent(eventName);
            if (event && callback) {
                event.subscriptions = event.subscriptions.filter(subscription => subscription.callback !== callback);
            } else {
                event.subscriptions = [];
            }
        } else {
            events = {};
        }
    }
}

function getEvent(eventName: string): EventItem {
    if (!events[eventName]) {
        events[eventName] = {
            subscriptions: []
        };
    }
    return events[eventName];
}

function publishSubscription(subscription: EventSubscription, data: any): void {
    if (subscription.async) {
        setTimeout(function () {
            subscription.callback(data);
        }, 4);
    } else {
        subscription.callback(data);
    }
}
