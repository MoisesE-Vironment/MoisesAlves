# Configuração do formulário

O formulário da landing page já envia um `POST` JSON para `VITE_RESEND_FORM_ENDPOINT`. Essa variável deve apontar para um endpoint seguro que recebe os campos `name`, `email`, `company` e `message`, monta o e-mail e chama o Resend no servidor.

A chave `RESEND_API_KEY` deve existir somente no servidor. Não é seguro colocá-la no frontend ou em qualquer variável com prefixo `VITE_`, pois esse conteúdo é exposto ao navegador.

O assunto enviado pelo frontend segue o padrão `Novo contato para palestra — [nome]`. O fluxo visual já trata os estados de envio, sucesso, erro e ausência de configuração. Quando o endpoint ainda não estiver configurado, a página informa a pendência sem simular o envio.

## Alternativas de ativação

| Abordagem | Tradeoffs | Custo | Complexidade |
| --- | --- | --- | --- |
| Endpoint seguro existente com Resend | Mantém a configuração atual e protege a chave; exige apenas apontar `VITE_RESEND_FORM_ENDPOINT` | Depende do endpoint/Resend | Baixa |
| Criar uma rota de servidor para o projeto | Centraliza o envio no projeto e facilita validação e logs; exige habilitar backend e segredo | Depende do plano/infraestrutura | Média |

A implementação atual escolhe a primeira alternativa para manter esta landing page frontend-only e evitar que uma credencial de envio seja exposta no navegador.
