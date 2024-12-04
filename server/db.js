import Express from "express"; 
import { criarTabelas } from "./db.js";
import cors from "cors";
import { rotas_autenticacao } from "./rotas/rotas_autenticacao.js";
import { rotas_usuarios } from "./rotas/rotas_usuario.js";
import { rotas_artistas } from "./rotas/rotas_artista.js";
import { rotas_albums } from "./rotas/rotas_album.js";
import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const User = Sequelize.define('user', {
    nome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    sobrenome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dataNascimento: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'inativo'
    },
    foto_perfil: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://res.cloudinary.com/duo8nbu2l/image/upload/v1732039695/bkuozj0eb4iefrsbjoda.jpg'
    },
})

const Artista = sequelize.define('artista', {
    nome: {
        type:Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type:Sequelize.DataTypes.TEXT,
        allowNull: true,
    },
    imageUrl: {
        type:Sequelize.DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'artists',
});

const Album = sequelize.define('album', {
    title: {
        type:Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    releaseYear: {
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    coverImageUrl: {
        type:Sequelize.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'albums',
});

const Musica = sequelize.define('musica', {
    titulo: {
        type:Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    duracao: {
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    fileUrl: {
        type:Sequelize.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'musicas',
});



Album.belongsTo(Artista, {
    foreignKey: 'artista_id',
    onDelete: 'CASCADE',
});
Album.hasMany(Musica, {
    foreignKey: 'album_id',
    as: 'Musicas',
});
Artista.hasMany(Album, {
    foreignKey: 'artista_id',
    as: 'Albums',
});
Musica.belongsTo(Album, {
    foreignKey: 'album_id',
    onDelete: 'CASCADE',
});
Musica.belongsTo(Artista, {
    foreignKey: 'artista_id',
    onDelete: 'CASCADE',
});

const criarTabelas = () => {
    Sequelize.authenticate().then(() => {
        console.log('conectou')
    })
        .catch((err) => {
            console.log(err)
        })
    Sequelize.sync({ force: true }).then(() => {
        console.log('tabela criada')
    })
}

export { User, sequelize, criarTabelas, Artista, Album, Musica };