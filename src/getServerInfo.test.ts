import * as getServerInfo from "./getServerInfo"
// @ponicode
describe("getServerInfo._GetJoinTicket", () => {
    test("0", async () => {
        await getServerInfo._GetJoinTicket(0, "c466a48309794261b64a4f02cfcc3d64", "foo bar")
    })

    test("1", async () => {
        await getServerInfo._GetJoinTicket("c466a48309794261b64a4f02cfcc3d64", 9876, "Hello, world!")
    })

    test("2", async () => {
        await getServerInfo._GetJoinTicket(12345, "c466a48309794261b64a4f02cfcc3d64", "Foo bar")
    })

    test("3", async () => {
        await getServerInfo._GetJoinTicket(12345, "bc23a9d531064583ace8f67dad60f6bb", "This is a Text")
    })

    test("4", async () => {
        await getServerInfo._GetJoinTicket(9876, "c466a48309794261b64a4f02cfcc3d64", "foo bar")
    })

    test("5", async () => {
        await getServerInfo._GetJoinTicket(-Infinity, "", "")
    })
})

// @ponicode
describe("getServerInfo._GetServerData", () => {
    test("0", async () => {
        await getServerInfo._GetServerData(9876, "c466a48309794261b64a4f02cfcc3d64", "Foo bar")
    })

    test("1", async () => {
        await getServerInfo._GetServerData("c466a48309794261b64a4f02cfcc3d64", "bc23a9d531064583ace8f67dad60f6bb", "Hello, world!")
    })

    test("2", async () => {
        await getServerInfo._GetServerData("c466a48309794261b64a4f02cfcc3d64", "da7588892", "Foo bar")
    })

    test("3", async () => {
        await getServerInfo._GetServerData(12345, 9876, "This is a Text")
    })

    test("4", async () => {
        await getServerInfo._GetServerData(0, "da7588892", "foo bar")
    })

    test("5", async () => {
        await getServerInfo._GetServerData(-Infinity, "", "")
    })
})
