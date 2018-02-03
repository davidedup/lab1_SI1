package br.edu.ufcg.model;

public class Artista {
	
	String nome, linkFoto;
	boolean favorito;
	int nota;
	Musica ultimaMusicaOuvida;
	
	
	
	public Artista(String nome, String foto) {
		this.nome = nome;
		this.linkFoto = foto;
	}

	@Override
	public String toString() {
		return "Artista [nome=" + nome + ", foto=" + linkFoto + "]";
	}


	
	
	

}
