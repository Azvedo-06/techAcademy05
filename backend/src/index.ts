import sequelize from './config/database'
import app from './app'

const port = 3000
// sync database
sequelize
    .sync({alter: true})
    .then(() => {
        console.log("database foi sincronizado com sucesso");
    })
    .catch(() => {
        console.log("falha ao tentar sincronizar a database");
    });

// esse fica por ultimo sempre
app.listen(port, () => {
    console.log("Server is running on port: ", port);
});