import articles from '../models/articles';
import IdProider from '../helpers/idprovider';


/**
 * @description classs this class contains methods for manipulating articles,
 * (Create new article, edit an article and delete);
 */
class allAboutArticle {
  /**
   * @author Tuyisenge J.Paul
   * @param {object} req
   * @param {object} res
   */
  static newArticle(req, res) {
    let message = '';
    articles.map((article) => {
      if (article.article === req.body.article) {
        message = 'This article alread exist';
      }
    });
    if (message) {
      return res.status(409).json({
        status: '409',
        message,
      });
    }
    let todayDate = new Date();
    const data = {
      id: IdProider(articles),
      creatorid: req.user.id,
      title: req.body.title,
      article: req.body.article,
      createdOn: todayDate,
      flag: 0,
    };
    articles.push(data);
    return res.status(201).json({
      status: '201',
      message: 'article successfuly created',
      data,
    });
  }

  /**
   * @author Tuyisenge J.Paul
   * @param {object} req
   * @param {object} res
   */
  static editArticle(req, res) {
    const { flag } = req.params;
    const articleid = parseInt(req.params.id, 10);
    let message = '';
    articles.map((article) => {
      if (flag && article.id === articleid) {
        article.flag += 1;
        message = 'Article flagged successfuly';
      } else if (article.id === articleid) {
        article.title = req.body.title;
        article.article = req.body.article;
        message = 'Article updated successfuly';
      }
    });

    if (message) {
      return res.status(200).json({
        status: '200',
        message,
      });
    }
    return res.status(404).json({
      status: '404',
      message: 'Article not found',
    });
  }

  /**
   * @author Tuyisenge J.Paul
   * @param {object} req
   * @param {object} res
   */
  static deleteArticle(req, res) {
    const articleid = parseInt(req.params.id, 10);
    let message = '';
    articles.map((article, index) => {
      if (article.id === articleid) {
        articles.splice(index, 1);
        message = 'Article deleted successfuly';
      }
    });
    if (message) {
      return res.status(200).json({
        status: '200',
        message,
      });
    }
    return res.status(404).json({
      status: '404',
      message: 'Article not found',
    });
  }

  /**
   * @author Tuyisenge J.Paul
   * @param {object} req
   * @param {object} res
   */
  static getAllarticle(req, res) {
    const data = articles.sort((a, b) => {
      const dateA = new Date(a.createdOn);
      const dateB = new Date(b.createdOn);
      return dateB - dateA;
    });
    return res.status(200).json({
      status: '200',
      message: 'success',
      data,
    });
  }

  /**
   * @author Tuyisenge J.Paul
   * @param {object} req
   * @param {object} res
   */
  static getSpecificArticle(req, res) {
    const articleid = parseInt(req.params.id, 10);
    let data = '';
    articles.map((article) => {
      if (article.id === articleid) {
        data = article;
      }
    });
    if (data) {
      return res.status(200).json({
        status: '200',
        data,
      });
    }
    return res.status(404).json({
      status: '404',
      message: 'Article not found',
    });
  }
}

export default allAboutArticle;