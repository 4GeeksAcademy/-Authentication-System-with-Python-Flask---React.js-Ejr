"""empty message

Revision ID: 4b88966fcba9
Revises: 25ebcf64573f
Create Date: 2024-08-30 19:19:35.306765

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4b88966fcba9'
down_revision = '25ebcf64573f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=300), nullable=False),
    sa.Column('last_name', sa.String(length=300), nullable=False),
    sa.Column('document_type', sa.String(length=200), nullable=False),
    sa.Column('document_number', sa.String(length=200), nullable=False),
    sa.Column('address', sa.String(length=200), nullable=False),
    sa.Column('role', sa.String(length=200), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('dates',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('speciality', sa.String(length=50), nullable=False),
    sa.Column('doctor', sa.String(length=100), nullable=False),
    sa.Column('datetime', sa.DateTime(), nullable=False),
    sa.Column('reason_for_appointment', sa.String(length=300), nullable=False),
    sa.Column('date_type', sa.String(length=100), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('email', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('password', sa.VARCHAR(length=80), autoincrement=False, nullable=False),
    sa.Column('name', sa.VARCHAR(length=300), autoincrement=False, nullable=False),
    sa.Column('last_name', sa.VARCHAR(length=300), autoincrement=False, nullable=False),
    sa.Column('document_type', sa.VARCHAR(length=200), autoincrement=False, nullable=False),
    sa.Column('document_number', sa.VARCHAR(length=200), autoincrement=False, nullable=False),
    sa.Column('address', sa.VARCHAR(length=200), autoincrement=False, nullable=False),
    sa.Column('role', sa.VARCHAR(length=200), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='user_pkey'),
    sa.UniqueConstraint('email', name='user_email_key')
    )
    op.drop_table('dates')
    op.drop_table('users')
    # ### end Alembic commands ###
