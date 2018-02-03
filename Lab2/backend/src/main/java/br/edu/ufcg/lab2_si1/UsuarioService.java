package br.edu.ufcg.lab2_si1;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ufcg.model.Usuario;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;

	public boolean cadastra(Usuario usuario) {
		if (usuarioRepository.exists(usuario.getEmail())) {
			return false;
		} else {
			usuarioRepository.save(usuario);
			return true;
		}
	}

	public Collection<Usuario> emailsCadastrados() {
		return usuarioRepository.findAll();
	}
}
