import { SubscriptionStore } from "../domain/subscription-store";
import { EligibilityService } from "./elegibility-service";
import { TechnicalError } from "./errors";

export interface RewardsService{
    getRewards(accountNumber:number, channelSubscriptions:Array<string> ):Promise<Array<string|undefined>>;
    getSubscriptions():Array<string>;
}

export class RewardsServiceImpl implements RewardsService{
    private eligibilityService:EligibilityService;
    private subscriptionStore:SubscriptionStore;

    constructor(eligibilityService:EligibilityService, subscriptionStore:SubscriptionStore){
        this.eligibilityService = eligibilityService;
        this.subscriptionStore = subscriptionStore;
    }

    async getRewards(accountNumber: number, channelSubscriptions: string[]): Promise<Array<string|undefined>>{
        console.log("Get rewards called")
        try{
            var isEligible:boolean = await this.eligibilityService.isEligibleForRewards(accountNumber);
        } catch(err){
            console.log(err.errorClass)
            if(err instanceof TechnicalError){
                console.log("Error is instance of Technical error")
                console.log(err.message)
                return [];
            } else {
                return Promise.reject(err)
            }
            
        }

        console.log(isEligible ? "Customer is Eligible":"Customer is Not Eligible")
        if(!isEligible){
            return []
        }
        let result =  new Set(channelSubscriptions
            .map( (stringSub:string) => this.subscriptionStore.findByName(stringSub) )
            .filter((subscription) => subscription !== undefined)
            .flatMap( ( subscription ) => subscription?.getRewards())
            .map(reward => reward?.getName()));
        return Array.from(result);
    }

    getSubscriptions():Array<string>{
        return this.subscriptionStore.findAll().map(subscription => subscription.getName());
    }


}