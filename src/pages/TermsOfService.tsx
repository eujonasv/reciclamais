
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const TermsOfServicePage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <article className="prose dark:prose-invert max-w-4xl mx-auto">
          <h1>Termos de Serviço</h1>
          <p className="text-gray-500 dark:text-gray-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <h2>1. Termos</h2>
          <p>
            Ao acessar ao site RECICLA+, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </p>

          <h2>2. Uso de Licença</h2>
          <p>
            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site RECICLA+, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
          </p>
          <ul>
            <li>modificar ou copiar os materiais;</li>
            <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
            <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site RECICLA+;</li>
            <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
            <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
          </ul>

          <h2>3. Isenção de Responsabilidade</h2>
          <p>
            Os materiais no site da RECICLA+ são fornecidos 'como estão'. RECICLA+ não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
          </p>
          
          <h2>4. Limitações</h2>
          <p>
            Em nenhum caso o RECICLA+ ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em RECICLA+, mesmo que RECICLA+ ou um representante autorizado da RECICLA+ tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
          </p>
          
          <h2>5. Modificações</h2>
          <p>
            O RECICLA+ pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
          </p>
        </article>
      </div>
    </MainLayout>
  );
};

export default TermsOfServicePage;
