package br.edu.ufcg.lab2_si1;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ufcg.model.Artista;

@RestController
public class ArtistaRest {

	@RequestMapping("/artistas")
	public Object helloWorld() {
		Artista a = new Artista("katty perry", "Capa do witness"); 
		return a.toString();
	}
	
	
}
