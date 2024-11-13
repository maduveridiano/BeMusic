import { User } from '../db';

export async function info_user(req, res) {
    const id = req.params.id;
    const Userteste = await User.findPk(id);
    if (!Userteste) {
        res.status(404).send('Usuário não existe');
        return;
    }
  res.send(Userteste);
}
