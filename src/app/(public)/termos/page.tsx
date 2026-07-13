import { LegalPageLayout } from "@/components/LegalPageLayout";
import Footer from "@/components/Footer";

export default function TermosPage() {
  return (
    <>
      <LegalPageLayout title="Termos de Uso" lastUpdated="13 de Julho de 2026">
        <p>
          Bem-vindo(a) à BlueFoot. Os presentes Termos de Uso regem a utilização da nossa
          plataforma de compra e venda de contas de eFootball. Ao acessar ou utilizar nosso site, você concorda
          em vincular-se a estes termos em sua totalidade. Recomendamos a leitura atenta antes de realizar
          qualquer transação.
        </p>

        <h2>1. Papel da Plataforma</h2>
        <p>
          A BlueFoot atua estritamente como um <strong>marketplace intermediador</strong> e vitrine virtual 
          para a facilitação de transações de contas relacionadas ao jogo eFootball. Não possuímos nenhum 
          vínculo oficial, afiliação, endosso ou parceria com a Konami Digital Entertainment ou empresas 
          associadas. Nosso serviço limita-se a conectar compradores e vendedores, garantindo a segurança e o 
          repasse das contas listadas.
        </p>

        <h2>2. Aceitação dos Termos</h2>
        <p>
          A utilização da plataforma, seja para navegação, compra ou venda, implica na aceitação automática,
          plena e sem reservas de todos os itens destes Termos de Uso. Caso não concorde com alguma regra 
          estipulada, solicitamos que não utilize os serviços oferecidos.
        </p>

        <h2>3. Processo de Compra e Pagamento</h2>
        <p>
          O processo de compra ocorre de forma transparente e assistida:
        </p>
        <ul>
          <li>O pagamento é realizado utilizando meios seguros intermediados pela plataforma ou canais oficiais de atendimento (WhatsApp).</li>
          <li>Após a confirmação do pagamento, a equipe técnica da BlueFoot conduzirá a transferência das credenciais (Konami ID) para o e-mail fornecido pelo comprador.</li>
          <li>A conta só é entregue mediante confirmação irrefutável do recebimento dos fundos. Tentar burlar ou fraudar comprovantes resultará em banimento imediato e ações legais cabíveis.</li>
        </ul>

        <h2>4. Responsabilidades do Comprador</h2>
        <p>
          Ao adquirir uma conta, o comprador declara ciência e compromete-se a:
        </p>
        <ul>
          <li><strong>Alterar imediatamente a senha</strong> e os dados de recuperação vinculados ao Konami ID assim que receber a posse da conta.</li>
          <li>Utilizar a conta de acordo com as diretrizes do jogo. Qualquer punição recebida após a entrega por mau uso, uso de softwares não autorizados ou infrações é de inteira responsabilidade do comprador.</li>
          <li>Fornecer um endereço de e-mail limpo e nunca antes vinculado a contas da Konami para possibilitar a transferência com segurança.</li>
        </ul>

        <h2>5. Política de Reembolso e Devoluções</h2>
        <p>
          Devido à natureza estrita de <strong>bens digitais e dados de acesso intransferíveis</strong>:
        </p>
        <ul>
          <li>Não há possibilidade de reembolso, troca ou desistência após a transferência definitiva das credenciais.</li>
          <li>Toda venda é considerada final. A conferência do elenco, itens e moedas deve ser feita através das mídias disponibilizadas antes da efetivação do pagamento.</li>
        </ul>

        <h2>6. Responsabilidades do Vendedor</h2>
        <p>
          Usuários que desejam vender suas contas através do nosso catálogo assumem o compromisso de:
        </p>
        <ul>
          <li>Provar a procedência lícita da conta e fornecer todos os acessos originais.</li>
          <li>Manter exclusividade de venda conosco, não negociando a mesma conta paralelamente em outros canais para evitar duplicidade ou conflitos.</li>
          <li>Garantir que a conta não possui restrições severas, shadowbans ou advertências emitidas pela desenvolvedora do jogo.</li>
        </ul>

        <h2>7. Limitação de Responsabilidade</h2>
        <p>
          A BlueFoot trabalha arduamente para manter o mais alto nível de segurança, mas <strong>não se responsabiliza</strong> por:
        </p>
        <ul>
          <li>Ações tomadas pela desenvolvedora do jogo (Konami), incluindo banimentos em massa, alterações em mecânicas, perdas de valor do elenco ou mudanças em Políticas de Serviço independentes.</li>
          <li>Perda de acesso decorrente de falha do comprador em proteger suas próprias senhas após a entrega.</li>
          <li>Interrupções técnicas temporárias de nosso próprio sistema ou indisponibilidades de servidores do eFootball.</li>
        </ul>

        <h2>8. Uso Indevido da Plataforma</h2>
        <p>
          É terminantemente proibido utilizar o site para fins fraudulentos, praticar engenharia reversa, copiar o catálogo, enviar conteúdo malicioso ou tentar aplicar golpes contra vendedores ou compradores. O desrespeito a essas regras permite à BlueFoot suspender o acesso do usuário de forma imediata e definitiva.
        </p>

        <h2>9. Propriedade Intelectual</h2>
        <p>
          Todos os textos, logotipos, marcas e elementos gráficos do site pertencem à BlueFoot. Nomes de jogos, imagens de personagens e logomarcas de terceiros (como eFootball e Konami) pertencem aos seus respectivos criadores e são usados na plataforma estritamente em caráter descritivo.
        </p>

        <h2>10. Modificações nestes Termos</h2>
        <p>
          Estes Termos de Uso poderão ser revisados e atualizados periodicamente para refletir novas práticas comerciais ou exigências legais. O uso continuado da plataforma após as alterações constitui concordância com a nova versão.
        </p>

        <h2>11. Contato</h2>
        <p>
          Para relatar problemas, dúvidas legais ou buscar resoluções de disputas, entre em contato através dos nossos canais oficiais de atendimento no WhatsApp ou pelo rodapé do site. 
        </p>
        <p>
          <em>Atenção: Embora estes Termos sejam criados visando total lisura e segurança para todas as partes envolvidas, recomendamos em caso de dúvidas legais complexas a consulta a profissionais de direito capacitados.</em>
        </p>
      </LegalPageLayout>

      <Footer />
    </>
  );
}
