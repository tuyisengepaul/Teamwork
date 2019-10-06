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
                creatorid INT references users(id) ON DELETE CASCADE,
                title VARCHAR(500) NOT NULL,
                article VARCHAR(500) NOT NULL,
                createdOn DATE NOT NULL,
                PRIMARY KEY(id));
    
        CREATE TABLE IF NOT EXISTs comments(
            id SERIAL,
            articleId INT references articles(id) ON DELETE CASCADE,
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
}

export default Database;