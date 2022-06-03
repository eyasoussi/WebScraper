import BasePage from "./BasePage";

export default class HomePageScoop extends BasePage{
    async visit(){
        await page.goto("https://www.scoop.com.tn/",{
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });
        await page.waitForSelector("#header > div.header-center");
        
   
    }
    async isNavbarDisplayed(){
        await page.waitForSelector("#header > div.header-center");
        
    }
    async search (ref){
       // page.type("#search_query_block",ref,{delay :10} );
       // await Promise.all([page.click("#search_button"), page.waitForNavigation()]);
        await page.click("#search_query_block");
        await page.keyboard.type(ref);
        await page.keyboard.press('Enter');
        await page.waitForSelector('.content_product_list').catch(err=>console.log("errr"))
        
    }
    
async prix_titre(){
//const valable = await page.$$eval('.availability',el =>el.con).catch(err=>console.log("errr"));
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
   
}