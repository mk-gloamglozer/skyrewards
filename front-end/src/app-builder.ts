import { SubscriptionStore, SubscriptionStoreImpl } from "./domain/subscription-store"
import * as subscriptions from './domain/subscription'
import { EligibilityServiceImpl } from "./service/elegibility-service";
import { RewardsService, RewardsServiceImpl } from "./service/rewards-service";

const makeRewardsService = () => {
    let subscriptionStore:SubscriptionStore = new SubscriptionStoreImpl([
        subscriptions.KIDS,
        subscriptions.MOVIES,
        subscriptions.MUSIC,
        subscriptions.NEWS,
        subscriptions.SPORTS
    ]);

    let eligibilityService = new EligibilityServiceImpl();

    return new RewardsServiceImpl(eligibilityService, subscriptionStore);


}

export const DefaultRewardsService:RewardsService = makeRewardsService();