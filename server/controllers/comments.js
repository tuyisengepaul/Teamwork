/* eslint-disable no-shadow */
import Joi from '@hapi/joi';
import commentes from '../models/comments';
import articles from '../models/articles';
import IdProider from '../helpers/idprovider';
import { commente } from '../helpers/validation';
import customize from '../helpers/customize';

class comment {
  static createComment(req, res) {
    const articleid = parseInt(req.params.id, 10);
    let existArticle = '';
    let message = '';
    const { error } = Joi.validate(req.body, commente);
    if (error) {
      return customize.validateError(req, res, error, 400);
    }
    articles.map((article) => {
      if (article.id === articleid) {
        existArticle = article;
      }
    });
    commentes.map((newcomment) => {
      if (req.body.comment === newcomment.comment && articleid === newcomment.articleId) {
        message = 'Alread exist';
      }
    });
    if (message) {
      return res.status(409).json({
        status: '409',
        message,
      });
    }
    if (existArticle) {
      let todayDate = new Date();
      const data = {
        id: IdProider(commentes),
        articleId: existArticle.id,
        comment: req.body.comment,
        createdOn: todayDate,
        status: 'unflagging',
      };
      commentes.push(data);
      return res.status(201).json({
        status: '201',
        message: 'comment added',
        data: {
          createdOn: data.createdOn,
          articleTitle: existArticle.title,
          article: existArticle.article,
          comment: data.comment,
          status: 'unflagging',
        },
      });
    }

    return res.status(404).json({
      status: '401',
      message: 'Article not found',
    });
  }
}

export default comment;
