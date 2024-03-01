"""empty message

Revision ID: 2d04588596b1
Revises: 
Create Date: 2024-02-29 16:47:15.834702

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d04588596b1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('instructor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=False),
    sa.Column('biografy', sa.String(length=300), nullable=False),
    sa.Column('residence', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=350), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('subscription',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('plan', sa.String(length=120), nullable=False),
    sa.Column('price', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('plan')
    )
    op.create_table('types_of_session',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('type')
    )
    op.create_table('ashtanga_yoga',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('subtitle', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('link', sa.String(length=120), nullable=False),
    sa.Column('asana_focus', sa.String(length=120), nullable=False),
    sa.Column('level', sa.String(length=120), nullable=False),
    sa.Column('duration', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=350), nullable=False),
    sa.Column('id_type_of_session', sa.Integer(), nullable=True),
    sa.Column('id_instructor', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_instructor'], ['instructor.id'], ),
    sa.ForeignKeyConstraint(['id_type_of_session'], ['types_of_session.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('link')
    )
    op.create_table('harmonium',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('subtitle', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('link', sa.String(length=120), nullable=False),
    sa.Column('asana_focus', sa.String(length=120), nullable=False),
    sa.Column('level', sa.String(length=120), nullable=False),
    sa.Column('duration', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=350), nullable=False),
    sa.Column('id_type_of_session', sa.Integer(), nullable=True),
    sa.Column('id_instructor', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_instructor'], ['instructor.id'], ),
    sa.ForeignKeyConstraint(['id_type_of_session'], ['types_of_session.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('link')
    )
    op.create_table('hatha_yoga',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('subtitle', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('link', sa.String(length=120), nullable=False),
    sa.Column('asana_focus', sa.String(length=120), nullable=False),
    sa.Column('level', sa.String(length=120), nullable=False),
    sa.Column('duration', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=350), nullable=False),
    sa.Column('id_type_of_session', sa.Integer(), nullable=True),
    sa.Column('id_instructor', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_instructor'], ['instructor.id'], ),
    sa.ForeignKeyConstraint(['id_type_of_session'], ['types_of_session.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('link')
    )
    op.create_table('jivamukti_yoga',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('subtitle', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('link', sa.String(length=120), nullable=False),
    sa.Column('asana_focus', sa.String(length=120), nullable=False),
    sa.Column('level', sa.String(length=120), nullable=False),
    sa.Column('duration', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=350), nullable=False),
    sa.Column('id_type_of_session', sa.Integer(), nullable=True),
    sa.Column('id_instructor', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_instructor'], ['instructor.id'], ),
    sa.ForeignKeyConstraint(['id_type_of_session'], ['types_of_session.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('link')
    )
    op.create_table('meditation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('subtitle', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('link', sa.String(length=120), nullable=False),
    sa.Column('asana_focus', sa.String(length=120), nullable=False),
    sa.Column('level', sa.String(length=120), nullable=False),
    sa.Column('duration', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=350), nullable=False),
    sa.Column('id_type_of_session', sa.Integer(), nullable=True),
    sa.Column('id_instructor', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_instructor'], ['instructor.id'], ),
    sa.ForeignKeyConstraint(['id_type_of_session'], ['types_of_session.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('link')
    )
    op.create_table('rocket_yoga',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('subtitle', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('link', sa.String(length=120), nullable=False),
    sa.Column('asana_focus', sa.String(length=120), nullable=False),
    sa.Column('level', sa.String(length=120), nullable=False),
    sa.Column('duration', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=350), nullable=False),
    sa.Column('id_type_of_session', sa.Integer(), nullable=True),
    sa.Column('id_instructor', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_instructor'], ['instructor.id'], ),
    sa.ForeignKeyConstraint(['id_type_of_session'], ['types_of_session.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('link')
    )
    op.create_table('session',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('subtitle', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('link', sa.String(length=120), nullable=False),
    sa.Column('asana_focus', sa.String(length=120), nullable=False),
    sa.Column('level', sa.String(length=120), nullable=False),
    sa.Column('duration', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=350), nullable=False),
    sa.Column('id_type_of_session', sa.Integer(), nullable=True),
    sa.Column('id_instructor', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_instructor'], ['instructor.id'], ),
    sa.ForeignKeyConstraint(['id_type_of_session'], ['types_of_session.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('link')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=False),
    sa.Column('date_of_birth', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('role', sa.Enum('Student', 'Instructor', name='role'), nullable=True),
    sa.Column('id_subscription', sa.Integer(), nullable=True),
    sa.Column('subscription_start_date', sa.String(length=120), nullable=True),
    sa.Column('last_payment_date', sa.String(length=120), nullable=True),
    sa.Column('next_payment_date', sa.String(length=120), nullable=True),
    sa.Column('subscription_end_date', sa.String(length=120), nullable=True),
    sa.Column('is_subscription_active', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['id_subscription'], ['subscription.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('name')
    )
    op.create_table('vinyasa_yoga',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('subtitle', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('link', sa.String(length=120), nullable=False),
    sa.Column('asana_focus', sa.String(length=120), nullable=False),
    sa.Column('level', sa.String(length=120), nullable=False),
    sa.Column('duration', sa.String(length=120), nullable=False),
    sa.Column('url_imagen', sa.String(length=350), nullable=False),
    sa.Column('id_type_of_session', sa.Integer(), nullable=True),
    sa.Column('id_instructor', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_instructor'], ['instructor.id'], ),
    sa.ForeignKeyConstraint(['id_type_of_session'], ['types_of_session.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('link')
    )
    op.create_table('testimony',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('date', sa.String(length=120), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=True),
    sa.Column('id_session', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_session'], ['session.id'], ),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('date'),
    sa.UniqueConstraint('description')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('testimony')
    op.drop_table('vinyasa_yoga')
    op.drop_table('user')
    op.drop_table('session')
    op.drop_table('rocket_yoga')
    op.drop_table('meditation')
    op.drop_table('jivamukti_yoga')
    op.drop_table('hatha_yoga')
    op.drop_table('harmonium')
    op.drop_table('ashtanga_yoga')
    op.drop_table('types_of_session')
    op.drop_table('subscription')
    op.drop_table('instructor')
    # ### end Alembic commands ###
