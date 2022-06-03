const puppeteer =require('puppeteer');

//const  HomepageMytek= require("./pages/HomePageMytek") ;

// import HomePageScoop from "./pages/HomePageScoop";

 const scrapeMytek=async function (ref,page){
    // const browser = await puppeteer.launch({headless : false ,slowMo:10,defaultViewport : false});//devtools:true
    // const page = await browser.newPage();
    await page.goto("https://spacenet.tn/", {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });
    await page.waitForSelector("#_mobile_cart");
    await page.waitForSelector("#mobile-header");
    await page.type("#search_query_top",ref,{delay :10} );
    await Promise.all([ page.keyboard.press('Enter'), page.waitForNavigation()]);
    const products =await page.$$("#box-product-grid > div > div.item");//#js-product-list > div > div> article
    let i=0; 
    let tab=[] ;
    for (let product of products ) {
    try {  i++; 
    const title=await page.evaluate(el => el.querySelector("div.right-product > div.product_name > a").textContent,product);
    const prix=await page.evaluate(el => el.querySelector("div.right-product > div.product-price-and-shipping > span.price").textContent,product);
    const url=await page.url();
    let obj ={"prix":prix,
    "titre":title,
    "url":url
    };
     //console.log("1111111111111111",title,prix);
     tab.push(obj);
     if(i==3) break;
    }
    catch (err){console.log(err)}
    }
    return tab;

 }
const scrapeTunisiaNet=async function (ref,page ){
    // const browser = await puppeteer.launch({headless : false ,slowMo:10,defaultViewport : false});
    // const page = await browser.newPage();
    await page.goto("https://www.tunisianet.com.tn/",{
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });
    await page.waitForSelector("#content-wrapper").catch(err=> console.log(err));
    await page.waitForSelector("#header > div.header-top");
    await page.type("#search_query_top",ref,{delay :10} );

    //await ;page.click("#sp-btn-search > button",{clickCount :1})
    await Promise.all([page.keyboard.press('Enter',{delay:10}), page.waitForNavigation()]);
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
 const scrapeScoop=async function (ref,page){
    // const browser = await puppeteer.launch({headless : false ,slowMo:10,defaultViewport : false});
    // const page = await browser.newPage();
    await page.goto("https://www.scoop.com.tn/",{
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });
        await page.waitForSelector("#header > div.header-center");
        await page.click("#search_query_block");
        await page.keyboard.type(ref);
        await page.keyboard.press('Enter');
        await page.waitForSelector('.content_product_list').catch(err=>console.log("errr"));
        const products =await page.$$("div >.content_product_list >ul >li  ");
let i=0; 
let tab=[] ;
for (let product of products ) {
try {  i++; 
const title=await page.evaluate(el => el.querySelector("div>h5>a").textContent,product);
const prix=await page.evaluate(el => el.querySelector("div>div.price-box>span").textContent,product);
const url=await page.url();
//console.log("22222222",title,prix);
let obj ={"prix":prix,
"titre":title,
"url":url
};

tab.push(obj);
if(i==3) break;
}
catch (err){console.log("err")}
}
return tab;
   

 }

module.exports ={
    scrapeTunisiaNet ,scrapeMytek,  scrapeScoop
}