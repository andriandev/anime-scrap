// Method Controller
const { Scraper, Root, OpenLinks, CollectContent, DownloadContent } = require('nodejs-web-scraper');

exports.Index = (req, res) => {
    res.render('scrap/index', {
        title: 'Scrapping',
        req: req
    });
}

exports.ScrapEps = (req, res) => {
    (async () => {
        const config = {
            baseSiteUrl: `https://otakudesu.site/`,
            startUrl: req.query.url,
            concurrency: 5, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
            maxRetries: 3, //The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
            logPath: null, //Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data.
        }
    
        const scraper = new Scraper(config); //Create a new Scraper instance, and pass config to it.
    
        //Now we create the "operations" we need:
    
        const root = new Root(); //The root object fetches the startUrl, and starts the process.  
    
        const link = new CollectContent('.venutama .download', { name: 'link', contentType:'html' }); 
    
        root.addOperation(link);
    
        await scraper.scrape(root);
    
        const links = link.getData() //Will return an array of all article objects(from all categories), each

        const data = `<div class="download">${links[0]}</div>`;

        res.json(data);  
    })();  
}