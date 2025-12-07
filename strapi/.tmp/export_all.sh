#!/bin/bash

# Path to your Strapi SQLite DB
DB_PATH="./data.db"

# Create output folder
mkdir -p sqlite_exports

# Get all user tables (excluding sqlite system tables)
TABLES=$(sqlite3 "$DB_PATH" ".tables" | tr ' ' '\n' | grep -v '^sqlite_')

# Export each table to its own JSON file
for TABLE in $TABLES; do
  echo "Exporting $TABLE..."
  sqlite3 "$DB_PATH" <<EOF
.mode json
.output sqlite_exports/${TABLE}.json
SELECT * FROM $TABLE;
EOF
done

echo "✅ All tables exported to ./sqlite_exports/"