const realEstateTest = artifacts.require("./RealEstate.sol");


contract("realEstateTest", async function(accounts) {
  var _instance;

	const price = 1;
	const size = 23;
	const geoAddress = '20 avenue de la Marne';
	const description = 'un joli appartement';
	const documents = 'Carte d identité, ...';
	const rooms = 1;
	const owner = accounts[1];
  before(async function () {
    _instance = await realEstateTest.deployed();
    return assert.isTrue(true);
  });


  it('Result of post should be equal than posted info', async () => {
		await _instance.post(price, size, geoAddress, description, documents, rooms);

		var res = await _instance.realEstates.call(0);
  
		assert.equal(res['Price'], price);
		assert.equal(res['Size'], size);
		assert.equal(res['Address'], geoAddress);
		assert.equal(res['Description'], description);
		assert.equal(res['Documents'], documents);
		assert.equal(res['nbRooms'], rooms);
		assert.equal(res['selling'], true);
	});

	it('2nd result should be equal than posted info,', async () => {
		await _instance.post(price+100, size+10, geoAddress, description, documents, rooms+1);
		var res = await _instance.realEstates.call(1);
		assert.equal(res['Price'], price+100);
		assert.equal(res['Size'], size+10);
		assert.equal(res['Address'], geoAddress);
		assert.equal(res['Description'], description);
		assert.equal(res['Documents'], documents);
		assert.equal(res['nbRooms'], rooms+1);
		assert.equal(res['selling'], true);

	});

	it('Buy and the owner should be the buyer', async () => {
		res = await _instance.realEstates.call(0);
		//console.log(accounts);
		//await _instance.buy(0, accounts[1], accounts[0]);
		await _instance.buy(0, {from : accounts[1], value : price});
		res = await _instance.realEstates.call(0);
		assert.equal(res['selling'], false);
		assert.equal(res['owner'], accounts[1]);
		
	});

	it('Get Estates of owner, length should be equal to the available infos', async () => {
		res = await _instance.getEstatesByOwner(accounts[0]);
		assert.equal(res.length, 2);
	});
});



