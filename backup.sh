#!/bin/bash
# Script de backup do banco de dados

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="db/backups"

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Backup do arquivo SQLite
cp db/db.sqlite $BACKUP_DIR/db_backup_$TIMESTAMP.sqlite

# Backup em SQL
sqlite3 db/db.sqlite ".dump" > $BACKUP_DIR/backup_$TIMESTAMP.sql

echo "✅ Backup criado:"
echo "📁 $BACKUP_DIR/db_backup_$TIMESTAMP.sqlite"
echo "📄 $BACKUP_DIR/backup_$TIMESTAMP.sql"

# Manter apenas os 5 backups mais recentes
cd $BACKUP_DIR
ls -t db_backup_*.sqlite | tail -n +6 | xargs rm -f 2>/dev/null
ls -t backup_*.sql | tail -n +6 | xargs rm -f 2>/dev/null

echo "🧹 Backups antigos removidos (mantendo apenas os 5 mais recentes)"
