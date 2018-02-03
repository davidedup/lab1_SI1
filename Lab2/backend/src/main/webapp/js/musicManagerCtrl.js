angular.module("musicManager").controller("musicManagerCtrl", function ($scope){

			$scope.artistaJaExiste = false;
			
			$scope.musicaJaExiste = false;
			
			$scope.mostrarPesquisado = false;

			$scope.infoArtista;
			
			$scope.mostraInfoArtista = false;

			$scope.playlists = [];

			$scope.artistas = [];

			$scope.usuarios = [];
			
			
			
			$scope.cadastraUsuario = function(nome, email , senha){
				if($scope.procuraUsurario(email) != -1){
					alert("email já esta cadastrado");
				}else{
					$scope.usuarios.push({nome: nome, email: email, senha: senha, artistas: []});
					alert("cadastro realizado");
				}
			}
			
			$scope.procuraUsuario = function(email){
				for (var i = $scope.usuarios.length - 1; i >= 0; i--) {
					if($scope.usuarios[i].email == email){
						return i;
					}
				}
				return -1	
			}
			
			$scope.login = function(email, senha){
				var indexOfUsurio = $scope.procuraUsuario(email);
				if(indexOfUsuario != -1){
					if($scope.usuarios[indexOfUsuario].senha == senha){
						$scope.artistas = $scope.usuarios[indexOfUsuario].artistas;
						alert("Você esta logado");
					}
				}else{
					alert("Usuario não cadastrado!");
				}
				
			}
			
			
			$scope.apagaPlaylist = function(playlist){
				var indexOfPlaylist = $scope.procuraPlayList(playlist.nome);
				if(indexOfPlaylist > -1){
					if(confirm("Deseja mesmo apagar a playlist?") == true){
						$scope.playlists.splice(indexOfPlaylist,1);
						alert("a playlist foi apagada!");
					}
				}	
			}

			$scope.apagarMusicaDaPlaylist =  function(nomeDaMusica, playlist){
				var indiceDaMusica = procuraMusicaNaPlaylist(nomeDaMusica, playlist); 
				if(indiceDaMusica != -1){
					playlist.musicas.splice(indiceDaMusica,1);
					alert("A musica '"+ nomeDaMusica + "' foi apagada da playlist!" )
				}
			}

			var procuraMusicaNaPlaylist =  function(nomeDaMusica, playlist){
				for (var i = playlist.musicas.length - 1; i >= 0; i--) {
					if(playlist.musicas[i].nomeDaMusica == nomeDaMusica){
						return i;
					}
				}
				return -1;
			}

			$scope.criaPlayList =  function(nomeDaPlaylist){
				if($scope.procuraPlayList(nomeDaPlaylist) != -1){
					alert("Playlist com esse nome já existe");
				}else{
					$scope.playlists.push({nome: nomeDaPlaylist, musicas: []});
				}
				delete $scope.nomeDaPlaylist;
			}

			//verifica se playlist com mesmo nome já existe:
			$scope.procuraPlayList = function(nomeDaPlaylist){
				for (var i = $scope.playlists.length - 1; i >= 0; i--) {
					if($scope.playlists[i].nome == nomeDaPlaylist){
						return i;
					}
				}
				return -1	
			}

			$scope.adcionaMusicaAPlaylist = function(nomeDaPlaylist, nomeDaMusica){
				var musica = procuraMusica(nomeDaMusica);
				if(musica != undefined){
					var aux = $scope.procuraPlayList(nomeDaPlaylist);
					if(aux != -1){
						if(musicaJaEstaNaPlaylist(nomeDaMusica, nomeDaPlaylist)){
							alert("musica já esta ta na playlist");
							return;
						}
						$scope.playlists[aux].musicas.push(musica);
						alert("'" + nomeDaMusica  + "' foi adiconado a playlis: "+ nomeDaPlaylist)
					}else{
						alert("Não existe Playlist com esse nome no sistema. Crie a Playlist antes de adicionar musicas");
					}

				}else{
					alert("Não existe musica com esse nome no Sistema. :-(");
				}
			}

			var musicaJaEstaNaPlaylist = function(nomeDaMusica, nomeDaPlaylist){
				for (var i = $scope.playlists.length - 1; i >= 0; i--) {
					if($scope.playlists[i].nome ==  nomeDaPlaylist ){
						for (var j = $scope.playlists[i].musicas.length - 1; j >= 0; j--) {
							if($scope.playlists[i].musicas[j].nomeDaMusica == nomeDaMusica){
								return true;
							}
						}
					}
				}
				return false;
			}

			var procuraMusica = function(nomeDaMusica){
				for (var i = $scope.artistas.length - 1; i >= 0; i--) {

					for (var j = $scope.artistas[i].albuns.length - 1; j >= 0; j--) {

						for (var k = $scope.artistas[i].albuns[j].musicas.length - 1; k >= 0; k--) {
							var aux =$scope.artistas[i].albuns[j].musicas[k].nomeDaMusica ;
							if(aux == nomeDaMusica){
								return $scope.artistas[i].albuns[j].musicas[k];
							}

						}
					}
				}
				return undefined;
			}

			$scope.mostraInfo =  function(artista){
				if($scope.infoArtista == undefined){
					$scope.infoArtista = artista;
				}else{
					$scope.infoArtista = undefined; 
				}
				$scope.mostraInfoArtista = !$scope.mostraInfoArtista;
			}

			$scope.mostraArtistaPesquisado = function(criterioDeBusca){
				$scope.mostrarPesquisado = !$scope.mostrarPesquisado;
			}

			$scope.cadastraNota = function(artista, nota){
				artista.nota = nota;
			}

			$scope.cadastraUltimaMusicaOuvida = function(artista, ultimaMusicaOuvida){
				if(procuraMusica(ultimaMusicaOuvida) == undefined){
					alert("Artista nao tem essa musica");
				}else{
					artista.ultimaMusicaOuvida = ultimaMusicaOuvida;
				}
			}

			$scope.adicionaAosFavoritos = function(artista){
				if(artista.ehFavorito != true){
					artista.ehFavorito = true;
					alert("Artista " + artista.nome + " adicionado aos favoritos")
				}
			}

			$scope.apagarDosFavoritos = function(artista){
				if(artista.ehFavorito == true){
					if (confirm('Tem certeza que deseja remover o artista') === true) {
						artista.ehFavorito = false;
						alert("Você apagou o artista dos favoritos");
					}
				}
			}

			$scope.adicionaArtista = function(artista) {
				if (verificaSeArtistaExiste(artista.nome) != -1) {
					$scope.artistaJaExiste = true;
				} else {
					if(artista.foto == undefined || artista.foto == ""){
						artista.foto = "http://centralwordpress.com.br/wp-content/uploads/whatsapp-imagens-para-perfil-7.jpg";
						}
						$scope.artistaJaExiste = false;
						artista.albuns = [];
						$scope.artistas.push(angular.copy(artista));
						alert("artista cadastrado com sucesso");
						delete $scope.artista;
				}
			};

			var verificaSeAlbumJaExiste = function(nomeDoAlbum, albuns){
				for (var i = albuns.length - 1; i >= 0; i--) {
					if(albuns[i].nomeDoAlbum == nomeDoAlbum){
						return i;
					}
				}
				return -1; 
			}
			
			var verificaSeArtistaExiste = function(nomeDoArtista){
				for (var i = $scope.artistas.length - 1; i >= 0; i--) {
					if($scope.artistas[i].nome == nomeDoArtista)
						return i;
				}
				return -1;
			}

			var verificaSeMusicaExiste = function(nomeDaMusica, musicas){
				for (var i = musicas.length - 1; i >= 0; i--) {
					if(musicas[i].nomeDaMusica == nomeDaMusica){
						return i;
					}
				}
				return -1;
			}

			$scope.cadastraMusica = function(musica){
				var indiceDoArtista = verificaSeArtistaExiste(musica.artista);
				// artista ja existe
				if(indiceDoArtista != -1){
					var indiceDoAlbum = verificaSeAlbumJaExiste(musica.album, $scope.artistas[indiceDoArtista].albuns);
					//Album já existe
					if(indiceDoAlbum != -1){
						var indiceDaMusica = verificaSeMusicaExiste(musica.nome, $scope.artistas[indiceDoArtista].albuns[indiceDoAlbum].musicas);
						if(indiceDaMusica != -1){
							//musica já existe - mensagem de erro
							$scope.musicaJaExiste = true;
						}else{
							// adciona musica ao album
							$scope.artistas[indiceDoArtista].albuns[indiceDoAlbum].musicas.push({nomeDaMusica: musica.nome, duracao: musica.duracao, anoDeLancamento: musica.lancamento});
							delete $scope.musica;
							alert("musica cadastrada com sucesso");
							$scope.musicaJaExiste = false;
						}
					// nova album precisa ser criado e dps adcionar a musica
					}else{
						$scope.artistas[indiceDoArtista].albuns.push({nomeDoAlbum: musica.album, musicas: [{nomeDaMusica: musica.nome, duracao: musica.duracao, anoDeLancamento: musica.lancamento}]});
						alert("musica cadastrada com sucesso");
						delete $scope.musica;
						$scope.musicaJaExiste = false;
					}
				//artista precisa ser criado e o album e dps adicionar a musica
				}else{
					$scope.artistas.push({nome: musica.artista, nota: "", ultimaMusicaOuvida: "", ehFavorito: false, foto:"http://centralwordpress.com.br/wp-content/uploads/whatsapp-imagens-para-perfil-7.jpg" , albuns: [{nomeDoAlbum: musica.album, musicas: [{nomeDaMusica: musica.nome, duracao: musica.duracao, anoDeLancamento: musica.lancamento}]}]});
					alert("musica cadastrada com sucesso");
					delete $scope.musica;
					$scope.musicaJaExiste = false;
				}
			};

	});
