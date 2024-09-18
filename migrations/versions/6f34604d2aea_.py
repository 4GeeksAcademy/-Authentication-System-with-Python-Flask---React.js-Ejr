"""empty message

Revision ID: 6f34604d2aea
Revises: 
Create Date: 2024-09-17 21:43:48.864389

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '6f34604d2aea'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('game',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('platform', postgresql.ARRAY(sa.Enum('STEAM', 'PLAY', 'XBOX', 'SWITCH', name='platform')), nullable=False),
    sa.Column('released', sa.DateTime(timezone=True), nullable=False),
    sa.Column('background_image', sa.String(length=200), nullable=False),
    sa.Column('type_game', postgresql.ARRAY(sa.Enum('ACTION', 'ADVENTURE', 'RPG', 'STRATEGY', 'SPORTS', 'SHOOTER', name='typegame')), nullable=False),
    sa.Column('rating', sa.String(length=50), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_type', sa.Enum('NORMAL', 'PREMIUM', name='usertype'), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('first_name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=False),
    sa.Column('age', sa.String(length=80), nullable=False),
    sa.Column('discord_id', sa.String(length=80), nullable=False),
    sa.Column('steam_id', sa.String(length=80), nullable=False),
    sa.Column('schedule', sa.Enum('ANYTIME', 'MORNING', 'AFTERNOON', 'EVENING', name='schedule'), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.Column('region', sa.Enum('NA', 'SA', name='region'), nullable=False),
    sa.Column('gender', sa.Enum('M', 'F', name='gender'), nullable=False),
    sa.Column('platform', postgresql.ARRAY(sa.Enum('STEAM', 'PLAY', 'XBOX', 'SWITCH', name='platform')), nullable=False),
    sa.Column('type_game', postgresql.ARRAY(sa.Enum('ACTION', 'ADVENTURE', 'RPG', 'STRATEGY', 'SPORTS', 'SHOOTER', name='typegame')), nullable=False),
    sa.Column('profile_img_url', sa.String(length=200), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('favorite_game',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['game_id'], ['game.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'game_id')
    )
    op.create_table('friend_request',
    sa.Column('user_send_invite', sa.Integer(), nullable=False),
    sa.Column('user_receive_invite', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_receive_invite'], ['user.id'], ),
    sa.ForeignKeyConstraint(['user_send_invite'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_send_invite', 'user_receive_invite')
    )
    op.create_table('friendship',
    sa.Column('user_id_first', sa.Integer(), nullable=False),
    sa.Column('user_id_second', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id_first'], ['user.id'], ),
    sa.ForeignKeyConstraint(['user_id_second'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id_first', 'user_id_second')
    )
    op.create_table('session',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('game_id', sa.Integer(), nullable=True),
    sa.Column('host_id', sa.Integer(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('duration', sa.Enum('UNK', 'ONE', 'TWO', 'THREE', name='duration'), nullable=False),
    sa.Column('language', sa.Enum('ENGLISH', 'SPANISH', 'PORTUGUESE', name='language'), nullable=False),
    sa.Column('session_type', sa.Enum('PUBLIC', 'PRIVATE', name='sessiontype'), nullable=False),
    sa.Column('region', sa.Enum('NA', 'SA', name='region'), nullable=False),
    sa.Column('background_img', sa.String(length=200), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=False),
    sa.Column('capacity', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['game_id'], ['game.id'], ),
    sa.ForeignKeyConstraint(['host_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('subscription',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('purchase_user_id', sa.Integer(), nullable=True),
    sa.Column('operation_number', sa.String(length=200), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['purchase_user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('operation_number')
    )
    op.create_table('session_member',
    sa.Column('session_id', sa.Integer(), nullable=False),
    sa.Column('participant_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['participant_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['session_id'], ['session.id'], ),
    sa.PrimaryKeyConstraint('session_id', 'participant_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('session_member')
    op.drop_table('subscription')
    op.drop_table('session')
    op.drop_table('friendship')
    op.drop_table('friend_request')
    op.drop_table('favorite_game')
    op.drop_table('user')
    op.drop_table('game')
    # ### end Alembic commands ###
