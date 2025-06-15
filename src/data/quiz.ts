
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
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
    explanation: "A gordura e os restos de comida no papelão contaminam as fibras de celulose, inviabilizando a reciclagem. O ideal é descartar a parte suja no lixo orgânico."
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
    explanation: "Pilhas e baterias são lixo eletrônico e contêm metais pesados. Elas devem ser descartadas em pontos de coleta específicos para não contaminar o solo e a água."
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
    explanation: "A cor verde é o padrão para a coleta de vidro. As cores para os outros materiais principais são: Azul (Papel), Vermelho (Plástico) e Amarelo (Metal)."
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
    explanation: "Tecnicamente, o isopor (poliestireno expandido) é um tipo de plástico e é reciclável. No entanto, por ser muito leve e volumoso, seu transporte e reciclagem são caros, e poucas cooperativas realizam o processo."
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
    explanation: "Restos de produtos de origem animal, como carnes, laticínios e gorduras, não devem ir na composteira, pois podem atrair pragas e gerar mau cheiro. Os outros itens são ótimos para a compostagem."
  }
];
