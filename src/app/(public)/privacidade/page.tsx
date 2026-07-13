import { LegalPageLayout } from "@/components/LegalPageLayout";
import Footer from "@/components/Footer";

export default function PrivacidadePage() {
  return (
    <>
      <LegalPageLayout title="Política de Privacidade" lastUpdated="13 de Julho de 2026">
        <p>
          A BlueFoot está profundamente comprometida com a proteção e a privacidade dos dados de 
          nossos usuários. Esta Política de Privacidade descreve de forma clara como tratamos, 
          coletamos, armazenamos e compartilhamos as informações pessoais necessárias para operar
          nosso marketplace de contas de eFootball, em total conformidade com a 
          Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
        </p>

        <h2>1. Quais Dados Coletamos</h2>
        <p>
          Para o funcionamento da nossa plataforma e a garantia de segurança nas transações, coletamos
          estritamente os dados necessários:
        </p>
        <ul>
          <li><strong>Dados de Contato:</strong> Nome, endereço de e-mail e número de telefone (como WhatsApp), essenciais para o acompanhamento e suporte das negociações.</li>
          <li><strong>Dados de Autenticação:</strong> Informações técnicas geradas durante o seu login (como tokens de acesso), a fim de manter sua conta segura em nossa plataforma.</li>
          <li><strong>Dados Relacionados a Transações:</strong> Histórico de conversas via suporte, informações sobre contas anunciadas (prints, IDs, e-mails vinculados de repasse) e eventuais identificadores de recebimento de pagamentos estritamente necessários para aprovar transações.</li>
        </ul>

        <h2>2. Finalidade da Coleta de Dados</h2>
        <p>
          Suas informações são utilizadas única e exclusivamente com os seguintes propósitos:
        </p>
        <ul>
          <li><strong>Viabilizar a Prestação de Serviço:</strong> Permitir que compradores e vendedores se conectem com segurança e que a transferência da conta do jogo (Konami ID) ocorra sem intercorrências.</li>
          <li><strong>Segurança Antifraude:</strong> Autenticar usuários para prevenir golpes e garantir a legitimidade da procedência das contas negociadas.</li>
          <li><strong>Atendimento ao Cliente:</strong> Manter comunicação contínua durante e após as vendas, fornecendo suporte adequado pelos canais oficiais (como o WhatsApp).</li>
        </ul>

        <h2>3. Compartilhamento de Informações</h2>
        <p>
          A BlueFoot valoriza seu sigilo e <strong>não vende nem aluga</strong> seus dados pessoais para terceiros. 
          O compartilhamento ocorre apenas quando estritamente necessário para:
        </p>
        <ul>
          <li><strong>Processadores de Pagamento:</strong> Plataformas externas certificadas para aprovação de Pix ou cartões, visando processar a transação financeira de forma criptografada.</li>
          <li><strong>Obrigação Legal:</strong> Em cumprimento a eventuais ordens judiciais ou regulatórias emitidas por autoridades competentes.</li>
        </ul>

        <h2>4. Armazenamento e Segurança da Informação</h2>
        <p>
          Empregamos tecnologias robustas de segurança para proteger seus dados, tais como criptografia em trânsito (HTTPS), 
          hashing de autenticação de tokens e controles rígidos de acesso às nossas bases de dados. As informações são 
          armazenadas em servidores de alta disponibilidade e restritas apenas à equipe técnica necessária.
        </p>

        <h2>5. Tempo de Retenção</h2>
        <p>
          Reteremos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política 
          ou para cumprimento de obrigações fiscais e legais, após o qual serão anonimizados ou excluídos definitivamente.
        </p>

        <h2>6. Seus Direitos (LGPD)</h2>
        <p>
          De acordo com a Lei Geral de Proteção de Dados, você possui total controle sobre as suas informações. A qualquer momento, você pode nos solicitar:
        </p>
        <ul>
          <li>A confirmação de existência e o acesso aos dados que possuímos sobre você.</li>
          <li>A correção de dados desatualizados, incompletos ou incorretos.</li>
          <li>A portabilidade e a exclusão definitiva dos seus dados de nosso banco de dados, exceto nas condições onde a retenção seja obrigatória por lei.</li>
        </ul>

        <h2>7. Uso de Cookies</h2>
        <p>
          Utilizamos pequenos arquivos de texto, chamados cookies, apenas para funções técnicas de performance e manutenção de sessões ativas 
          em navegadores. Não empregamos cookies para rastreamento publicitário invasivo externo à plataforma. Ao utilizar o site, você consente 
          com o uso de cookies estritamente necessários.
        </p>

        <h2>8. Alterações nesta Política</h2>
        <p>
          Sempre que implementarmos novas funcionalidades ou quando a legislação assim exigir, esta Política poderá ser atualizada. 
          Notificaremos os usuários sobre mudanças substanciais de forma destacada em nosso site.
        </p>

        <h2>9. Canal de Contato (DPO)</h2>
        <p>
          Caso queira exercer qualquer um dos seus direitos, tirar dúvidas ou expressar preocupações sobre sua privacidade, 
          entre em contato diretamente através do nosso Suporte Oficial pelo WhatsApp.
        </p>
      </LegalPageLayout>

      <Footer />
    </>
  );
}
