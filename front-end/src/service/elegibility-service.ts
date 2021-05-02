import { InvalidAccountError, TechnicalError } from "./errors";

export interface EligibilityService{
    isEligibleForRewards(accountNumber:number):Promise<boolean>;
}

export class EligibilityServiceImpl implements EligibilityService{

    async isEligibleForRewards(accountNumber: number): Promise<boolean> {

        return fetch("/api/"+String(accountNumber))
            .catch(error => {console.log("error was caught");throw new TechnicalError(error.message)})
            .then(response => this.handleStatusCodes(response))
            .then(text => this.codeIsEligible(text))
    }

    async handleStatusCodes(response:Response): Promise<string>{
        if (response.ok){
            return response.text();
        } else if (response.status === 404){
            let msg = await response.text()
            console.log("msg return "+ msg);
            throw new InvalidAccountError(msg)
        } else{
            let msg = await response.text()
            throw new TechnicalError(msg)
        }
    }
    codeIsEligible(text: string): boolean {
        switch (text) {
            case "CUSTOMER_ELIGIBLE":
                return true; 
            case "CUSTOMER_INELIGIBLE":
                return false;
            default:
                throw new TechnicalError(text + " did not match any known response");
        }
    }
}

