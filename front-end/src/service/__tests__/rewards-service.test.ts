import Reward from '../../domain/reward';
import Subscription from '../../domain/subscription';
import { SubscriptionStore } from '../../domain/subscription-store';
import { EligibilityService } from '../elegibility-service'
import { InvalidAccountError, TechnicalError } from '../errors';
import {RewardsServiceImpl, RewardsService} from '../rewards-service'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
var mockElegibilityService = <EligibilityService>{}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
var mockSubscriptionStore:SubscriptionStore = <SubscriptionStore>{}

var rewardsService:RewardsService; 

var findByName:jest.Mock<Subscription|undefined, [name:string]>;
var isEligibleForRewards:jest.Mock<Promise<boolean>,[acc_no:number]>;

const reward:Reward = {getName:()=> "name"}
const subscription:Subscription = {getName:()=> "subscription", getRewards:() => [reward]}

beforeEach(() =>{
    isEligibleForRewards = jest.fn(acc_no => Promise.resolve(true))
    mockElegibilityService.isEligibleForRewards = isEligibleForRewards;

    findByName = jest.fn((name:string) => subscription);
    mockSubscriptionStore.findByName = findByName;

    rewardsService = new RewardsServiceImpl(mockElegibilityService, mockSubscriptionStore);
})
describe("RewardsService", () =>{
    test("when rewards service called then eligibility service called with same acc_no", async ()=>{
        await rewardsService.getRewards(1234,[])
        findByName.mockImplementation((name:string) => subscription)

        expect(isEligibleForRewards.mock.calls[0]).toEqual([1234]);
    })

    test("when eligibility service returns true then returns subscription rewards", async () =>{

        findByName.mockImplementation((name:string) => subscription)
        isEligibleForRewards.mockReturnValue(Promise.resolve(true))

        const rewards = await rewardsService.getRewards(1234, [subscription.getName()]);

        expect(findByName).toHaveBeenCalledWith(subscription.getName())
        expect(rewards).toEqual([reward.getName()])

    })

    test("when eligibility service returns false then return empty", async ()=>{
        isEligibleForRewards.mockReturnValue(Promise.resolve(false))
        const rewards = await rewardsService.getRewards(1234, [subscription.getName()]);

        expect(rewards).toEqual([])

    })

    test("when eligibility service thows technical error then return empty", async ()=>{
        isEligibleForRewards.mockImplementation((acc_num) => technicalErrorOnPromise())
        const rewards = await rewardsService.getRewards(1234, [subscription.getName()]);

        expect(rewards).toEqual([])
    })

    test("when eligibility service throws invalid account error then rethrows invalid account error", async() =>{

        isEligibleForRewards.mockImplementation((acc_num) => invalidAccountErrorOnPromise())
        let errmessage:string = ""
        try{

            await rewardsService.getRewards(1234, [subscription.getName()]);
        } catch (e){
            errmessage = e.message
        }
        expect(errmessage).toEqual("message")
    })

    test("when multiple identical rewards then only unique set returned", () =>{

        findByName
            .mockReturnValueOnce(subscription)
            .mockReturnValueOnce({getName:()=>"another", getRewards:() => [reward]})

        isEligibleForRewards.mockReturnValue(Promise.resolve(true))

        expect.assertions(1);
        return expect(rewardsService.getRewards(1234, [subscription.getName(), "another"]))
            .resolves.toEqual([reward.getName()]);

    })

    test("when no subscription returned then no rewards returned", () =>{

        findByName
            .mockReturnValueOnce(undefined)

        isEligibleForRewards.mockReturnValue(Promise.resolve(true))

        expect.assertions(1);
        return expect(rewardsService.getRewards(1234, [subscription.getName()]))
            .resolves.toEqual([]);
    })

    
})

function technicalErrorOnPromise(): Promise<boolean>{
    return Promise.resolve(true)
    .then((state) => {throw new TechnicalError()})
}

async function invalidAccountErrorOnPromise(): Promise<boolean>{
    throw new InvalidAccountError("message");
}