import { Subscription } from "./subscription";

export interface SubscriptionStore{
    findByName(name:string):Subscription | undefined;
    findAll():Array<Subscription>;
}

export class SubscriptionStoreImpl implements SubscriptionStore{

    private availableSubscriptions:Map<string,Subscription> = new Map();

    constructor(availableSubscriptions:Array<Subscription>){
        availableSubscriptions.forEach((subscription) =>{
            this.availableSubscriptions.set(subscription.getName(), subscription)
        })
    }

    findByName(name: string): Subscription | undefined{
        return this.availableSubscriptions.get(name)
    }

    findAll(): Array<Subscription>{
        return Array.from(this.availableSubscriptions.values());

    }

}