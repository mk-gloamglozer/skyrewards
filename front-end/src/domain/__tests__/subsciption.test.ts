import {KIDS,MOVIES,MUSIC,NEWS,SPORTS} from '../subscription'

test("Kids has correct name and no rewards", () =>{
    expect(KIDS.getName()).toBe("KIDS");
    expect(KIDS.getRewards()).toEqual([]);
});

test("Movies has correct name and PofC reward", () =>{
    expect(MOVIES.getName()).toBe("MOVIES");
    expect(MOVIES.getRewards().map((reward) =>{return reward.getName()})).toEqual(["PIRATES_OF_THE_CARIBBEAN_COLLECTION"]);
});

test("Music has correct name and karoke reward", ()=>{
    expect(MUSIC.getName()).toBe("MUSIC");
    expect(MUSIC.getRewards().map((reward) =>{return reward.getName()})).toEqual(["KARAOKE_PRO_MICROPHONE"]);
});

test("News has correct name and no rewards", () =>{
    expect(NEWS.getName()).toBe("NEWS");
    expect(NEWS.getRewards()).toEqual([]);
});

test("Sport has correct name and champions league reward", () =>{
    expect(SPORTS.getName()).toBe("SPORTS");
    expect(SPORTS.getRewards().map((reward) => reward.getName())).toEqual(["CHAMPIONS_LEAGUE_FINAL_TICKET"])
})