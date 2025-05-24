
export interface VideoData {
  titulo: string;
  descricao: string;
  youtubeId: string;
}

export const videos: VideoData[] = [
  {
    titulo: "O que é Educação Ambiental?",
    descricao: "Um vídeo introdutório que explica de forma clara o conceito de educação ambiental, com exemplos práticos e acessíveis.",
    youtubeId: "oV3pK3SOjxo"
  },
  {
    titulo: "Eficiência Energética com Energia Solar",
    descricao: "Este vídeo apresenta dicas sobre como aproveitar a energia solar para economizar energia elétrica, promovendo a eficiência energética.",
    youtubeId: "cy4Bds51Cs8"
  },
  {
    titulo: "Como Reduzir o Desperdício de Alimentos",
    descricao: "Aprenda como reduzir o desperdício de alimentos com práticas simples e eficazes, contribuindo para a sustentabilidade.",
    youtubeId: "7GQBzPV-kJo"
  },
  {
    titulo: "Compostagem: Como Funciona e Por que Fazer",
    descricao: "Descubra as vantagens da compostagem e como essa prática pode beneficiar o meio ambiente e a gestão de resíduos.",
    youtubeId: "h4gXUvyCZYA"
  }
];

// Para adicionar novos vídeos, simplesmente adicione um novo objeto ao array acima
// Exemplo:
// {
//   titulo: "Novo título do vídeo",
//   descricao: "Descrição do novo vídeo",
//   youtubeId: "ID_DO_YOUTUBE_AQUI"
// }
