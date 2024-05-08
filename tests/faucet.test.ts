import { beforeEach, describe, expect, it } from "vitest"
import { Cl } from '@stacks/transactions'

const accounts = simnet.getAccounts()
const user = accounts.get("wallet_1")!

describe("lender tests", () => {
  beforeEach(() => {
    const send_stx = simnet.callPublicFn("faucet", "send-stx", [Cl.uint(1000)], user)
    expect((send_stx.result as any).value).toStrictEqual(Cl.uint(0))
  });

  it("should give STX to the user", async () => {
      const get_stx = simnet.callPublicFn("faucet", "get-stx", [Cl.uint(1000), Cl.principal(user)], user)
      expect((get_stx.result as any).value).toStrictEqual(Cl.uint(0))
    });

    it("should not give more STX than what is in the faucet", async () => {
      const get_stx = simnet.callPublicFn("faucet", "get-stx", [Cl.uint(1001), Cl.principal(user)], user)
      expect((get_stx.result as any).value.data).toStrictEqual("not enough STX in the faucet")
    });
});
