import {Reward, CHAMPIONS_LEAGUE_FINAL_TICKET,KARAOKE_PRO_MICROPHONE,PIRATES_OF_THE_CARIBBEAN_COLLECTION} from './reward';

export interface Subscription{
    getName():string;
    getRewards():Array<Reward>;
}

class SubscriptionImpl implements Subscription {

    private name:string;
    private rewards:Array<Reward>

    constructor(name:string, rewards:Array<Reward>){
        this.name = name;
        this.rewards = rewards;
    }

    getName(){
        return this.name;
    }

    getRewards(){
        return this.rewards;
    }
}

export const SPORTS:Subscription = new SubscriptionImpl("SPORTS", [CHAMPIONS_LEAGUE_FINAL_TICKET]);
export const KIDS:Subscription = new SubscriptionImpl("KIDS",[]);
export const MUSIC:Subscription = new SubscriptionImpl("MUSIC", [KARAOKE_PRO_MICROPHONE]);
export const NEWS:Subscription = new SubscriptionImpl("NEWS", []);
export const MOVIES:Subscription = new SubscriptionImpl("MOVIES", [PIRATES_OF_THE_CARIBBEAN_COLLECTION]);

export default Subscription;