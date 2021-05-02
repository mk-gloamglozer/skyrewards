import { SubscriptionStore, SubscriptionStoreImpl} from '../subscription-store';
import Subscription from '../subscription';

var subscription:Subscription;
var subscriptionStore:SubscriptionStore;

beforeEach(() => {
    subscription =  <Subscription>{}
    subscription.getName = jest.fn(() => "MOCK")
    subscriptionStore = new SubscriptionStoreImpl([subscription]);
})

describe("SubscriptionStore", () =>{

    test("subscription store returns subscription if name present", () => {
        expect(subscriptionStore.findByName("MOCK")).toEqual(subscription);
    })

    test("subscription store returns undefined if not present", () => {
        expect(subscriptionStore.findByName("NOT_PRESENT")).toBeUndefined()
    })

})