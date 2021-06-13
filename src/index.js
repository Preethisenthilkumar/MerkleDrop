import Web3 from "web3";
import {ethers} from 'ethers'
import MerkleTree from 'merkletreejs';
import keccak256 from 'keccak256';


function hashToken(tokenId,account){
  return Buffer.from(ethers.utils.solidityKeccak256(
    ['uint256','address'],
    [tokenId, account],
  ).slice(2), 'hex');
}

//Amount and token pair/////////////////////////////////////
const tokens = {
  '20000000000000000000000':'0x5294fEad26d3efF8731dc057BdBd9F788016d19B',
  '20100000000000000000000':'0xc76d69a15d4B61770DAE771390d92B983cd1e408',
  '9500000000000000000000':'0xff7B6F8A93C7bdE80e8246ac4A49D8F2A5fF14E1',
  '520000000000000000000':'0xf0018172C0080BB613045dB5fFec2107eB999152',
  '9530000000000000000000':'0xDBB257dEA6b300235A74bbE1535C55994DE6e674',
  '9540000000000000000000':'0x72DA338eF9997Aa939967c7Ea58F1520d0514D06',
  '9550000000000000000000':'0xb7f4d10eff5467B0406Deb0d6Ab2A3047067D2ED',
  '9560000000000000000000':'0x1e4ea9026107bf8Ba56a18C8B7A1B130E11731c0',
  '9570000000000000000000':'0x7CA9ECE9b3A39660618bb66f327f8dCe0aD38Abc',
  '9580000000000000000000':'0xd07e5cB83A8c4a14DE6fe8dD8De8df1A09E9457e',
  '9590000000000000000000':'0x856426f0eCBD39828B4e17B39378fe7A6B8bA811',
  '1500000000000000000000':'0x9395b1dB088d71Ed6c3a106f10Dce39b8c1600BB',
  '2500000000000000000000':'0xd1400E772ACca998e8B08D30eCffbd70864Aa8D1',
  '3500000000000000000000':'0x5C5FF89dbBB9154d638fc5243bbE9a6f353bCd9D',
  '4500000000000000000000':'0xF7cB28DF367Aa2F7E7C3E1C7ab7Bbb09387F1f9b',
  '5500000000000000000000':'0x3d05dC2F2600612C7FA15b95ED10F33a13068909',
  '6500000000000000000000':'0xdC85Cb26F7CdAF165C5d5e242A20509a99CA1194',
  '7500000000000000000000':'0xf07eE57B3B69245E2a3A60ECA5cAA52782A20e3f',
  '8500000000000000000000':'0x9876969F154c823b4d531dECcFe218D479B90968',
  '100000000000000000000':'0x3EE10071301A8d20ab5E92dEB1c51022E199dDde',
  '200000000000000000000':'0x6a58b5fFC5a3f63Bd37f2b9fb92a00D3d4f49092',
  '300000000000000000000':'0x64A3b5e4A562693658993250844846724802B893',
  '400000000000000000000':'0x010DF250b63e175c7C960AC5da06aFA8cBe63E80',
  '500000000000000000000':'0xeD5AA66cb0F9281F245BbBd965A2f99920f239C6',
  '600000000000000000000':'0x6f6eE7b88B9d4732584E2B122434c86cac5Ddc1f',
  '700000000000000000000':'0x7b177851351487A28582E20163054DDcFCc460fF',
  '800000000000000000000':'0x286dC0E380558799aA35d17fe37188930Ed648cB',
  '310000000000000000000':'0xEA1C278983d6EFAa8c095b50EC5D9C311aca3214',
  '120000000000000000000':'0x8277f77F314e0C6494f84cfC9E9f2aa82a8A38Ba',
  '450000000000000000000':'0xEbb572059363FA4FfF24781b24650Dc8ea74d33F',
  '9501000000000000000000':'0x5768295bb467B7e0552C399ceB5021Dd71EBb5D9',
  '9502000000000000000000':'0xa7190c34cFb110d34656e4eBaF722Bfe7d02c326',
  '9503000000000000000000':'0xAFcD3b4396A20161a05b9B24A6DD3744352b92B1',
  '9504000000000000000000':'0xa300F119411e591c846F17c7431d6C14f83447dd',
  '9505000000000000000000':'0x0b3d6b922194575744c7365a5Ff4BEeEe40A7D4F',
  '9506000000000000000000':'0x613072aDAe833a8c4c60883F459d4d17A8a7699A',
  '9507000000000000000000':'0x497eaEF16A3b4AC502e0eceF0Bf858228B531774',
  '9508000000000000000000':'0x4EE07c0E1aDf6285314E3C681a53B5A425a467d2',
  '9509000000000000000000':'0x4cE1642AE19101b9F9a2C05f62CA3660CD13f587',
  '950010000000000000000':'0x7dCC284467b275227A854fc82D02066d81CF71D3',
  '950200000000000000000':'0x7Ce8a3Dbc0EFD57e118e5046c47D04F77610c78c',
  '953000000000000000000':'0xC20C44C84A0d5c32B0979478D35D8fcf1FE3E85b',
  '954000000000000000000':'0x5D81D7766091e5B5628743893bBbb554bed101B2',
  '955000000000000000000':'0x32fd4f499a4d1f7690458f7D54D3B56b81609e23',
  '956000000000000000000':'0x0A5d64e74BA4D35e4CEd6389E2154D4faF72Cd0f',
  '957000000000000000000':'0x5acf79acc346e18ae0a8fd38a9f045293f416282',
  '958000000000000000000':'0x5320DaFda1B1e9C984c251B1eCbD8a40624290ba',
  '959000000000000000000':'0x136e409d3C13DbF044d8eCa5e6c22cb0a7915500',
  '1000000000000000000':'0xE31aA08f8980023022942FC8F3cf7714103E5aCa',
  '2000000000000000000':'0x1364e1D6763e024ab82A306d38EB9c4F1213bf27',
  '3000000000000000000':'0x9496eDE978c60D78DcAa392b046624bbeaAF0777',
  '9511000000000000000000':'0xc39A08124b2B34ae5ea02F5A92cEB3DBeDc5Fe6E',
  '9512000000000000000000':'0x31b09cab5fba15f1db0cbe456ba2a7946dced2d5',
  '9513000000000000000000':'0x54e7221017b4a4F02d9F2E00dFbe44a550d05c57',
  '9514000000000000000000':'0x3124dF5f94286536758509941BE1237F41A83542',
  '9515000000000000000000':'0x99eaEB9DD44670FcEa40A700a2B2EE1B9efff130',
  '9516000000000000000000':'0xb282C2c8F1969d2C01a50450aABaB3e13431Dfaa',
  '9517000000000000000000':'0xB786793F00Caf8416991D021941D0e73B8df710b',
  '9518000000000000000000':'0x06e21F38B0e36E0D2CaBc9208C3bFfbC3504dc7A',
  '9519000000000000000000':'0x54F8466be9e3128314A5b1F9e8B7d6C6cD3d3d8e',
  '9520000000000000000000':'0xdA7f26b42fBd3E6D8eA5DFa1eBde6e318282569f',
  '9521000000000000000000':'0xEd4F343A0C87D260c59C6371279245c15346E9bB',
  '9522000000000000000000':'0x4f0889dF2b4782151844920d6aa0B6fC86840A19',
  '9523000000000000000000':'0x92C28198f6e00911c1642e350814cD53262760f4',
  '9524000000000000000000':'0x8F9aAC70c8f8cFdbf10FD2aA58929a4b92d38b47',
  '9525000000000000000000':'0x5595f4376E684aF4dBc114bD1b12e769c71A672b',
  '9526000000000000000000':'0xBa33aDDBAB71AD98cEA7945d70Ad1984E870F1AE',
  '9527000000000000000000':'0x9e66bFB88a23903acF27BbF7df8c1aEb52D48Cc9',
  '9528000000000000000000':'0xdCBa99806b2be83ef6a44e780cEe281991c13c80',
  '9529000000000000000000':'0xD012F286a7d098B187c9C32E5C8AF7CbbB3BF326',
  '9531000000000000000000':'0x03951c8aED4382213850D2CBb58fD33BC645E499',
  '9532000000000000000000':'0xe7ec1f7563EAbcE20e1ff2ca10E301a1970D0AAe',
  '9533000000000000000000':'0xAD797445d5D9F21AAd049D255cAAaC9D019FC671',
  '9534000000000000000000':'0x481C20d99F800bcFddBBD8C6518f9898D81c5815',
  '9535000000000000000000':'0x99Dc1bFb2B7D6e28497DCb77e4aA8520Fa869780',
  '9536000000000000000000':'0xFa8d8d8ab4A0Ba66fAceE0cFA99B75C004B23e68',
  '9537000000000000000000':'0xd15D53537eB16D0eA8d2e15a5b91107082dc6Ef6',
  '9538000000000000000000':'0x462d8B1Ac24a9b537D30B929B4b4DFdcA21CBF42',
  '9539000000000000000000':'0x136831acF9ab0E62ffaCbab2FBB93b11948B1a63',
  '954100000000000000000':'0xcA53b815C5E5A8130eCb8f94c24249250de0d291',
  '9542000000000000000000':'0xBC7AE64E0d888aE4B75f14CE27E0DcdF6363F6b1',
  '9543000000000000000000':'0xb2B7ccEA04704A805c79c46F7B2fb2E2893d81b2',
  '9544000000000000000000':'0x783135e0E742A5648E9d28baBfbBF9063cfC6909',
  '9545000000000000000000':'0x24680Aae004c3826B2f311b2c924cE8e58ba2006',
  '9546000000000000000000':'0xf2f593fcd0Da16ABB6C13680fD4343108F5093B2',
  '9547000000000000000000':'0xb60672b105cdcb310dc60d7bbe0f821a54df94b4',
  '9548000000000000000000':'0x1b8E87c5dba4Bd087075ef8E202A769E1cB5D90b',
  '9549000000000000000000':'0x513001bb0160fE6Da28bAaC6BC98ea725bfe2741',
  '9551000000000000000000':'0xd5aa7033E29F93BA965a13cb30AAD98613a943c7',
  '9552000000000000000000':'0xB1cA3D9cAE15c7AF787d69D237a1C1C3aBa2130D',
  '9553000000000000000000':'0xfC2C5191611E46c8A936450688F9DbFD70058f55',
  '9554000000000000000000':'0x01e4e5E6804Da0CBC4D2a75DB65D9A99A801f097',
  '9555000000000000000000':'0xb4ed077A20F0BFb8b72bb1729A5E96CF0B39aF52',
  '9556000000000000000000':'0x6b5D2fb4a7e970c1bacBe80cEB20f025618125AE',
  '9557000000000000000000':'0x439ffda3a256481c6d5fc3df8deadd19eb5247e6',
  '9558000000000000000000':'0x75313BE03410E32B20cF890AC7321c89c221E289',
  '9559000000000000000000':'0x48C50f05375cC0af7C3d7F08010eBc992cc5666c',
  '9561000000000000000000':'0xC0807eeE28b2834Ace0012522b831aBC6A815381',
  '9562000000000000000000':'0xeb8BAA767F1A8eDd779e87715Cfe1B583B3b8645',
  '9563000000000000000000':'0xC24b41C344da342D788c64a585e34E31b73F3a63',
  '9564000000000000000000':'0x2BeFa81F42C0fB020837b070664C600902E4D255',
  '9565000000000000000000':'0x4929FD44D79F6338c8c1d64fD45e7F334caa1009',
  '9566000000000000000000':'0x0de8AEC5022389112e5113F77eC6Eb0347FDE03A',
  '9567000000000000000000':'0x9289B071533D1aDA0a7A88d0c2d2Bc54cdDbbA90',
  '9568000000000000000000':'0xcaf7323b1e8a5d552508ffdc3f5d2e120dfeb1b7',
  '9569000000000000000000':'0x9b8E0538D1e66E1f98641Ac6Cb2394A64c2c1Ede',
  '9571000000000000000000':'0x1C09248F76345003bAd98D78eaEec109EAD8481e',
  '9572000000000000000000':'0xa95CF1dFbb9F76e8Dd2920ACe2EdD487c60DaD21',
  '9573000000000000000000':'0xF73dFd64110654c107412ac692B64cf8129Ae2Ef',
  '9574000000000000000000':'0xfBF74FE3598371FB47C6246B824600B06f81bcf3',
  '9575000000000000000000':'0x020a24f6FCC52372c62616D88b673Ba6b03bFE6d',
  '9576000000000000000000':'0xC479A442C9c2Ef1ab75cA2A25E72e3Ac4570456D',
  '9577000000000000000000':'0xc6404f24db2f573f07f3a60758765caad198c0c3',
  '9578000000000000000000':'0x3204a9839E46442FEd4390fDdf706c743350C7b4',
  '9579000000000000000000':'0xcA2F4606Ae7f546E3BE1D4B10363A2b6E73b0848',
  '9581000000000000000000':'0xc6404d87F4A87C2230Bc2b59fe7d88d56d09A5fb',
  '9582000000000000000000':'0x61A9bAcD3541a051b38c94bAE2D74C7D46479071',
  '9508300000000000000000':'0x1ea24517879A5f55e912F918f2451EAF008fe83b',
  '984000000000000000000':'0xFee647F20039C59534Bc076610eBA8FD34f26486',
  '9585000000000000000000':'0x7fCd528bEBaf08162Da748106EB7827d91d9C36d',
  '9586000000000000000000':'0x89727D8377D7eFB9B0c7938aa1Da18d9B8304739',
  '9587000000000000000000':'0x4ecc3cd993264875b3BcddB0BC94b8927590F636',
  '9588000000000000000000':'0x6011Bd53395092F7A131af125979A98823094f6D',
  '9589000000000000000000':'0x3AF8e71E0509B635E869AB9328Ec713Ad4a262D5',
  '9591000000000000000000':'0x4F8C61113D119977067A0CF1A254576423bf5c9c',
  '9592000000000000000000':'0xa4a76F1A89208546ef090CB32BE8eE73649125C9',
  '9593000000000000000000':'0x8C7d655C08D9d58eF720C5970eFEbc1001742BD3',
  '9594000000000000000000':'0xd9291A2879405B3ba64e6e1A25238E6085437fA3',
  '9595000000000000000000':'0x05EEdC0B4F9DBc84D7Ad11239551D6B1d09fC186',
  '9596000000000000000000':'0xb37522063947c692de09821081bf19c51e4513b9',
  '9597000000000000000000':'0xF816788D910Eb604D6f4d1d3DE63732B4e5C8ffd',
  '9598000000000000000000':'0xb3757aea5513f8a37a18cd4512308ec81315f755',
  '9599000000000000000000':'0xd4b34368d1f3AB6EDB7c977b24f9ebBB7E6B097f',
  '950000000000000000001':'0x8aC73a43eABF6Fba4a0893e7898808154598B981',
  '950000000000000000002':'0x6EC2E64Beb995Fac0088890D6D658B490c40da4A',
  '950000000000000000003':'0x006e8580bC0f93Db56370632C3Ad5E9b888C8fDA',
  '950000000000000000004':'0xaA9DcA598b95be4A2fEda11272194007ef78A8ff',
  '950000000000000000005':'0x9177Af30733A8611433111960b12aFF68574C5EF',
  '950000000000000000006':'0x5104a0e0D5f74b1D3507006242D7092AA6099955',
  '950000000000000000007':'0xE7089231f0233736F965A5d5A29364981a6c20b9',
  '950000000000000000008':'0x9869D2E6868078c02297B39ef4182fbF6A71b622',
  '950000000000000000009':'0xc4a39fEB3567EFBe5A3Ae37F7F270CCbbdC193bA',
  '9500000000000000000011':'0xE1c029B40874df7a072AF562481e4d3fC31afD26',
  '9500000000000000000012':'0x5A9AFA16BFa3eE3be5091A112e7A0584E332237b',
  '9500000000000000000013':'0x41bf36F40a258B9bE2256a0FA44B2D50AA077762',
  '9500000000000000000014':'0x3A11dD49C97E949c02eF83e6f75838322158c8ec',
  '9500000000000000000015':'0x81b7Df99b023bECAAF743E14539483532e7fF0DB',
  '9500000000000000000016':'0x34a9CEC496FF1f90c9CAA81A0FeE1eBd628281F8',
  '9500000000000000000017':'0xFe522553ae8198B787bDae825710027C3A7e5D61',
  '9500000000000000000018':'0xc85BCCfd4dD5C9AFffC5223129E7a1CD7997EaF7',
  '9500000000000000000019':'0xe9b87EABfbe050649b9C9c0016c9a08Ac35702f3',
  '9500000000000000000020':'0x9E3249190EFeCFDb33346Df0cc487A9A680681B7',
  '9500000000000000000021':'0x1263b52fC320e25cFcBF56BbC1166808519DB23D',
  '9500000000000000000022':'0xCa70BC64f8306161Be22270f1122474E301Aec77',
  '9500000000000000000023':'0x09DbBA94aEaEDE8e6601b18bd8603d1a98F2Fcdb',
  '9500000000000000000024':'0x828E4c2B5557589e026bB653BA4EE77bF2f4e519',
  '9500000000000000000025':'0xA633bFCF60bD7086c36B3174B34C29f983236562',
  '9500000000000000000026':'0x0A4E4EB108608db43557609B6Ab1Ef787707b3eb',
  '9500000000000000000027':'0xb8C617438dc1e957D22B262Ccd8BC816fEe7c041',
  '9500000000000000000028':'0x57F1cFC17629D660F1b4Bb4E0f82844FB61d1517',
  '9500000000000000000029':'0x6b3E5d4343179FB20c4c8297D290F1FE3Eb1fB39',
  '9500000000000000000031':'0x5d060444b62e124c2cC52AFd1c5d6113C6E45E24',
  '9500000000000000000032':'0xe6A02fb545519b1e70293aaf660F7aD195dbd79C',
  '9500000000000000000033':'0x35EdE73244Aa7891250D79EEF2dce9aECe09B93D',
  '9500000000000000000034':'0xF2Ec91Fb80eE6119A78F0Ca6da24845DFA3Cf1F5',
  '9500000000000000000035':'0xfb4c69DBB670674EF4538B0b955a7e4cB7410348',
  '9500000000000000000036':'0x54065a18d90F99A3720d05fF6d702Cf36cC1CDf7',
  '9500000000000000000037':'0x76dc39b2652Ea30cfD9BfAf9De566A9Dd5efCcd1',
  '9500000000000000000038':'0xf0CEB7BC9603042e1a3E6C263CA8781781a8A3f9',
  '9500000000000000000039':'0x7a0A170Bbd2bF7C9bc3Ac4B7FAFF1109eA98B41d',
  '9500000000000000000041':'0x163f0c9b3d7327c1bd05300418122063a8caa4e5',
  '9500000000000000000042':'0x6a0C5394B2F0C6973E29978EB26178FDD73b020f',
  '9500000000000000000043':'0xdCf7aAa239f760D6F21B72C49041486067858B7D',
  '9500000000000000000044':'0x24513539Ae1a8DAFEA0f4C5453edec13355d9621',
  '9500000000000000000045':'0x973F18140a0A3A0298EE49195022ccd11cDB41b4',
  '9500000000000000000046':'0x063A202ABCa70364bBCF8B990d706103b4959Cf5',
  '9500000000000000000047':'0x9A0Cbb298E81c013f603B496f0462d71A6229f1b',
  '9500000000000000000048':'0xBf636b6fBf3F0d2c3f109666665FBe99066C268D',
  '9500000000000000000049':'0x77E2F238e0243408ea721b4Da46FD376fC6bB4Ec',
  '9500000000000000000051':'0xD2174E9C8BDF74Aa2918Ac1a0360f6A474fE6417',
  '9500000000000000000052':'0x15e0518f5554E9242AA25834d52A2b7E27B78C47',
  '9500000000000000000053':'0x87DF2b057cfCeA2e21F8F0Ac8f12d87f8ACf6c4D',
  '9500000000000000000054':'0xa9547707a4FA91924645e95E44C4C0039eFBfd48',
  '9500000000000000000055':'0x862BC4B173CF9788CA11D21D25Bc94D5F5a002fa',
  '9500000000000000000056':'0x9aA7ceA421F080EF4f95F264A8efaeD700e0106D',
  '9500000000000000000057':'0x560ae6764455742B518e2bAE7557a07ECe9F3f37',
  '9500000000000000000058':'0xbe700792435315F2B01B4fD85Ffa5eE9940fFcd8',
  '9500000000000000000059':'0x41c89b8D6C2878fd7aF62008216F45b4a21508E6',
  '9500000000000000000061':'0x14F2E4688c40c84f92363267c35C1525fb376f7B',
  '9500000000000000000062':'0x882f7B493F561C24E95f3Dc8D7c2619B33B14342',
  '9500000000000000000063':'0x2b163d1ba370E8da10c0Ad811E963B08ac4Df67C',
  '9500000000000000000064':'0xf413524008806286a8203cf034a22b3c1c317067',
  '9500000000000000000065':'0x3e733fdFceFe67ab97F12859bcD31E27Bb011117',
  '9500000000000000000066':'0xc8eb966a5542D3C1F2B87aF00aA38a16D4f5BB23',
  '9500000000000000000067':'0x0dD4ce7b855abb71628A8c09E296Cb737730e69a',
  '9500000000000000000068':'0x631E0d8Cf69b1f7DebdF1728f1eE0B9d20Fb7e1f',
  '9500000000000000000069':'0x2396a0BEb8d20C947AfC6314aE763E4B09De215A',
  '9500000000000000000071':'0x900003b662cc3601DBE45b8e04A2cd0eedCDFED7',
  '9500000000000000000072':'0xE7570684fA6A737b6FbCE413C9957F54d7988b09',
  '9500000000000000000073':'0x00661749C32229817d7cec63bcDA77f32AABD468',
  '9500000000000000000074':'0x5fAb480425e4008819fd8F5835E4219CDFcDa026',
  '9500000000000000000075':'0xc3A6f32C13D1400Ff5CDc5Bffd07A29268b7ba3B',
  '9500000000000000000076':'0x6Fe556e1Ad38B2339196e174e84cA678b2e8B282',
  '9500000000000000000077':'0x6BA16F1180b61F9D382573FF80Fd263FD24dFc70',
  '9500000000000000000078':'0x3990e08736EB39Bf4b20C32AB630ab9C35d2AC1E',
  '9500000000000000000079':'0x6d701DC14E52C2E73d52E83cB3DC3D88BDb92F54',
  '9500000000000000000081':'0x472B85769B0E34B32b583208E1703896e753BB2D',
  '9500000000000000000082':'0x7c1D3E91c50D0A18d58723602A5259Dd10635c26',
  '9500000000000000000083':'0xB95d893489af8f3b1D3a6b5FD7f95Afd13Af5d3f',
  '9500000000000000000084':'0xc846B7d5Ad79060758F9ed2fE6BA5dD68D00C00F',
  '9500000000000000000085':'0x20066E29bb66b2E950c088CaF9271e58d57FeBD1',
  '9500000000000000000086':'0x3Bb706e5d84dD113731ac4b654439a5C3d4dB1F1',
  '9500000000000000000087':'0x1Cb4E0bd58c606517001Ac0bC62aC65Eb74aB204',
  '9500000000000000000088':'0x0ACD840b8dc9211b71585a3d711F68fe504D5BdE',
  '9500000000000000000089':'0xB09F792195556AD7Baa66C30AE9D7FDaDda3f5b7',
  '9500000000000000000091':'0x7aaA33FC268D56Dc7E1e93117DF2dd0ae34935E9',
  '9500000000000000000092':'0xA7EA822349b0261F79A3163B4676a8Fd3D8bae77',
  '9500000000000000000093':'0x95C24ccfB5182eAE1E1418c2826e265429FEC12d',
  '9500000000000000000094':'0x4aD5582ea3C6571Fa99A0E1a4E39C95E849399cb',
  '9500000000000000000095':'0xfE29c3c02df973b70536A17D085cC4D84af7Faeb',
  '9500000000000000000096':'0x99e5C4c132670769EBFfaAc7f61098A138b2c14a',
  '9500000000000000000097':'0x7a1E3bba621a87F08e8f353Aca1FD2532d4D38D2',
  '9500000000000000000098':'0x95d2de3f56eb198a5067a5641f1bdc0525dd26b1',
  '9500000000000000000099':'0xf0423155789AF8fAf80d4C3462651d549A53d0D1',
  '95000000000000000001':'0xf20BE0c1D7D495511b3910D5AE138160901E61AA',
  '95000000000000000002':'0x70dDA89B047cce12eb103DAeAFEBd603b76CbDaE',
  '95000000000000000003':'0xd9E45f13b2e3C2630e19D5513EFA7d057667d217',
  '95000000000000000004':'0x22ca63B2Ebad30a606746035a23d247Ab787c2fE',
  '95000000000000000005':'0x133d136798BA81c4C98C943C0c3a4a8CFFD2A2aA',
  '95000000000000000006':'0xD0B74BAE747a7756644B1f453577449055693A6c',
  '95000000000000000007':'0xe0eDcBafb45E36742EC172B4a341E0c9aF3Ef30A',
  '95000000000000000008':'0x3ed2c5277dBFC6213c773bDdF91456c27ef2414D',
  '95000000000000000009':'0x28CF08B3A9ADB8Cf17e2766807ff87014B482d54',
  '950000000000000000100':'0xDe33415668F2BF23fd909552866b89bb7Cb20268',
  '950000000000000000200':'0x3A147a33369A8C812D6B93f0931Dec2Ca93D1f60',
  '950000000000000000300':'0xBa0259E871722e65EE1b43558230D957D22c508F',
  '950000000000000000400':'0x02460D0Cb7ae1F14104c267439CA920e69226C04',
  '950000000000000000500':'0xd002f53979dd9acb946a82ffe04d0e4383cf5f92',
  '950000000000000000600':'0x052B192d175aaDBaC42618BEFBBa6C10b35b2057',
  '950000000000000000700':'0x8BdF6A38f4F155Bf7db47Feb63ae51137a77cA4c',
  '950000000000000000800':'0xa0D2bA6442134dB0600c8B213dd52a60Ec9aEAB3',
  '950000000000000000900':'0xaA467442640F5F912480cB12a26025b06B81b61E',
  '9500000000000000001100':'0x79CDBB6Bb9F40F7CeBd288DaDA0e6192333f73F3',
  '9500000000000000001200':'0xbcD5e7Cf5E5B1D95Ea969932E3dd1243E07fB20A',
  '9500000000000000001300':'0xe23157473f70d1C19ce83F0376eD9AdC86409575',
  '9500000000000000001400':'0x8a115a0f1bac934d9c2a2f72e65af86cbef9276f',
  '9500000000000000001500':'0x692778C4938e47DE79A2EAd8f7e962f65E5Fac9a',
  '9500000000000000001600':'0x8a7d853f21264e98c34cdb877d7ac5792246cab4',
  '9500000000000000001700':'0xe7Bd0278CCbe5b4b655A26ae2a4cA700F9FD0e1f',
  '9500000000000000001800':'0xa103884f8fFF39bb3f6Dad809B27a5784E865652',
  '9500000000000000001900':'0x68dBfc9B00a99FD466F1A14a4fFE4B63dD03d619',
  '9500000000000000002100':'0x7Bcd662C1b3A0bf3E9F9eb40595e26D5E32e4FF6',
  '9500000000000000002200':'0x1a7B90BAcB436C3576D6f514E4d96d6954D8b80d',
  '9500000000000000002300':'0xdD06F243aA68A3a24937804952C9186bf68BFF60',
  '9500000000000000002400':'0x047256A9EAbE8B56d4A3AB13279417e34dC79aC0',
  '9500000000000000002500':'0x0BEaFFae5f98ccbD3e0199C5711D31f04AbBcE58',
  '9500000000000000002600':'0xbccc9afebfb0bbacfa94261f1dd37a85aa1a746e',
  '9500000000000000002700':'0xa1e1Fb08584e5E9d0CbfE143dDDFe9e26634cb84',
  '9500000000000000002800':'0xFeFC2ff1759026bDd4a79bcC8EF875541b1A93f0',
  '9500000000000000002900':'0xf44906Aa1b90ff51933AD62B26e9D2dc3cd55fE5',
  '9500000000000000003100':'0x202c8b326cA75bf737fD709b524A1333681f0480',
  '9500000000000000003200':'0x3Ce4F6D4149af87ECBc2a061A0A5d13f6144E04F',
  '9500000000000000003300':'0xeB764670032B4B232472775a65BeA8bC4ede8A09',
  '9500000000000000003400':'0xAE69C7da02F8fEa531842CcF5e706068f682b968',
  '9500000000000000003500':'0x07211286d0cCe7Bd3Be9E193dF8879beCc68e69C',
  '9500000000000000003600':'0x8A7C8B5D722C8278767D50C4376e52AfEE917eFe',
  '9500000000000000003700':'0x72dBC8Be06A40eE5F31F0231b215E2a5bd56DdE8',
  '9500000000000000003800':'0x950281ddd4589ac0b3a6eb1576f040996d3a3350',
  '9500000000000000003900':'0xAcF4BffDEeA3fdE401864370ADf7b17B837E8060',
  '9500000000000000004100':'0x2b91459A78acC93415fC69436C2971911f2a1feC',
  '9500000000000000004200':'0x50d14885439CD4193cD4361b262635820822E923',
  '9500000000000000004300':'0xAEE28B24fc73127B68557dABDe15b58413cbFeb6',
  '9500000000000000004400':'0x445A1E454D62432E4738ea153ACbCFf3B4D5e961',
  '9500000000000000004500':'0xc719a7b73fdb3a017a8463f8f504f982b6893f73',
  '9500000000000000004600':'0xA507998D06e8C3BB7251BB5D45260D1427b30069',
  '9500000000000000004700':'0x8fdD16CBE70bdE7a1eB0492d78e88807328FcBD4',
  '9500000000000000004900':'0xbd49BB3aB35c8A681bb70B26804F1628017B8c48',
  '9500000000000000005100':'0x8B31F723cFb2eFDe03D82E42D26F577987F45a26',
  '9500000000000000005200':'0xae811ab3e67A502e2E456FB7b9851f66ef0254ce',
  '9500000000000000005300':'0x39A09a611c16e2138DcDcB089086Ca750805C7Cb',
  '9500000000000000005400':'0x64C0c27718316E587fdAc11e4230Af34D7A8Fa6f',
  '9500000000000000005500':'0x1A48436B65306258c6A2f9703Fc2b2dd6357F3f5',
  '9500000000000000005600':'0x11466CbA50e7490054de78B911092732FBF05E92',
  '9500000000000000005700':'0x959edd3B0cdA42A8B5b36E0b9Bd50454d999EC64',
  '9500000000000000005800':'0x45CD09CA30dD78eD4451Fa68Df549d05EF0659Df',
  '9500000000000000005900':'0x9c4269f4383CefbEce59309A217d652045AF4998',
  '9500000000000000006100':'0xecEb6f33bc59B7208b4ef3A0e328087eAA803D52',
  '9500000000000000006200':'0x40cadc8498b59f99630da95004bf31df0935edbd',
  '9500000000000000006300':'0x56861cdD7557EdA68f04B5496aA6A8585CaD1d04',
  '9500000000000000064000':'0x49A56e979811228FE14af78A0De407f36A0F829C',
  '7880899000000000000000':'0xA658Eb758Ec68496EDb027D506BB33356a71FCBF',
  '9866788000000000000000':'0x6434A3d14F6c7B7E95312922379C14F2A28275f6',
  '3434353000000000000000':'0x96e59AD424AB7FD2368B15e1fbafd725755DD48C',
  '7838000000000000000000':'0xbE3381530BA425Eb0322f66586e11e17B1643255'
};

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}



