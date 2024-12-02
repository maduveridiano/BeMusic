import {Artista, Album, Musica} from '../db.js'


const pegarMusicaPorId = async (req, res) => {
    try {
      const musica = await Musica.findByPk(req.params.id);
      if (!musica) {
        return res.status(404).json({ error: 'musica não encontrado' });
      }
      return res.status(200).json(musica);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Erro ao buscar musica' });
    }
  };

  export {pegarMusicaPorId}