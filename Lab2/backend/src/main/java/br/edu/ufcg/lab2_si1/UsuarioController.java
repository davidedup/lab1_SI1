package br.edu.ufcg.lab2_si1;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ufcg.model.Usuario;

@RestController
public class UsuarioController {
	
	@Autowired
	UsuarioService usuarioService;
	
	@RequestMapping(method=RequestMethod.POST, value="/cadastro")
	public ResponseEntity<Usuario> cadastraUsuario(@RequestBody Usuario usuario) {
		if(usuarioService.cadastra(usuario)) {
			return new ResponseEntity<Usuario>(usuario, HttpStatus.CREATED); 
		}else {
			return new ResponseEntity<Usuario>(usuario, HttpStatus.FAILED_DEPENDENCY);
		}
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/usuarios")
	public ResponseEntity<Collection<Usuario>> usuarios() {
		Collection<Usuario> emails = usuarioService.emailsCadastrados();
		return new ResponseEntity<Collection<Usuario>>(emails, HttpStatus.OK); 
	}
	
}