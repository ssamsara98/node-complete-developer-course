class ErrorController {
  static get404(req, res, next) {
    return res.status(404).render('404', {
      pageTitle: 'Page Not Found',
      path: '/404',
      isAuthenticated: req.session.isLoggedIn,
    });
  }

  static get500(req, res, next) {
    return res.status(500).render('500', {
      pageTitle: 'Error!',
      path: '/500',
      isAuthenticated: req.session.isLoggedIn,
    });
  }
}

module.exports = ErrorController;
