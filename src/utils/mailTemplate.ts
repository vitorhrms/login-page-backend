export const htmlFormatter = (code: number) => {
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Código de verificação</title>
    </head>

    <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
        <tr>
          <td align="center">
            
            <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
              
              <tr>
                <td>
                  <h1 style="margin:0;color:#333;font-size:24px;">
                    Verificação de segurança
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding-top:20px;color:#555;font-size:16px;">
                  Use o código abaixo para concluir seu login.
                </td>
              </tr>

              <tr>
                <td style="padding:30px 0;">
                  <div style="
                    display:inline-block;
                    padding:15px 30px;
                    font-size:28px;
                    letter-spacing:6px;
                    font-weight:bold;
                    color:#ffffff;
                    background:#4f46e5;
                    border-radius:6px;
                  ">
                    ${code}
                  </div>
                </td>
              </tr>

              <tr>
                <td style="color:#666;font-size:14px;">
                  Este código expira em 10 minutos.
                </td>
              </tr>

              <tr>
                <td style="padding-top:30px;font-size:12px;color:#999;">
                  Se você não solicitou este código, pode ignorar este email.
                </td>
              </tr>

            </table>

            <table width="500" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding-top:20px;font-size:12px;color:#aaa;">
                  © ${new Date().getFullYear()} App Teste
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return html;
};
