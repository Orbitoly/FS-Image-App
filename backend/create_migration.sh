#!/bin/bash

# Check if a migration name was provided
if [ -z "$1" ]; then
    echo "Usage: $0 <migration_name>"
    exit 1
fi

# Generate a new migration
alembic revision --autogenerate -m "$1"

echo "Migration created successfully!"
echo "Review the generated migration file in alembic/versions/ before applying it." 