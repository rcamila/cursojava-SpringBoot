package com.cursojava.curso.dao;

import com.cursojava.curso.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao{
    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    @Override
    public List<Usuario> getUsuarios() {

        String qry = "FROM Usuario";

        return entityManager.createQuery(qry).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        Usuario usuario = entityManager.find(Usuario.class, id);

        entityManager.remove(usuario);
    }

    @Override
    public void registrar(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario usuarioVerificado(Usuario usuario) {

        String qry = "FROM Usuario WHERE email = :email";

        List <Usuario> lista = entityManager.createQuery(qry)
                .setParameter("email", usuario.getEmail())
                .getResultList();

        System.out.println(usuario.getEmail());

        if (lista.isEmpty()){
            return null;
        }

        String pwHashed = lista.get(0).getPassword();

        System.out.println(pwHashed);
        System.out.println(usuario.getPassword());

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(pwHashed, usuario.getPassword())){
            return lista.get(0);
        }
        return null;
    }
}
