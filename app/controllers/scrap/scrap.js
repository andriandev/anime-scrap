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

        function getElementContent(element){
            return `<div class="download">${element}</div>`;
        } 
    
        const scraper = new Scraper(config); //Create a new Scraper instance, and pass config to it.
    
        //Now we create the "operations" we need:
    
        const root = new Root(); //The root object fetches the startUrl, and starts the process.  
    
        const link = new CollectContent('.venutama .download', { name: 'link', contentType:'html', getElementContent }); 
    
        root.addOperation(link);
    
        await scraper.scrape(root);
    
        const links = link.getData() //Will return an array of all article objects(from all categories), each

        res.json(links);  
    })();  
}

exports.ScrapAlleps = (req, res) => {
    ( async () => {
        const config = {
            baseSiteUrl: `https://otakudesu.site/`,
            startUrl: req.query.url,
            concurrency: 5, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
            maxRetries: 3, //The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
            logPath: null, //Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data.
        }

        function getElementContent(element){
            return `<div class="download">${element}</div>`;
        }   

        const scraper = new Scraper(config); //Create a new Scraper instance, and pass config to it.

        //Now we create the "operations" we need:
    
        const root = new Root(); //The root object fetches the startUrl, and starts the process.  

        const eps = new OpenLinks('.venser .episodelist ul li a', {name:'eps' }); //Opens each eps page.

        const link = new CollectContent('.venutama .download, .venser .download', { name: 'link', contentType:'html', getElementContent }); //"Collects" the link dl from each

        root.addOperation(eps); //Then we create a scraping "tree":
            eps.addOperation(link);

        await scraper.scrape(root);

        const Alleps = eps.getData(); 

        let AllData = [];
        Alleps.forEach(el => {
            AllData.push(el.data[0].data);
        });

        res.json(AllData.reverse().join(' '));
        // res.json(Alleps)
    })();
}