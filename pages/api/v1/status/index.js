import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const versaoBanco = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");
  const nomeBanco = process.env.POSTGRES_DB;
  const conexoesAtivas = await database.query({
    text: "SELECT COUNT(*)::int AS count FROM pg_stat_activity WHERE datname = $1",
    values: [nomeBanco],
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versaoBanco.rows[0].server_version,
        max_connections: +maxConnections.rows[0].max_connections,
        active_connections: conexoesAtivas.rows[0].count,
      },
    },
  });
}

export default status;
