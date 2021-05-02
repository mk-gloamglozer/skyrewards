import {EligibilityService, EligibilityServiceImpl} from '../elegibility-service'
import fetchMock from 'jest-fetch-mock'

var eligibilityService:EligibilityService
fetchMock.enableMocks()

beforeEach(() => {
    eligibilityService = new EligibilityServiceImpl()
    fetchMock.resetMocks()
})

describe("Testing eligibility service", () =>{
    test("When status 404 then throws invalid account error", () =>{
        fetchMock.mockResponse("Not Found", {status:404})
        expect.assertions(1)
        return expect(eligibilityService.isEligibleForRewards(111).catch(err => err.errorClass)).resolves.toEqual("InvalidAccountError");
        
    })

    test("When return is CUSTOMER_ELIGIBLE then returns true", () =>{
        fetchMock.mockResponse("CUSTOMER_ELIGIBLE", {status:200})
        expect.assertions(1)
        return expect(eligibilityService.isEligibleForRewards(111)).resolves.toEqual(true)
    } )

    test("When return is CUSTOMER_INELIGIBLE then returns false", () =>{
        fetchMock.mockResponse("CUSTOMER_INELIGIBLE", {status:200})
        expect.assertions(1)
        return expect(eligibilityService.isEligibleForRewards(111)).resolves.toEqual(false)
    } )

    test("When api call is server error then throws error", () =>{

        fetchMock.mockResponse("Server Error", {status:500})
        expect.assertions(1)
        return expect(eligibilityService.isEligibleForRewards(111).catch(err => err.errorClass)).resolves.toEqual("TechnicalError");
    })
})
