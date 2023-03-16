
#set PB_REL="https://github.com/protocolbuffers/protobuf/releases"
#set PB_VERSION=3.13.0
#set PB_OS=win
#set PB_ARCH=64
#curl -LO %PB_REL%/download/v%PB_VERSION%/protoc-%PB_VERSION%-%PB_OS%%PB_ARCH%.zip
import json



from igdb.wrapper import IGDBWrapper
wrapper = IGDBWrapper("l9z8jtrdbnyiypji85ggptiealo4em", " Bearer x50se2cz9yll43t0e9gtt52aqvx2nr")

'''With a wrapper instance already created'''
# JSON API request
byte_array = wrapper.api_request(
            'games',
            'fields id, name; offset 0; where platforms=48;'
          )
# parse into JSON however you like...

# Protobuf API request
from igdb.igdbapi_pb2 import GameResult
byte_array = wrapper.api_request(
            'games.pb', # Note the '.pb' suffix at the endpoint
            'fields id, name; offset 0; where platforms=48;'
          )
print(GameResult())
games_message.ParseFromString(byte_array) # Fills the protobuf message object with the response