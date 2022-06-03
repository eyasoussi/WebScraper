import { beforeAll, jest } from '@jest/globals';
    import HomepageMytek from "../pages/HomePageMytek";
    import HomePageTunisianet from "../pages/HomePageTunisianet";
    import HomePageScoop from "../pages/HomePageScoop";
 let ref ="pc portable asus tuf ";
 //let ref="sxdcgyhbj;"
 //let ref2="sof ";
 //let ref="X415EA-BV842T";
describe("", ()=> {
    jest.setTimeout(50000);
    let homepageMytek ;
    let homePageTunisianet;
    let homePageScoop;
    beforeAll(async ()=>{
         homepageMytek =  new HomepageMytek();
         homePageTunisianet = new HomePageTunisianet();
         homePageScoop = new HomePageScoop();
        
     })
    it('Homepage of mytek should run ',async ()=>{
       
       await homepageMytek.visit();
       await homepageMytek.isNavbarDisplayed();
       await homepageMytek.search(ref);
       await homepageMytek.prix_titre();
      // await homepageMytek.price();
       // await homepageMytek.disponibilite();
   })
    it('Homepage of tunisianet should run ',async ()=>{
        await homePageTunisianet.visit();
        await homePageTunisianet.isNavbarDisplayed();
        await homePageTunisianet.search(ref);
        await homePageTunisianet.prix_titre();
    })
    it('Homepage of scoop should run ',async ()=>{
        await homePageScoop.visit();
        await homePageScoop.isNavbarDisplayed();
        
        await homePageScoop.search(ref);
        
        
        await homePageScoop.prix_titre();
        
    })
    
    
})