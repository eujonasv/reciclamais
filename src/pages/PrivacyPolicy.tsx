
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const PrivacyPolicyPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <article className="prose dark:prose-invert max-w-4xl mx-auto">
          <h1>Política de Privacidade</h1>
          <p className="text-gray-500 dark:text-gray-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <h2>1. Introdução</h2>
          <p>
            A sua privacidade é importante para nós. É política do RECICLA+ respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site RECICLA+, e outros sites que possuímos e operamos.
          </p>

          <h2>2. Informações que Coletamos</h2>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
          </p>

          <h2>3. Como Usamos Suas Informações</h2>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>

          <h2>4. Cookies</h2>
          <p>
            O nosso site pode usar "cookies" para melhorar a experiência do usuário. O seu navegador da web coloca cookies no seu disco rígido para fins de manutenção de registros e, às vezes, para rastrear informações sobre eles. Você pode optar por configurar seu navegador para recusar cookies ou para alertá-lo quando os cookies estiverem sendo enviados.
          </p>

          <h2>5. Links para Sites de Terceiros</h2>
          <p>
            O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
          </p>

          <h2>6. Alterações a Esta Política de Privacidade</h2>
          <p>
            Podemos atualizar nossa Política de Privacidade de tempos em tempos. Aconselhamos que você revise esta página periodicamente para quaisquer alterações. Iremos notificá-lo sobre quaisquer alterações, publicando a nova Política de Privacidade nesta página.
          </p>
          
          <h2>7. Contato</h2>
          <p>
            Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
          </p>
        </article>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicyPage;
