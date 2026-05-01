import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "4000"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true },
      waitForConnections: true,
      connectionLimit: 5,
      timezone: "+00:00",
    });
  }
  return pool;
}

export async function query<T = unknown>(
  sql: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[]
): Promise<T> {
  const p = getPool();
  const [rows] = await p.execute(sql, params);
  return rows as T;
}

export async function initDB(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS diagnosticos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nomeArquivo VARCHAR(512) NOT NULL,
      urlArquivo TEXT,
      empreendimento VARCHAR(256),
      complexidade ENUM('Baixa', 'Média', 'Alta'),
      complexidadeJustificativa TEXT,
      risco ENUM('Baixo', 'Médio', 'Alto'),
      riscoMotivo LONGTEXT,
      tesesnaoExploradas LONGTEXT,
      oportunidades LONGTEXT,
      status ENUM('processando', 'concluido', 'erro') DEFAULT 'processando',
      erroMensagem TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
