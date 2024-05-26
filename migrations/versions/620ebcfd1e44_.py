"""empty message

Revision ID: 620ebcfd1e44
Revises: 907f2b2f369d
Create Date: 2024-05-25 17:31:45.432585

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '620ebcfd1e44'
down_revision = '907f2b2f369d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pr_record',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('movement_id', sa.Integer(), nullable=False),
    sa.Column('value', sa.Float(), nullable=True),
    sa.Column('time', sa.Float(), nullable=True),
    sa.Column('kg', sa.Float(), nullable=True),
    sa.Column('lb', sa.Float(), nullable=True),
    sa.Column('unit', sa.String(length=50), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pr_record')
    # ### end Alembic commands ###