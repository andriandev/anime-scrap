// Method Controller
exports.Home = (req, res) => {
    res.render('pages/home', {
        title: 'Home',
        req: req
    });
}

exports.About = (req, res) => {
    res.render('pages/about', {
        title: 'About',
        req: req
    });
}

exports.Error = (req, res) => {
    res.render('pages/error', {
        title: '404 Page Not Found',
        req: req
    });
}