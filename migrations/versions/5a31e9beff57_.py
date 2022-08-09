"""empty message

Revision ID: 5a31e9beff57
Revises: bae0223ac63f
Create Date: 2022-08-09 02:13:21.562651

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5a31e9beff57'
down_revision = 'bae0223ac63f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('usuario', sa.Column('administrador', sa.Boolean(), server_default='false', nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('usuario', 'administrador')
    # ### end Alembic commands ###
