"""empty message

Revision ID: 1fdfc9d669e2
Revises: aef4350bda43
Create Date: 2024-05-08 11:07:45.076203

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1fdfc9d669e2'
down_revision = 'aef4350bda43'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=250),
               existing_nullable=False)
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=50),
               existing_nullable=False)
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.alter_column('password',
               existing_type=sa.String(length=50),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.String(length=250),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)

    # ### end Alembic commands ###