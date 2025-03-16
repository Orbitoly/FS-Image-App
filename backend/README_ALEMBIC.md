# Using Alembic for Database Migrations

This project uses Alembic to manage database migrations. Alembic is a database migration tool for SQLAlchemy that allows you to track and apply changes to your database schema over time.

## How It Works

- Alembic tracks database schema changes in migration scripts located in `alembic/versions/`.
- Each migration script has an upgrade and downgrade function to apply or revert changes.
- Migrations are applied automatically when the backend container starts.

## Initial Setup

The initial database schema and seed data are defined in two migration scripts:

1. `001_initial_schema.py` - Creates the tables and indexes
2. `002_seed_data.py` - Seeds the database with initial image data

## Creating New Migrations

When you need to make changes to the database schema, follow these steps:

1. Make changes to the SQLAlchemy models in `app/db/models.py`
2. Run the helper script to generate a new migration:
   ```
   ./create_migration.sh "description_of_changes"
   ```
3. Review the generated migration file in `alembic/versions/`
4. Restart the backend container to apply the migration:
   ```
   docker-compose restart backend
   ```

## Manual Migration Commands

If you need to run migrations manually, you can use the following commands:

```bash
# Apply all pending migrations
alembic upgrade head

# Revert the last migration
alembic downgrade -1

# Generate a new migration
alembic revision --autogenerate -m "description_of_changes"

# Get current migration status
alembic current
```

## Benefits Over Raw SQL

- **Version Control**: All database changes are tracked and can be rolled back if needed
- **Consistency**: Database schema is always in sync with your SQLAlchemy models
- **Automation**: Migrations are applied automatically when the container starts
- **Safety**: Migrations are applied in a transaction, so they either succeed completely or fail completely

## Troubleshooting

If you encounter issues with migrations:

1. Check the logs for error messages:
   ```
   docker-compose logs backend
   ```
2. Verify that your SQLAlchemy models match the database schema
3. If needed, you can manually fix the database schema and then mark the migration as applied:
   ```
   alembic stamp head
   ```
