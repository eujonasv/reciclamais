
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Papel engordurado, como de caixas de pizza, pode ser reciclado com os papéis limpos?",
    options: [
      "Sim, sem problemas.",
      "Não, a gordura contamina o processo de reciclagem do papel.",
      "Apenas se lavar com sabão.",
      "Depende do tipo de papel."
    ],
    correctAnswerIndex: 1,
    explanation: "A gordura e os restos de comida no papelão contaminam as fibras de celulose, inviabilizando a reciclagem. O ideal é descartar a parte suja no lixo orgânico.",
    difficulty: 'medium',
    category: 'Papel'
  },
  {
    question: "Qual destes materiais NÃO é considerado reciclável pela coleta seletiva comum?",
    options: [
      "Garrafa PET",
      "Pilhas e baterias",
      "Lata de alumínio",
      "Jornal"
    ],
    correctAnswerIndex: 1,
    explanation: "Pilhas e baterias são lixo eletrônico e contêm metais pesados. Elas devem ser descartadas em pontos de coleta específicos para não contaminar o solo e a água.",
    difficulty: 'easy',
    category: 'Eletrônicos'
  },
  {
    question: "Na coleta seletiva, qual é a cor correspondente ao descarte de vidro?",
    options: [
      "Azul",
      "Vermelho",
      "Verde",
      "Amarelo"
    ],
    correctAnswerIndex: 2,
    explanation: "A cor verde é o padrão para a coleta de vidro. As cores para os outros materiais principais são: Azul (Papel), Vermelho (Plástico) e Amarelo (Metal).",
    difficulty: 'easy',
    category: 'Coleta Seletiva'
  },
  {
    question: "Isopor é reciclável?",
    options: [
      "Não, nunca.",
      "Sim, mas é um processo complexo e poucos lugares o fazem.",
      "Sim, pode ser descartado junto com os plásticos.",
      "Apenas o isopor de embalagens de alimentos."
    ],
    correctAnswerIndex: 1,
    explanation: "Tecnicamente, o isopor (poliestireno expandido) é um tipo de plástico e é reciclável. No entanto, por ser muito leve e volumoso, seu transporte e reciclagem são caros, e poucas cooperativas realizam o processo.",
    difficulty: 'hard',
    category: 'Plástico'
  },
  {
    question: "O que NÃO deve ser colocado em uma composteira doméstica?",
    options: [
      "Cascas de frutas e vegetais",
      "Restos de carne e laticínios",
      "Borra de café e sachês de chá",
      "Folhas secas e serragem"
    ],
    correctAnswerIndex: 1,
    explanation: "Restos de produtos de origem animal, como carnes, laticínios e gorduras, não devem ir na composteira, pois podem atrair pragas e gerar mau cheiro. Os outros itens são ótimos para a compostagem.",
    difficulty: 'medium',
    category: 'Compostagem'
  },
  {
    question: "Quanto tempo leva para uma garrafa de vidro se degradar na natureza?",
    options: [
      "50 anos",
      "200 anos",
      "500 anos",
      "Mais de 1000 anos"
    ],
    correctAnswerIndex: 3,
    explanation: "O vidro pode levar mais de 1000 anos para se degradar completamente. Por isso é tão importante reciclá-lo, já que pode ser reciclado infinitas vezes sem perder qualidade.",
    difficulty: 'medium',
    category: 'Impacto Ambiental'
  },
  {
    question: "Qual é o símbolo de reciclagem do PET (usado em garrafas de refrigerante)?",
    options: [
      "Número 1 dentro do triângulo",
      "Número 3 dentro do triângulo",
      "Número 5 dentro do triângulo",
      "Número 7 dentro do triângulo"
    ],
    correctAnswerIndex: 0,
    explanation: "O PET (Politereftalato de Etileno) é identificado pelo número 1 dentro do símbolo de reciclagem. É um dos plásticos mais recicláveis e amplamente coletados.",
    difficulty: 'hard',
    category: 'Plástico'
  },
  {
    question: "Embalagens longa vida (Tetra Pak) são recicláveis?",
    options: [
      "Não, por serem multicamadas",
      "Sim, através de processo específico que separa os materiais",
      "Apenas a parte de papel",
      "Somente se forem lavadas"
    ],
    correctAnswerIndex: 1,
    explanation: "Embalagens longa vida são recicláveis através de um processo hidrapulper que separa as fibras de papel do plástico e alumínio. Cada material segue para sua reciclagem específica.",
    difficulty: 'hard',
    category: 'Embalagens'
  },
  {
    question: "Qual a regra dos 3 Rs da sustentabilidade, em ordem de prioridade?",
    options: [
      "Reciclar, Reutilizar, Reduzir",
      "Reduzir, Reutilizar, Reciclar",
      "Reutilizar, Reduzir, Reciclar",
      "Reduzir, Reciclar, Reutilizar"
    ],
    correctAnswerIndex: 1,
    explanation: "A ordem correta é Reduzir, Reutilizar e Reciclar. Primeiro devemos reduzir o consumo, depois reutilizar o que já temos, e por último reciclar o que não pode mais ser usado.",
    difficulty: 'medium',
    category: 'Sustentabilidade'
  },
  {
    question: "Lâmpadas fluorescentes devem ser descartadas:",
    options: [
      "No lixo comum",
      "Junto com o vidro",
      "Em pontos de coleta específicos",
      "Quebradas no lixo reciclável"
    ],
    correctAnswerIndex: 2,
    explanation: "Lâmpadas fluorescentes contêm mercúrio e outros materiais tóxicos. Devem ser levadas a pontos de coleta específicos como lojas de materiais elétricos ou campanhas municipais.",
    difficulty: 'easy',
    category: 'Lâmpadas'
  }
];
