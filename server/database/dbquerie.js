import Environment from '../config/database';

class Database extends Environment {
  static dbConnection() {
    return Environment.dbConnection();
  }

  static createTables() {
    const conn = this.dbConnection();
    const result = conn.query(`
          CREATE TABLE IF NOT EXISTS users( 
            id SERIAL,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            gender VARCHAR(255) NOT NULL,
            jobrole VARCHAR(255) NOT NULL,
            department VARCHAR(255) NOT NULL,
            address VARCHAR(50) NOT NULL,
            type VARCHAR(50) NOT NULL,
            PRIMARY KEY (id));

            CREATE TABLE IF NOT EXISTs articles(
                id SERIAL,
                creatorid SERIAL references users(id) ON DELETE CASCADE,
                title VARCHAR(500) NOT NULL,
                article VARCHAR(500) NOT NULL,
                createdOn DATE NOT NULL,
                flag INT,
                PRIMARY KEY(id));
    
        CREATE TABLE IF NOT EXISTs comments(
            id SERIAL,
            articleId SERIAL references articles(id) ON DELETE CASCADE,
            comment VARCHAR(500) NOT NULL,
            createdOn DATE NOT NULL,
            flag INT NOT NULL,
            PRIMARY KEY(id));
        `);
    return result;
  }

  static async createUser(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department,address,type) 
    VALUES(
      '${data.firstName}',
      '${data.lastName}',
      '${data.email}',
      '${data.password}',
      '${data.gender}',
      '${data.jobRole}',
      '${data.department}',
      '${data.address}',
      '${data.type}'
      ) returning *;`);
    await conn.end();
    return result;
  }

  static async createArticle(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO articles(creatorid,title,article,createdOn,flag) 
    VALUES(
      '${data.creatorid}',
      '${data.title}',
      '${data.article}',
      CURRENT_TIMESTAMP,
      '${data.flag}'
      ) returning *;`);
    await conn.end();
    return result;
  }

  static async createComment(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO comments(articleid,comment,createdon,flag) 
    VALUES(
      '${data.articleId}',
      '${data.comment}',
      CURRENT_TIMESTAMP,
      '${data.flag}'
      ) returning *;`);
    await conn.end();
    return result;
  }

  static async update(tableName, column1, value1, column2, value2, column3, value3) {
    const conn = this.dbConnection();
    const result = await conn.query(`update ${tableName} set ${column1}='${value1}',  ${column2} = '${value2}'  WHERE ${column3} = '${value3}' returning *`);
    await conn.end();
    return result;
  }

  static async updateOne(tableName, column1, value1, column2, value2) {
    const conn = this.dbConnection();
    const result = await conn.query(`update ${tableName} set ${column1}='${value1}' WHERE ${column2} = '${value2}' returning *`);
    await conn.end();
    return result;
  }

  static async selectBy(table, column, value) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table} WHERE ${column}='${value}'`);
    await conn.end();
    return result;
  }

  static async selectAll(tableName) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${tableName};`);
    await conn.end();
    return result;
  }

  static async selectAllOrderBy(tableName, column1, value) {
    const conn = this.dbConnection();
    const result = await conn.query(` SELECT * from ${tableName} order by ${column1} ${value}`);
    await conn.end();
    return result;
  }


  static async selectBy2colum(table, column1, operator, value1, column2, value2, logGate) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table} WHERE ${column1}${operator} '${value1}' ${logGate} ${column2}='${value2}'`);
    await conn.end();
    return result;
  }

  static async delete(table, column1, value1) {
    const conn = this.dbConnection();
    const result = await conn.query(`DELETE FROM ${table} WHERE ${column1}='${value1}'`);
    await conn.end();
    return result;
  }
}

export default Database;
