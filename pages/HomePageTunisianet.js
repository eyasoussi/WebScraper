
const puppeteer =require('puppeteer');


 class HomePageTunisianet  {
     
    async visit(){
        const browser = await puppeteer.launch({headless : false ,slowMo:10});//devtools:true
        const page = await browser.newPage();
        await page.goto("https://www.tunisianet.com.tn/",{
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });
        await page.waitForSelector("#content-wrapper").catch(err=> console.log(err));
        
   
    }
    async isNavbarDisplayed(){
        await page.waitForSelector("#header > div.header-top");
        
    }
    async search (ref){

           
    await page.type("#search_query_top",ref,{delay :10} );

    //await ;page.click("#sp-btn-search > button",{clickCount :1})
    await Promise.all([page.keyboard.press('Enter',{delay:10}), page.waitForNavigation()]);
        
    }
    // async price(){
     
    //     const info =await page.$eval("#js-product-list > div > div > article > div > div.wb-action-block.col-lg-2.col-xl-2.col-md-2.col-sm-2.col-xs-12 > div.product-price-and-shipping > span.price",el =>el.textContent).catch(err => console.log("err"));
    //     console.log(info);
    // }
    // async disponibilite(){
    //     const valable = await page.$eval('#stock_availability > span',el =>el.textContent).catch(err=>console.log("err"));
    //     console.log(valable);
    // }
       
async prix_titre(){
    //const valable = await page.$$eval('.availability',el =>el.con).catch(err=>console.log("errr"));
    const products =await page.$$("div >div.products >div.item-product ");
    let i=0; 
    let tab=[] ;
    for (let product of products ) {
    try {  i++; 
    const title=await page.evaluate(el => el.querySelector("div.wb-product-desc> h2.h3.product-title > a").textContent,product);
    const prix=await page.evaluate(el => el.querySelector("div.wb-action-block >div.product-price-and-shipping >span.price ").textContent,product);
    //console.log("3333333",title,prix);
    const url=await page.url();
    let obj ={"prix":prix,
    "titre":title,
    "url":url,
    };
     
      tab.push(obj);
     if(i==3) break;
    }
    catch (err){console.log("err")}
    }
    return tab;
        }

}
module.exports ={
    HomePageTunisianet
}