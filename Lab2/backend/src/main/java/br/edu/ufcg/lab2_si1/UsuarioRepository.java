package br.edu.ufcg.lab2_si1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.edu.ufcg.model.*;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

}
