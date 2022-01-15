const AdvanceStoarge = artifacts.require("AdvanceStorage");

contract("Tests For AdvanceStorage Contract", () => {
  it("Deploying AdvanceStorage", async () => {
    const advancestorage = await AdvanceStoarge.deployed();
    assert(advancestorage.address != "");
  });

  it("Matching Owner with Contract Creator", async () => {
    let address = "0xF81d1c195aF68228081Ad3E5aB6f4B6e756EDBBF";
    const advancestorage = await AdvanceStoarge.deployed();
    const owner = await advancestorage.getCurrentOwner();
    assert(address === owner);
  });

  it("Changing Owner", async () => {
    let address = "0xF81d1c195aF68228081Ad3E5aB6f4B6e756EDBBF";
    let newowner = "0x49aE6082e7e7664958Eb06C7c724720cA0411a1E";
    const advancestorage = await AdvanceStoarge.deployed();
    await advancestorage.changeOwner(newowner);
    const newaddress = await advancestorage.getCurrentOwner();
    assert.equal(newowner, newaddress);
  });

  it("Getting array of owners", async () => {
    const advancestorage = await AdvanceStoarge.deployed();
    const ownerarray = [
      "0xF81d1c195aF68228081Ad3E5aB6f4B6e756EDBBF",
      "0x49aE6082e7e7664958Eb06C7c724720cA0411a1E",
    ];
    const getOwners = await advancestorage.getOwners();
    assert.deepEqual(ownerarray, getOwners);
  });

  it("Modifier:onlyowner check- Contract Creator can change owner", async () => {
    const advancestorage = await AdvanceStoarge.deployed();
    let address = "0xF81d1c195aF68228081Ad3E5aB6f4B6e756EDBBF";
    await advancestorage.changeOwner(address);
    const owner = await advancestorage.getCurrentOwner();
    assert.equal(owner, address);
  });
});
