import db from '../config/db';
import User from '../../model/user.model';
import DatabaseError from '../../model/errors/database.error.model';

class UserRepository {

   async findAllUsers(): Promise<User[]> {
        const query = 'SELECT uuid, email, username FROM tb_users_application';
        const { rows } = await db.query<User>(query);

        return rows || [];
   }

   async findById(uuid: string): Promise<User> {
      try {
         const query = `
            SELECT uuid, email, username FROM tb_users_application
               WHERE uuid = $1
         `
         const params = [ uuid ]
         const { rows } = await db.query<User>(query, params);
         const [ user ] = rows

         return user;

      } catch(error) {
         throw new DatabaseError("ID not found", error);
      }
   }

   async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
      try {
         const query = `
            SELECT uuid, email, username FROM tb_users_application
               WHERE username = $1 AND password = crypt($2, password)
         `
         const params = [ username, password ];
         const { rows } = await db.query<User>(query, params);
         const [ user ] = rows;
   
         return user || null;

      } catch(error) {
         throw new DatabaseError("Username or password wrong!" , error);
      }
   }

   async createUser(user: User): Promise<string> {
         const script = `
            INSERT INTO tb_users_application ( username, email, password )
               VALUES ( $1, $2, crypt($3, gen_salt('bf')) )
            RETURNING uuid;
         `

         const params = [ user.username, user.email ,user.password ];
         const { rows } = await db.query<{ uuid: string }>(script, params);
         const [ newUser ] = rows;

         return newUser.uuid;

   }

   async updateUser(user: User): Promise<void> {
         const script = `
            UPDATE tb_users_application SET 
               username = $1,
               email = $2,
               password = crypt($3, gen_salt('bf'))
            WHERE uuid = $4
         `

         const params = [ user.username, user.email ,user.password, user.uuid ];
         await db.query(script, params);

         return;
   }

   async deleteUser(uuid: string): Promise<void> {
         const script = `
            DELETE FROM tb_users_application
               WHERE uuid = $1
         `

         const params = [ uuid ];
         await db.query(script, params);

         return;
   }
}

export default new UserRepository();