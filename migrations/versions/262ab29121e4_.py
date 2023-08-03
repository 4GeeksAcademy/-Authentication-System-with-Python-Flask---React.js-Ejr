"""empty message

Revision ID: 262ab29121e4
Revises: db78379b56fe
Create Date: 2023-08-02 20:42:49.916775

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '262ab29121e4'
down_revision = 'db78379b56fe'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('product_sizes_quantity')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('product_sizes_quantity',
    sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('size_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('quantity', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name='product_sizes_quantity_product_id_fkey'),
    sa.ForeignKeyConstraint(['size_id'], ['sizes.id'], name='product_sizes_quantity_size_id_fkey'),
    sa.PrimaryKeyConstraint('product_id', 'size_id', name='product_sizes_quantity_pkey')
    )
    # ### end Alembic commands ###
