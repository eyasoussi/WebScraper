

export default class HomePageMytek {
    async visit(){
        await page.goto("https://spacenet.tn/", {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });
        await page.waitForSelector("#_mobile_cart");
        
   
    }
    async isNavbarDisplayed(){
        await page.waitForSelector("#mobile-header");
        
    }
    async search (ref){
      
        await page.type("#search_query_top",ref,{delay :10} );
        await Promise.all([ page.keyboard.press('Enter'), page.waitForNavigation()]);
        /*
        await page.type("#search-mobile",ref,{delay :10} );
        await Promise.all([page.click("#search_mini_form_mobile button "), page.waitForNavigation()]);
        */ 
        
    }
   
    async prix_titre(){
    //const valable = await page.$$eval('.availability',el =>el.con).catch(err=>console.log("errr"));
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
}