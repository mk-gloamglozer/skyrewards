
export interface Reward{
    getName():string
}

class RewardImpl implements Reward{

    private name:string

    constructor(name:string){
        this.name  = name;
    }

    getName(){
        return this.name;
    }
}


export const CHAMPIONS_LEAGUE_FINAL_TICKET:Reward = new RewardImpl("CHAMPIONS_LEAGUE_FINAL_TICKET")
export const KARAOKE_PRO_MICROPHONE:Reward = new RewardImpl("KARAOKE_PRO_MICROPHONE")
export const PIRATES_OF_THE_CARIBBEAN_COLLECTION:Reward = new RewardImpl("PIRATES_OF_THE_CARIBBEAN_COLLECTION")

export default Reward