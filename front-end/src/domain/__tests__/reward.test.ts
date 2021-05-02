import {CHAMPIONS_LEAGUE_FINAL_TICKET, KARAOKE_PRO_MICROPHONE, PIRATES_OF_THE_CARIBBEAN_COLLECTION} from  '../reward';

test("Chamions league reward has expected name", ()=> {
    expect(CHAMPIONS_LEAGUE_FINAL_TICKET.getName()).toBe("CHAMPIONS_LEAGUE_FINAL_TICKET")
})

test("karaoke reward has expected name", ()=> {
    expect(KARAOKE_PRO_MICROPHONE.getName()).toBe("KARAOKE_PRO_MICROPHONE")
})

test("Pirates of the caribbean reward has expected name", () => {
    expect(PIRATES_OF_THE_CARIBBEAN_COLLECTION.getName()).toBe("PIRATES_OF_THE_CARIBBEAN_COLLECTION")
})