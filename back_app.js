const express=require('express');
const puppeteer =require('puppeteer');
const app=express();
const { scrapeMytek,  scrapeTunisiaNet ,scrapeScoop}=require('./final');

app.set('view engine','ejs');
app.listen(8080);

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

 app.get('/',(req,res)=>{
     res.render("recherche");
 })

app.post('/',async(req,res)=>{

    const ref=req.body.ref;
   // const obj_my=await scrapeMytek(ref);
   const browser = await puppeteer.launch({headless : false ,slowMo:10,defaultViewport : false});
   const page = await browser.newPage();
     const tab_tn= await scrapeTunisiaNet(ref,page);
      const tab_my= await scrapeMytek(ref,page);
     const tab_sc=await scrapeScoop(ref,page);
          //const obj_s =await scrapeScoop(ref);
    
    //console.log(obj_tn.prix)
     res.render("index",{tab_tn ,tab_sc,tab_my});//, 
//    const t =scrape(ref);
//    res.render("index",{tnet:t[0].prix,url_tn : t[0].url, disp_tn:t[0].disp})
    
   
    
});