const leaf = Object.entries(tokens).map(token => hashToken(...token));
const merkletree = new MerkleTree(leaf, keccak256, { sortPairs: true});
const merkleRoot = merkletree.getHexRoot();
console.log('root',merkleRoot)
	

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      this.meta = new web3.eth.Contract(
        [
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "redeemed",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "bytes32[]",
                "name": "proof",
                "type": "bytes32[]"
              }
            ],
            "name": "redeem",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "allowance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "decimals",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "root",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "symbol",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "bytes32[]",
                "name": "proof",
                "type": "bytes32[]"
              }
            ],
            "name": "verifyAccount",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "withdrawn",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ],
        "0xcA4242e085d27fDa9e5b447e90E505d159ebdCf2",
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshBalance();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  

  

  redeem: async function() {
    const receiver = document.getElementById("receiver").value;
    const tokenId = getKeyByValue(tokens,receiver)
    if(!(tokenId in tokens))
    document.getElementById("status").innerHTML = "Not Eligible";

    const proof = await merkletree.getHexProof(hashToken(tokenId, receiver))

    document.getElementById("status").innerHTML = "Initiating transaction... (please wait)";
    
    if(tokenId in tokens){
    const { redeem } = this.meta.methods;
    await redeem(receiver, tokenId, proof).send({ from: this.account })
    .on('receipt',function(){
      document.getElementById("status").innerHTML = 'Transaction complete, check your balance!';
    })
    .on('error',function(error){
      document.getElementById("status").innerHTML = 'Error - invalid merkle proof / already withdrawn tokens';
    });
  }
  },

  verifyAccount: async function() {
    const receiver = document.getElementById("receiver").value;
    const tokenId = getKeyByValue(tokens,receiver)
    if(!(tokenId in tokens))
    document.getElementById("status").innerHTML = "Not Eligible";
    const proof = await merkletree.getHexProof(hashToken(tokenId, receiver))

    if(tokenId in tokens){
    const { verifyAccount } = this.meta.methods;
    await verifyAccount(receiver, tokenId, proof).call().then(function(result){
      if(result == true){
        document.getElementById("status").innerHTML = 'Eligible for claim';
      }
      else{
        document.getElementById("status").innerHTML = 'Not Eligible for claim';
      }
    });		
  }
  },

  balanceOf: async function() {
    const receiver = document.getElementById("receiver").value;
    const tokenId = getKeyByValue(tokens,receiver)
    if(!(tokenId in tokens))
    document.getElementById("status").innerHTML = "Not Eligible";
    
    if(tokenId in tokens){
    const { balanceOf } = this.meta.methods;
    await balanceOf(receiver).call().then(function(result){
        document.getElementById("status").innerHTML = result;
    });		
  }
  },


  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
