// Method Controller
const { Scraper, Root, OpenLinks, CollectContent, DownloadContent } = require('nodejs-web-scraper');

exports.Index = (req, res) => {
    res.render('scrap/index', {
        title: 'Scrapping',
        req: req
    });
}

exports.ScrapEps = (req, res) => {
    if(req.query.url == '' || !req.query.url) {
        res.json('Empty Urls');
    } else if(req.query.url.includes('neonime')) {
        (async () => {
            const config = {
                baseSiteUrl: `https://neonime.watch/`,
                startUrl: req.query.url,
                concurrency: 5, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
                maxRetries: 3, //The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
                showConsoleLogs: false,
                logPath: null, //Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data.
            }

            function getElementContent(element){
                return `<div class="sbox">${element}</div>`;
            } 
        
            const scraper = new Scraper(config); //Create a new Scraper instance, and pass config to it.
        
            //Now we create the "operations" we need:
        
            const root = new Root(); //The root object fetches the startUrl, and starts the process.  
        
            const link = new CollectContent('#links .linkstv .sbox', { name: 'link', contentType:'html', getElementContent }); 
        
            root.addOperation(link);
        
            await scraper.scrape(root);
        
            try {
                const links = link.getData();

                if (links == '') {
                    res.json('Invalid url.');
                    return false;
                }

                res.json(links); 
            } catch (e) {
                res.json(e);
            } 
        })();  
    } else if(req.query.url.includes('oploverz')) {
        (async () => {
            const config = {
                baseSiteUrl: `https://oploverz.asia/`,
                startUrl: req.query.url,
                concurrency: 5, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
                maxRetries: 3, //The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
                showConsoleLogs: false,
                logPath: null, //Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data.
            }

            function getElementContent(element){
                return `<div class="bixbox">${element}</div>`;
            } 
        
            const scraper = new Scraper(config); //Create a new Scraper instance, and pass config to it.
        
            //Now we create the "operations" we need:
        
            const root = new Root(); //The root object fetches the startUrl, and starts the process.  
        
            const link = new CollectContent('.entry-content .bixbox', { name: 'link', contentType:'html', getElementContent }); 
        
            root.addOperation(link);
        
            await scraper.scrape(root);
        
            try {
                const links = link.getData();

                if (links == '') {
                    res.json('Invalid url.');
                    return false;
                }

                res.json(links.at(-1)); 
            } catch (e) {
                res.json(e);
            } 
        })();  
    } else if(req.query.url.includes('otakudesu')) {
        (async () => {
            const config = {
                baseSiteUrl: `https://otakudesu.site/`,
                startUrl: req.query.url,
                concurrency: 5, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
                maxRetries: 3, //The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
                showConsoleLogs: false,
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
        
            try {
                const links = link.getData();

                if (links == '') {
                    res.json('Invalid url.');
                    return false;
                }

                res.json(links); 
            } catch (e) {
                res.json(e);
            } 
        })();  
    }
}

exports.ScrapAlleps = (req, res) => {
    if(req.query.url == '' || !req.query.url) {
        res.json('Empty All Urls');
    } else if(req.query.url.includes('neonime')) {
        ( async () => {
            const config = {
                baseSiteUrl: `https://neonime.watch/`,
                startUrl: req.query.url,
                concurrency: 1, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
                maxRetries: 3, //The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
                showConsoleLogs: false,
                logPath: null, //Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data.
            }  

            function getElementContent(element){
                return `<div class="sbox">${element}</div>`;
            } 

            const scraper = new Scraper(config); //Create a new Scraper instance, and pass config to it.

            //Now we create the "operations" we need:
        
            const root = new Root(); //The root object fetches the startUrl, and starts the process.  

            const eps = new OpenLinks('#seasons .se-c .se-a ul li a', {name:'eps' }); //Opens each eps page.

            const link = new CollectContent('#links .linkstv .sbox', { name: 'link', contentType:'html', getElementContent }); //"Collects" the link dl from each

            root.addOperation(eps); //Then we create a scraping "tree":
                eps.addOperation(link);

            await scraper.scrape(root);

            try {
                const Alleps = eps.getData(); 

                if (Alleps == '') {
                    res.json('Invalid url.');
                    return false;
                }

                let AllData = [];
                Alleps.forEach(el => {
                    AllData.push(el.data[0].data);
                });

                res.json(AllData.reverse().join(' '));
            } catch (e) {
                res.json(e);
            }
        })();
    } else if(req.query.url.includes('oploverz')) {
        ( async () => {
            const config = {
                baseSiteUrl: `https://oploverz.asia/`,
                startUrl: req.query.url,
                concurrency: 1, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
                maxRetries: 3, //The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
                showConsoleLogs: false,
                logPath: null, //Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data.
            }

            function getElementContent(element){
                return `<div class="bixbox">${element}</div>`;
            }   

            const scraper = new Scraper(config); //Create a new Scraper instance, and pass config to it.

            //Now we create the "operations" we need:
        
            const root = new Root(); //The root object fetches the startUrl, and starts the process.  

            const eps = new OpenLinks('article .bixbox.bxcl.epcheck .eplister ul li a', {name:'eps' }); //Opens each eps page.

            const link = new CollectContent('.entry-content .bixbox', { name: 'link', contentType:'html', getElementContent }); //"Collects" the link dl from each

            root.addOperation(eps); //Then we create a scraping "tree":
                eps.addOperation(link);

            await scraper.scrape(root);

            try {
                const Alleps = eps.getData(); 

                if (Alleps == '') {
                    res.json('Invalid url.');
                    return false;
                }

                let AllData = [];
                Alleps.forEach(el => {
                    if(el.data[0].data.length == 3) {
                        AllData.push(el.data[0].data[2]);
                    } else if(el.data[0].data.length == 2) {
                        AllData.push(el.data[0].data[1]);
                    } 
                });

                res.json(AllData.reverse().join(' '));
            } catch (e) {
                res.json(e);
            }
        })();
    } else if(req.query.url.includes('otakudesu')) {
        ( async () => {
            const config = {
                baseSiteUrl: `https://otakudesu.site/`,
                startUrl: req.query.url,
                concurrency: 1, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
                maxRetries: 3, //The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
                showConsoleLogs: false,
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

            try {
                const Alleps = eps.getData(); 

                if (Alleps == '') {
                    res.json('Invalid url.');
                    return false;
                }

                let AllData = [];
                Alleps.forEach(el => {
                    AllData.push(el.data[0].data);
                });

                res.json(AllData.reverse().join(' '));
            } catch (e) {
                res.json(e);
            }
        })();
    }
}