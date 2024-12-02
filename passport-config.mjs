import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; // Importa la estrategia local
import bcrypt from 'bcrypt'; // Para cifrar contraseñas
const users = [];

// Configurar LocalStrategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' }, // Campos personalizados
    async (email, password, done) => {
      try {
        // Buscar usuario en la "base de datos"
        const user = users.find(u => u.email === email);
        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serializar y deserializar usuario
passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser((email, done) => {
  const user = users.find(u => u.email === email);
  done(null, user || false);
});




export default passport