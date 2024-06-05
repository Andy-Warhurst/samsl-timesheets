import pandas as pd
import requests
import json

# # Load the new_players.json file
# new_players = pd.read_json('./src/players.json', lines=True)
#
# # The URL of your API Gateway endpoint
# api_url = 'https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/players'
#
# # Iterate over each player in the DataFrame
# for index, player in new_players.iterrows():
#     # Convert the player record to a dictionary
#     player_data = player.to_dict()
#
#     # Send a POST request to the API Gateway endpoint
#     response = requests.put(api_url, data=json.dumps(player_data), headers={'Content-Type': 'application/json'})
#
#     # Print the response
#     print(f"Response for player {player_data['player_id']}: {response.status_code}, {response.text}")

df = pd.read_csv('./src/fixtures.csv')

# The URL of your API Gateway endpoint
api_url = 'https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/fixtures'

# for index, row in df.iterrows():
#     item = row.to_dict()
#     response = requests.put(api_url, data=json.dumps(item), headers={'Content-Type': 'application/json'})
#     print(response.text)

for index, row in df.iterrows():
    # Convert the row to a dictionary and ensure all values are strings
    item = {key: str(value) for key, value in row.to_dict().items()}

    # Send the item to the API Gateway endpoint
    response = requests.put(api_url, data=json.dumps(item), headers={'Content-Type': 'application/json'})

    # Print the response from the API Gateway
    print(response.text)

