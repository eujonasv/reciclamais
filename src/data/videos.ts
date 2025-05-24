
export interface VideoData {
  titulo: string;
  descricao: string;
  youtubeId: string;
}

export const videos: VideoData[] = [
  {
    titulo: "Como montar uma composteira caseira",
    descricao: "Aprenda passo a passo como montar sua própria composteira em casa usando materiais simples e acessíveis.",
    youtubeId: "LkF5d_X47lg"
  },
  {
    titulo: "Reciclagem criativa: transformando garrafas em objetos úteis",
    descricao: "Ideias criativas para transformar garrafas PET e de vidro em objetos decorativos e úteis para o seu dia a dia.",
    youtubeId: "XhzFkBGAZ_o"
  },
  {
    titulo: "Os benefícios ambientais da coleta seletiva",
    descricao: "Especialistas explicam como a coleta seletiva ajuda a reduzir o impacto ambiental e economizar recursos naturais.",
    youtubeId: "GK-0Ix7D1jM"
  },
  {
    titulo: "Documentário: A jornada do lixo",
    descricao: "Acompanhe o percurso dos resíduos desde o descarte até o destino final, entendendo os desafios da gestão de resíduos.",
    youtubeId: "4FVRAxlBnQ8"
  }
];

// Para adicionar novos vídeos, simplesmente adicione um novo objeto ao array acima
// Exemplo:
// {
//   titulo: "Novo título do vídeo",
//   descricao: "Descrição do novo vídeo",
//   youtubeId: "ID_DO_YOUTUBE_AQUI"
// }
